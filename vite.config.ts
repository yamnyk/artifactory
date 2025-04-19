import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const getBaseUrl = (mode: string): string => {
  switch (mode) {
    case 'gh':
      return '/artifactory/';
    case 'prod':
    default:
      return '/';
  }
};

const getOutDir = (mode: string): string => {
  switch (mode) {
    case 'gh':
      return 'dist-gh';
    case 'prod':
    default:
      return 'dist-ua';
  }
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: getBaseUrl(mode),
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
      outDir: getOutDir(mode),
      rollupOptions: {
        input: {
          main: 'index.html',
          fallback: 'index.html',
        },
      },
    },
  };
});
