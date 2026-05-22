import { useState, useRef, useEffect } from 'react';
import { useProject } from '../context/ProjectContext';
import { exportProjectJSON } from '../utils/storage';
import { DEFAULT_PROJECT } from '../constants/defaults';
import { validateProject } from '../constants/validation';

export default function SaveLoadBar() {
  const { state, dispatch } = useProject();
  const { savedProjects, project } = state;
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null);          // { text, type: 'success'|'error' }
  const [confirmDelete, setConfirmDelete] = useState(null); // project name pending delete
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const importRef = useRef(null);
  const statusTimer = useRef(null);

  function showStatus(text, type = 'success') {
    setStatus({ text, type });
    clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(null), 3500);
  }

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  function handleSave() {
    const n = name.trim() || 'Untitled Project';
    dispatch({ type: 'SAVE_PROJECT', name: n });
    showStatus(`"${n}" saved.`);
  }

  function handleLoad(entry) {
    dispatch({ type: 'LOAD_PROJECT', data: entry.data });
    setShowModal(false);
    showStatus(`"${entry.name}" loaded.`);
  }

  function handleDeleteRequest(projectName) {
    setConfirmDelete(projectName);
  }

  function handleDeleteConfirm() {
    dispatch({ type: 'DELETE_PROJECT', name: confirmDelete });
    setConfirmDelete(null);
    showStatus(`"${confirmDelete}" deleted.`);
  }

  function handleExport() {
    exportProjectJSON(project, name.trim() || 'project');
    showStatus('Project exported as JSON.');
  }

  function handleImport(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const raw = JSON.parse(e.target.result);
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
          showStatus('Invalid project file — expected a JSON object.', 'error');
          return;
        }
        dispatch({ type: 'LOAD_PROJECT', data: raw });
        // Validate the merged result (LOAD_PROJECT fills missing fields with defaults)
        const merged = { ...DEFAULT_PROJECT, ...raw };
        const errors = validateProject(merged);
        const errCount = Object.keys(errors).length;
        if (errCount > 0) {
          showStatus(
            `Imported with ${errCount} missing or invalid field${errCount > 1 ? 's' : ''} — check highlighted sections.`,
            'error'
          );
        } else {
          showStatus('Project imported successfully.');
        }
      } catch {
        showStatus('Invalid JSON file — could not import.', 'error');
      }
    };
    reader.readAsText(file);
    importRef.current.value = '';
  }

  function handleReset() {
    setShowResetConfirm(true);
  }

  function handleResetConfirm() {
    dispatch({ type: 'LOAD_PROJECT', data: DEFAULT_PROJECT });
    setShowResetConfirm(false);
    showStatus('All fields reset to defaults.');
  }

  return (
    <>
      <div className="save-bar">
        <input
          type="text"
          placeholder="Project name (e.g. IDI – Rider 2)"
          value={name}
          onChange={e => setName(e.target.value)}
          aria-label="Project name"
        />
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
        <button className="btn btn-outline" onClick={() => setShowModal(true)}>
          Load ({savedProjects.length})
        </button>
        <button className="btn btn-outline" onClick={handleExport}>Export JSON</button>
        <button className="btn btn-outline" onClick={() => importRef.current?.click()}>Import JSON</button>

        {showResetConfirm ? (
          <span className="delete-confirm">
            Reset all fields?
            <button className="btn btn-danger" onClick={handleResetConfirm}>Yes, reset</button>
            <button className="btn btn-outline" onClick={() => setShowResetConfirm(false)}>Cancel</button>
          </span>
        ) : (
          <button className="btn btn-danger" onClick={handleReset}>Reset</button>
        )}

        <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }}
          onChange={e => handleImport(e.target.files[0])} />

        {status && (
          <div className={`status-banner status-banner--${status.type}`} role="status">
            {status.text}
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Saved Projects"
          onClick={e => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="modal">
            <div className="modal-header">
              <h3>Saved Projects</h3>
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">×</button>
            </div>
            {savedProjects.length === 0 ? (
              <p className="modal-empty">No saved projects yet.</p>
            ) : (
              savedProjects.map(p => (
                <div key={p.id} className="saved-project-item">
                  <div className="saved-project-info">
                    <div className="saved-project-name">{p.name}</div>
                    <div className="saved-project-date">
                      {new Date(p.savedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="saved-project-actions">
                    <button className="btn btn-primary" onClick={() => handleLoad(p)}>Load</button>
                    {confirmDelete === p.name ? (
                      <span className="delete-confirm">
                        Delete?
                        <button className="btn btn-danger" onClick={handleDeleteConfirm}>Yes</button>
                        <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>No</button>
                      </span>
                    ) : (
                      <button className="btn btn-danger" onClick={() => handleDeleteRequest(p.name)}>Delete</button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
