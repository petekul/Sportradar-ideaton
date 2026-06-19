import { defineConfig } from 'vite';
import { resolve } from 'path';

// Relative base so the built site works when hosted at any sub-path,
// e.g. https://<username>.github.io/<repo-name>/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        idea1: resolve(process.cwd(), 'idea1.html'),
        idea2: resolve(process.cwd(), 'idea2.html'),
      },
    },
  },
});
