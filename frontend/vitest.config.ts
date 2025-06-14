import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // si tienes setup para jest-dom'
    globals: true, // Esto es clave para que Vitest exponga 'expect' globalmente
  },
});