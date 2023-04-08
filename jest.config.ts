import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@errors/(.*)$': '<rootDir>/src/shared/errors/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/shared/interfaces/$1',
    '^@utils/(.*)$': '<rootDir>/src/shared/utils/$1'
  },
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  testMatch: [
    '**/__tests__/**/*.spec.ts'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    'text-summary',
    'lcov'
  ],
  clearMocks: true,
  resetMocks: true,
  verbose: true
}

export default config