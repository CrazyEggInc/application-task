module.exports = {
  collectCoverageFrom: ["src/**/*.{js,ts}", "!src/**/*.d.ts"],
  roots: ["<rootDir>/src/"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
}