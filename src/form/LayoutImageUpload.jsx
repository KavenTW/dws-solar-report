import { useRef, useState } from 'react';
import { useProject } from '../context/ProjectContext';

const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024; // 1.5 MB

export default function LayoutImageUpload() {
  const { state, dispatch } = useProject();
  const { layoutImageDataUrl } = state.project;
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadError(
        `Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Please use an image under 1.5 MB.`
      );
      return;
    }
    setUploadError(null);
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
      {uploadError && <p className="field-error" role="alert">{uploadError}</p>}
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
      <small>JPEG, PNG, etc. — stored with project data · max 1.5 MB</small>
      {uploadError && <p className="field-error" role="alert">{uploadError}</p>}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />
    </div>
  );
}
