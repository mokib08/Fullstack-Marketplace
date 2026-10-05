module.exports = {
    testEnvironment: 'node',
    testTimeout: 30000,
    setupFiles: ['dotenv/config'],
    setupFilesAfterEnv: ['<rootDir>tests/setup.js'],
}