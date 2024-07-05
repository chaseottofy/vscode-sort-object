// .mocharc.js

const path = require('path');

module.exports = {
  spec: 'test/**/*.test.js',
  reporter: path.join(__dirname, 'test', 'custom-reporter.js'),
  bail: false,
  checkLeaks: true,
  timeout: 5000,  // 5 seconds, adjust as needed
  color: true,
  diff: true,
  exit: true,  // force Mocha to exit after tests complete
  recursive: true,  // if you have nested test directories
  require: ['mocha'],  // add any required modules here
};