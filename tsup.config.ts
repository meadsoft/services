import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: false, // TypeScript handles .d.ts files
    sourcemap: true,
    clean: false, // Don't clean dist folder (tsc already handles it)
    outDir: 'dist',
    splitting: false,
    treeshake: true,
    outExtension({ format }) {
        return {
            js: format === 'cjs' ? '.cjs' : '.js',
        };
    },
});
