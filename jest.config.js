module.exports = {
    testEnvironment: 'jsdom', 
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.(js|jsx)?$': 'babel-jest', 
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], 
  };