import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
     "^(.*)/src/models/ProductModel$": "<rootDir>/tests/Mocks/ProductModel.ts",
  "^(.*)/src/models/ReviewModel$": "<rootDir>/tests/Mocks/ReviewModel.ts"
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "tsconfig.json"
    }
  },
  testMatch: [
    "**/tests/**/*.(test|spec).ts",
    "**/tests/**/*Test.ts"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/index.ts"     // optional to ignore barrels
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],

};

export default config;
