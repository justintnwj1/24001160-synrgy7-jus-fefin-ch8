// jest.config.ts

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(svg)$': 'identity-obj-proxy', 
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
