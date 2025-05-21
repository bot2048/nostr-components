// vite.config.mts
import { defineConfig } from 'vite';
// import dts from 'vite-plugin-dts';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    // dts({
    //   insertTypesEntry: true,
    // })
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.ts'),
        'nostr-follow-button': resolve(
          __dirname,
          'src/nostr-follow-button/nostr-follow-button.ts'
        ),
        'nostr-post': resolve(__dirname, 'src/nostr-post/nostr-post.ts'),
        'nostr-profile': resolve(
          __dirname,
          'src/nostr-profile/nostr-profile.ts'
        ),
        'nostr-profile-badge': resolve(
          __dirname,
          'src/nostr-profile-badge/nostr-profile-badge.ts'
        ),
      },
      external: ['lit', 'dayjs'],
      output: [
        {
          entryFileNames: chunkInfo =>
            chunkInfo.name === 'index'
              ? 'nostr-components.es.js'
              : `components/[name].es.js`,
          format: 'es',
          inlineDynamicImports: false,
          globals: {
            lit: 'Lit',
            dayjs: 'dayjs',
          },
        },
        {
          entryFileNames: () => 'nostr-components.umd.js',
          format: 'umd',
          inlineDynamicImports: false,
          name: 'NostrComponents',
          globals: {
            lit: 'Lit',
            dayjs: 'dayjs',
          },
        },
      ],
    },
    lib: false,
    outDir: 'dist',
    emptyOutDir: true,
  },
});
