import { useRef, useState } from 'react';
import { useProject } from '../context/ProjectContext';

import { compressImage } from '../utils/imageCompress';

export default function LayoutImageUpload() {
  const { state, dispatch } = useProject();
  const { layoutImageDataUrl } = state.project;
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setUploadError(null);
    compressImage(file)
      .then(dataUrl => dispatch({ type: 'SET_LAYOUT_IMAGE', dataUrl }))
      .catch(() => setUploadError('Could not process that image — please try a different file.'));
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
      <small>JPEG, PNG, etc. — automatically compressed and stored with project data</small>
      {uploadError && <p className="field-error" role="alert">{uploadError}</p>}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />
    </div>
  );
}
