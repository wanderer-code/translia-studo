import React, { useState } from 'react';
import { Languages } from 'lucide-react';

export default function TranslatorLauncher({ setToast }) {
  const [launching, setLaunching] = useState(false);
  const openAll = async () => {
    setLaunching(true);
    try {
      const screen = window.screen;
      const width = Math.min(screen.availWidth, Math.max(480, Math.round(screen.availWidth * 0.42)));
      const geometry = new URLSearchParams({
        width: String(width), height: String(screen.availHeight),
        left: String((screen.availLeft || 0) + screen.availWidth - width),
        top: String(screen.availTop || 0),
      });
      const response = await fetch(`/__local/open-translators?${geometry}`, {
        method: 'POST', headers: { 'X-Translia-Request': 'open-translators' },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setToast('Opened translators in Chrome incognito');
    } catch (error) {
      setToast(error instanceof SyntaxError ? 'Local launcher unavailable. Restart the app with npm run dev.' : (error.message || 'Could not open translators'));
    } finally {
      setLaunching(false);
    }
  };

  return <button type="button" onClick={openAll} disabled={launching}
    aria-label="Open translators in Chrome incognito" title="Open ChatGPT, DeepL, Google Translate and Abadis in Chrome incognito"
    className="p-1 rounded hover:bg-[#222832] hover:text-[#d5dce6] disabled:opacity-40 transition-colors">
    <Languages className="w-4 h-4" />
  </button>;
}
