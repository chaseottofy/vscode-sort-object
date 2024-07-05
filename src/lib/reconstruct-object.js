/**
 * Reconstructs an object from parsed pairs.
 * @param {Array<Object>} parsedPairs - The array of parsed object pairs.
 * @param {string} [indent=''] - The indentation string for nested objects.
 * @param {boolean} [isNested=false] - Whether the current object is nested.
 * @returns {string} The reconstructed object as a string.
 */
function reconstructObject(parsedPairs, indent = '', isNested = false) {
  let result = isNested ? '{\n' : '';
  for (const [index, pair] of parsedPairs.entries()) {
    const { originalKey, originalValue, nestedValue, formatting } = pair;
    const {
      leadingSpace,
      keyQuote,
      keySpace,
      valueSpace,
      whitespacePrefix,
      trailingSpace,
    } = formatting;

    result += `${whitespacePrefix}${isNested ? indent : ''}${leadingSpace}${keyQuote}${originalKey}${keyQuote}${keySpace}:${valueSpace}`;
    result += nestedValue
      ? reconstructObject(nestedValue, indent + '  ', true)
      : originalValue;

    if (
      index < parsedPairs.length - 1
      && (originalValue && !originalValue.endsWith(','))
    ) {
      result += ',';
    }
    result += `${trailingSpace}\n`;
  }
  return isNested ? `${result}${indent}},` : result;
};

module.exports = reconstructObject;