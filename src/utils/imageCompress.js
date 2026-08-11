/**
 * Client-side image compression: resize to a max edge and re-encode as JPEG,
 * so layout images fit within the browser's localStorage quota (~5 MB total).
 * Accepts a File or Blob; resolves to a data URL.
 */
export function compressImage(fileOrBlob, { maxDimension = 1600, quality = 0.8 } = {}) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(fileOrBlob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read image')); };
    img.src = url;
  });
}
