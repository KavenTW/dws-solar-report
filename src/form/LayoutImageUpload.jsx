import { useRef } from 'react';
import { useProject } from '../context/ProjectContext';

export default function LayoutImageUpload() {
  const { state, dispatch } = useProject();
  const { layoutImageDataUrl } = state.project;
  const inputRef = useRef(null);

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => dispatch({ type: 'SET_LAYOUT_IMAGE', dataUrl: e.target.result });
    reader.readAsDataURL(file);
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
      className="image-upload-area"
      onClick={() => inputRef.current?.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
    >
      <p>Click or drag to upload HelioScope layout image</p>
      <small>JPEG, PNG, etc. — stored with project data</small>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />
    </div>
  );
}
