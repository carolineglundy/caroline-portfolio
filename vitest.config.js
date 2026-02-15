import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    test: {
        environment: 'happy-dom',
        include: ['tests/js/**/*.spec.js', 'resources/js/**/*.spec.js'],
        globals: true,
    },
});
