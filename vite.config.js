import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import translationLauncher from './scripts/translation-launcher.mjs';

export default defineConfig({ plugins: [react(), translationLauncher()] });
