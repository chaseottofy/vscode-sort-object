const Mocha = require('mocha');
const assert = require('assert');

const parseWithTimeout = require('../src/lib/index');
const TimerReporter = require('./custom-reporter');
const TIMEOUT_DEFAULT = 5000;
Mocha.reporters.Timer = TimerReporter;

const {
  staticExtremelyNested,
  staticFullObjects,
  staticInvalidEdgeCases,
  staticValidEdgeCases,
} = require('./static/static-test-data');

const {
  generateKeyPairsGetFullObject,
  generateRandomObject,
  generateTrimmedGetFullObject,
} = require('./dynamic/dynamic-test-data');

const {
  handleTest,
} = require('./sort-keys-utils');


describe('Sort Keys', function() {
  describe('Static Extremely Nested', function() {
    it('handles static extremely nested', async function() {
      for (const { input, output, direction } of staticExtremelyNested) {
        const result = await parseWithTimeout(input, TIMEOUT_DEFAULT, direction);
        assert.deepStrictEqual(result, output);
      }
    });
  });

  describe('Static Invalid Edge cases', function() {
    it('handles invalid edge cases', async function() {
      for (const value of Object.values(staticInvalidEdgeCases)) {
        const { inputs, output } = value;
        for (const input of inputs) {
          await assert.rejects(async () => {
            await parseWithTimeout(input, TIMEOUT_DEFAULT, 'asc');
          }, {
            name: 'Error',
            message: output,
          });
        }
      }
    });
  });

  describe('Static Valid Edge cases', function() {
    it('handles edge cases', async function() {
      await handleTest(staticValidEdgeCases);
    });
  });

  describe('Static Full Objects', function() {
    it('sorts full objects with declaration', async function() {
      await handleTest(staticFullObjects);
    });
  });

  describe('Dynamic Full Objects', function() {
    it('sorts full objects with declaration', async function() {
      const trimmedGetFullObject = await generateTrimmedGetFullObject(
        staticFullObjects
      );
      await handleTest(trimmedGetFullObject);
    });
  });
  // some of the tests are showing 0ms duration, is this possible? 
  describe('Dynamic Key Pairs', function() {
    it('sorts key pairs', async function() {
      const keyPairsGetFullObject = await generateKeyPairsGetFullObject(
        staticFullObjects
      );
      await handleTest(keyPairsGetFullObject, true);
    });
  });

  // generates and sorts 100 random objects, test fails if any object fails to parse
  describe('Random Objects', function() {
    it('sorts random objects ASC/DESC', async function() {
      for (let i = 0; i < 10; i++) {
        try {
          const randomObject = await generateRandomObject();
          await parseWithTimeout(randomObject, TIMEOUT_DEFAULT, 'asc');
          await parseWithTimeout(randomObject, TIMEOUT_DEFAULT, 'desc');
        } catch (error) {
          assert.fail(error);
        }
      }
    });
  });
});