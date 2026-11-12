export const ExternalLibCache = {
  pdfjs: null,
  mammoth: null,
  jszip: null,
  gsap: null,
};

export function loadExternalScript(src, globalName) {
  return new Promise((resolve, reject) => {
    if (window[globalName]) {
      resolve(window[globalName]);
      return;
    }
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window[globalName]));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve(window[globalName]);
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}

