/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testTimeout: 10000, // Extend timeout to 10s to avoid timeouts with axios calls
  clearMocks: true,   // Auto-clear mock calls between tests
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Don't run tests from these directories
  verbose: true,      // More detailed output
  // Optional: Add code coverage if needed
  // collectCoverage: true,
  // coverageDirectory: "coverage",
};
