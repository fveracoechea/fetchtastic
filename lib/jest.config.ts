import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // automock: false,
  // setupFiles: ['./jest.setup.ts'],
};

export default config;
