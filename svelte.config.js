import adapter from '@sveltejs/adapter-static'; // Змінено з adapter-auto
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        // Налаштування для GitHub Pages
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: '404.html',
            precompress: false,
            strict: true
        }),
        paths: {
            // ВАЖЛИВО: замініть 'education_platform' на точну назву вашого репозиторію
            base: process.env.NODE_ENV === 'production' ? '/education_platform' : '',
        },
        alias: {
            $lib: './src/lib',
            '$lib/*': './src/lib/*',
            $components: './src/lib/components',
            '$components/*': './src/lib/components/*',
            $server: './src/lib/server',
            '$server/*': './src/lib/server/*',
            $types: './src/lib/types',
            '$types/*': './src/lib/types/*',
            $stores: './src/lib/stores',
            '$stores/*': './src/lib/stores/*',
            $utils: './src/lib/utils',
            '$utils/*': './src/lib/utils/*'
        }
    },
    compilerOptions: {
        runes: true
    }
};

export default config;