import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isGh = mode === 'gh';
  return {
    base: isGh ? '/artifactory/' : '/',
    plugins: [preact()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: 'index.html',
          fallback: 'index.html',
        },
      },
    },
  };
});
