// test/custom-reporter.js
const mocha = require('mocha');

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m"
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m"
  }
};

class TimerReporter {
  constructor(runner) {
    const stats = runner.stats;

    runner.on('start', () => {
      console.log(
        colors.fg.cyan + 'Starting the test suite' + colors.reset
      );
    });

    runner.on('test', (test) => {
      test.startTime = performance.now();
    });

    runner.on('pass', (test) => {
      const duration = performance.now() - test.startTime;
      console.log(
        colors.fg.green + `✓ ${test.fullTitle()}` + colors.reset + colors.fg.yellow + ` - ${duration.toFixed(3)}ms` + colors.reset
      );
    });

    runner.on('fail', (test, err) => {
      const duration = performance.now() - test.startTime;
      console.log(
        colors.fg.red + `✗ ${test.fullTitle()}` + colors.reset + colors.fg.yellow + ` - ${duration.toFixed(3)}ms` + colors.reset
      );
      console.log(
        colors.fg.red + err.stack + colors.reset
      );
    });

    runner.on('end', () => {
      console.log(
        colors.fg.cyan + `Total duration: ${stats.duration.toFixed(3)}ms` + colors.reset
      );
      console.log(
        colors.fg.green + `Tests passed: ${stats.passes}` + colors.reset
      );
      console.log(
        colors.fg.red + `Tests failed: ${stats.failures}` + colors.reset
      );
    });
  }
}

module.exports = TimerReporter;