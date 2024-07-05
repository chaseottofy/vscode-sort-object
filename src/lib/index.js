const handleFullObjectSelection = require('./text-processor.js');
const parseAndVerifyObjectPairs = require('./object-parser');
const reconstructObject = require('./reconstruct-object');
const sortPairs = require('./sort-utils');
const lintObjectContent = require('./lint-content');

/**
 * Helper function to parse and format the input text.
 * @param {string} text - The input text to parse.
 * @param {string} direction - The sorting direction.
 * @returns {string} The parsed and formatted object as a string.
 * @throws {Error} If parsing fails.
 */
function parseAndFormat(text, direction) {
  const inputSplit = text
    .trim()
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n');

  if (inputSplit.length <= 1) {
    throw new Error('Invalid input length');
  }

  const {
    isKeyPairs,
    objectContent,
    objectStart,
    objectEnd,
  } = handleFullObjectSelection(inputSplit);

  if (objectContent.trim() === '') {
    return objectStart.trim() + objectEnd.slice(-1);
  }

  const formattedObjectContent = lintObjectContent(objectContent);
  const verifiedObjectPairs = parseAndVerifyObjectPairs(formattedObjectContent);
  const sortedPairs = sortPairs(verifiedObjectPairs, direction);
  return isKeyPairs
    ? reconstructObject(sortedPairs)
    : `${objectStart}${reconstructObject(sortedPairs)}${objectEnd}`;
}

/**
 * Parses the input text with a timeout.
 * @param {string} text - The input text to parse.
 * @param {number} [timeout=3000] - The timeout duration in milliseconds.
 * @param {string} [direction='asc'] - The sorting direction.
 * @returns {Promise<string>} A promise that resolves with the parsed and formatted object as a string.
 * @throws {Error} If parsing times out or fails.
 */
function parseWithTimeout(text, timeout = 3000, direction = 'asc') {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Parsing timed out'));
    }, timeout);
    try {
      const result = parseAndFormat(text, direction);
      clearTimeout(timeoutId);
      resolve(result);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}

module.exports = parseWithTimeout;
