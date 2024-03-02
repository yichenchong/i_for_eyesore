import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        testEnvironment: 'node',
      },
    ],
  },
  testMatch: [
    "**/tests/**/(*.)+(spec|test).[jt]s?(x)"
  ]
}

export default jestConfig;