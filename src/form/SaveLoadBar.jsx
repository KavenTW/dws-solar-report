import { useState, useRef } from 'react';
import { useProject } from '../context/ProjectContext';
import { exportProjectJSON } from '../utils/storage';
import { DEFAULT_PROJECT } from '../constants/defaults';

export default function SaveLoadBar() {
  const { state, dispatch } = useProject();
  const { savedProjects, project } = state;
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const importRef = useRef(null);

  function handleSave() {
    const n = name.trim() || 'Untitled Project';
    dispatch({ type: 'SAVE_PROJECT', name: n });
    alert(`Project "${n}" saved.`);
  }

  function handleLoad(entry) {
    dispatch({ type: 'LOAD_PROJECT', data: entry.data });
    setShowModal(false);
  }

  function handleDelete(name) {
    if (confirm(`Delete "${name}"?`)) {
      dispatch({ type: 'DELETE_PROJECT', name });
    }
  }

  function handleExport() {
    exportProjectJSON(project, name.trim() || 'project');
  }

  function handleImport(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        dispatch({ type: 'LOAD_PROJECT', data });
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  }

  function handleReset() {
    if (confirm('Reset all fields to defaults?')) {
      dispatch({ type: 'LOAD_PROJECT', data: DEFAULT_PROJECT });
    }
  }

  return (
    <>
      <div className="save-bar">
        <input
          type="text"
          placeholder="Project name (e.g. IDI – Rider 2)"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
        <button className="btn btn-outline" onClick={() => setShowModal(true)}>
          Load ({savedProjects.length})
        </button>
        <button className="btn btn-outline" onClick={handleExport}>Export JSON</button>
        <button className="btn btn-outline" onClick={() => importRef.current?.click()}>Import JSON</button>
        <button className="btn btn-danger" onClick={handleReset}>Reset</button>
        <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }}
          onChange={e => handleImport(e.target.files[0])} />
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>Saved Projects</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
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
                    <button className="btn btn-danger" onClick={() => handleDelete(p.name)}>Delete</button>
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
