import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    exclude: ['.claude', '**/node_modules', 'dist'],
    coverage: {
      exclude: ['.claude'],
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
      thresholds: {
        lines: 95,
        functions: 95,
        branches: 90,
        statements: 95,
      },
    },
  },
});
