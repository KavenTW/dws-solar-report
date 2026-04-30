import { useRef, useState } from 'react';
import { useProject } from '../context/ProjectContext';

export default function LayoutImageUpload() {
  const { state, dispatch } = useProject();
  const { layoutImageDataUrl } = state.project;
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => dispatch({ type: 'SET_LAYOUT_IMAGE', dataUrl: e.target.result });
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return layoutImageDataUrl ? (
    <div className="image-preview">
      <img src={layoutImageDataUrl} alt="Array layout" />
      <div className="image-preview-actions">
        <button className="btn btn-outline" onClick={() => inputRef.current?.click()}>
          Replace Image
        </button>
        <button className="btn btn-danger" onClick={() => dispatch({ type: 'SET_LAYOUT_IMAGE', dataUrl: null })}>
          Remove
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />
    </div>
  ) : (
    <div
      className={`image-upload-area${isDragging ? ' image-upload-area--dragging' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragEnter={e => { e.preventDefault(); setIsDragging(true); }}
      onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <p>Click or drag to upload HelioScope layout image</p>
      <small>JPEG, PNG, etc. — stored with project data</small>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />
    </div>
  );
}
