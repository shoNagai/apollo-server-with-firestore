const esModules = ['lodash-es'].join('|');

module.exports = {
  name: 'e2e-test',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/test/e2e/resolvers/**/*.ts'],
  cacheDirectory: './.jest-cache-e2e',
  maxWorkers: 1,
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/build/'],
  transform: {
    '\\.(jsx?|tsx?|ts?)$': 'ts-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules', '<rootDir>./'],
  testEnvironment: 'node',
};
