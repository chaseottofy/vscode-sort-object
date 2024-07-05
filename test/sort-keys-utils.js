const assert = require('assert');
const parseWithTimeout = require('../src/lib/index');

const handleTest = async (data, trim = false) => {
  for (const value of Object.values(data)) {
    const { inputs, output } = value;
    for (const input of inputs) {
      const result = await parseWithTimeout(input, 5000, 'asc');
      assert.deepStrictEqual(
        trim ? result.trim() : result,
        trim ? output.trim() : output,
      );
    }
  }
};

module.exports = {
  handleTest,
};