import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// Servidor de desenvolvimento do playground. Lê os componentes direto de ../src,
// então qualquer alteração em um componente recarrega a página.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: { port: 4300, open: false },
});
