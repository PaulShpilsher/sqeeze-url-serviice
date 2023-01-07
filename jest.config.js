/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.spec.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['./node_modules/'],
};