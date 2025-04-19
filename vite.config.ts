import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isGh = mode === 'gh';
  return {
    base: isGh ? '/artifactory/' : '/',
    plugins: [
      preact(),
      viteStaticCopy({
        targets: [
          {
            src: '.htaccess-template',
            dest: '.', // root of dist/
            rename: '.htaccess',
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      outDir: isGh ? 'dist' : 'dist-ua',
      rollupOptions: {
        input: {
          main: 'index.html',
          fallback: 'index.html',
        },
      },
    },
  };
});
