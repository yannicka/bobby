import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: [
        'src/**',
      ],
      exclude: [
        'src/import-images.d.ts',
        'src/levels.ts',
        'src/index.ts',
      ],
    },
  },
})
