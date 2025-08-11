// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
      '^.+\\.vue$': 'vue3-jest',     // handle .vue SFCs
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
  
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/__mocks__/fileMock.js',
        '\\.(css|less|sass|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
      }
  }
  