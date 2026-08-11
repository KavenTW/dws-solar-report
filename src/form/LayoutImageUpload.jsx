import { useRef, useState } from 'react';
import { useProject } from '../context/ProjectContext';

// Images are recompressed client-side before storage so a full portfolio of
// layouts fits within the browser's localStorage quota (~5 MB total).
const MAX_DIMENSION = 1600;   // px, longest edge
const JPEG_QUALITY = 0.8;

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read image')); };
    img.src = url;
  });
}

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
