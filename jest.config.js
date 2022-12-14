// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/stores/(.*)$': '<rootDir>/src/stores/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['jest-plugin-context/setup', '@testing-library/jest-dom'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

// next/image의 최우선 load를 제한하고 svg mock를 적용
// https://github.com/vercel/next.js/blob/acbd54322f447caaee09b1262e4687434ea0268c/packages/next/build/jest/jest.ts#L74
const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      '\\.svg$': '<rootDir>/__mocks__/svg.js',
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

module.exports = jestConfig;
