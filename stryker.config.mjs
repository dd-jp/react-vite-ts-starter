export default {
  packageManager: 'npm',
  testRunner: 'vitest',
  vitest: {
    configFile: 'vitest.config.ts',
  },
  mutate: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', '!src/main.tsx'],
  // TS 7 ships no JS compiler API, so Stryker's tsconfig preprocessor must be pointed at a file that does not exist
  tsconfigFile: '.stryker-tsconfig-unused.json',
  coverageAnalysis: 'perTest',
  incremental: true,
  incrementalFile: 'reports/stryker-incremental.json',
  reporters: ['progress', 'clear-text', 'html'],
  thresholds: { high: 90, low: 70, break: 80 },
  tempDirName: '.stryker-tmp',
  cleanTempDir: 'always',
};
