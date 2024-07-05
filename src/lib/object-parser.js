const {
  MAX_DEPTH,
  MAX_LINES,
  NESTED_ARR_START_REGEX,
  NESTED_OBJ_START_REGEX,
  VALID_KEY_PAIR_REGEX,
} = require('./constants');

/**
 * Parses and verifies object pairs from a given text.
 * @param {string} text - The text containing object pairs to parse.
 * @param {number} [depth=0] - The current depth of nested objects.
 * @returns {Array<Object>} An array of parsed object pairs.
 * @throws {Error} If maximum depth or number of lines is exceeded, or if parsing fails.
 */
function parseAndVerifyObjectPairs(text, depth = 0) {
  if (depth > MAX_DEPTH) {
    throw new Error('Maximum object depth exceeded');
  }

  text = text.trim();
  const lines = text.split('\n');
  if (lines.length > MAX_LINES) {
    throw new Error('Maximum number of lines exceeded');
  }

  const parsedPairs = [];
  let currentPair = {
    formatting: {},
    originalKey: '',
    originalValue: '',
  };
  let nestedContent = '';
  let nestedDepth = 0;
  let arrayDepth = 0;

  for (const [lineNumber, line_] of lines.entries()) {
    let whitespacePrefix = (line_.match(/^\s*/) || [''])[0];
    if (!whitespacePrefix) whitespacePrefix = '  ';

    let line = line_.trim();
    if (!line) continue;

    // Check for nested object start
    if (line.endsWith('{') && arrayDepth === 0) {
      if (nestedDepth === 0) {
        // Start of a new nested object
        const match = line.match(NESTED_OBJ_START_REGEX);
        if (!match) {
          throw new Error(`Invalid nested object start at line ${lineNumber + 1}: (${line})`);
        }
        const [, leadingSpace, keyQuote, key, keySpace, valueSpace, trailingSpace] = match;
        currentPair = {
          formatting: {
            keyQuote,
            keySpace,
            leadingSpace,
            trailingSpace,
            valueSpace,
            whitespacePrefix,
          },
          nestedValue: '',
          originalKey: key
        };
      } else {
        // Nested object within nested object
        nestedContent += line + '\n';
      }
      nestedDepth++;
      continue;
    }

    // Check for nested object end
    if ((line === '}' || line === '},') && arrayDepth === 0) {
      nestedDepth--;
      if (nestedDepth === 0) {
        // End of the current nested object
        currentPair.nestedValue = parseAndVerifyObjectPairs(nestedContent, depth + 1);
        parsedPairs.push(currentPair);
        currentPair = {};
        nestedContent = '';
      } else if (nestedDepth > 0) {
        // Closing brace of a nested object within nested object
        nestedContent += line + '\n';
      } else {
        throw new Error(`Unexpected closing brace at line ${lineNumber + 1}: ${line}`);
      }
      continue;
    }

    // If we're inside a nested object, accumulate the content
    if (nestedDepth > 0) {
      nestedContent += line + '\n';
      continue;
    }

    if (line.endsWith('[')) {
      const arrayStartMatch = line.match(NESTED_ARR_START_REGEX);
      if (arrayStartMatch) {
        const [, leadingSpace, keyQuote, key, keySpace, valueSpace, trailingSpace] = arrayStartMatch;
        currentPair = {
          arrayValue: '[\n',
          formatting: {
            keyQuote,
            keySpace,
            leadingSpace,
            trailingSpace,
            valueSpace,
            whitespacePrefix,
          },
          originalKey: key,
        };
        arrayDepth++;
        continue;
      }
    }

    // Check for array end
    if ((line.startsWith(']') || line.startsWith('}]')) && arrayDepth > 0) {

      arrayDepth--;
      currentPair.arrayValue += currentPair.formatting.whitespacePrefix + line;
      console.log(line);
      parsedPairs.push(currentPair);
      currentPair = {};
      continue;
    }

    if (arrayDepth > 0) {
      currentPair.arrayValue += currentPair.formatting.whitespacePrefix + ' ' + line + '\n';
      continue;
    }

    // Regular expression to match valid key-value pairs
    const match = line.match(VALID_KEY_PAIR_REGEX);
    if (!match) {
      throw new Error(`${text}`);
    }

    const [, leadingSpace, keyQuote, key, keySpace, valueSpace, value, trailingSpace] = match;
    // test key for space
    if (key.includes(' ')) {
      throw new Error(`Invalid key format at line ${lineNumber + 1}: ${line}\nKeys cannot contain spaces.`);
    }

    if (keyQuote && (key.includes('"') || key.includes('\''))) {
      throw new Error(`Invalid key format at line ${lineNumber + 1}: ${line}\nKeys with quotes must be fully enclosed in matching quotes.`);
    }

    // Validate value format
    let trimmedValue = value.trim();
    if (trimmedValue.endsWith(',')) {
      trimmedValue = trimmedValue.slice(0, -1);
    }

    if (trimmedValue.startsWith('\'') !== trimmedValue.endsWith('\'') ||
      trimmedValue.startsWith('"') !== trimmedValue.endsWith('"')) {
      throw new Error(`Invalid value format at line ${lineNumber + 1}: ${line}\nValues with quotes must be fully enclosed in matching quotes.`);
    }

    parsedPairs.push({
      formatting: {
        keyQuote,
        keySpace,
        leadingSpace,
        trailingSpace,
        valueSpace,
        whitespacePrefix
      },
      originalKey: key,
      originalValue: value
    });
  }

  if (nestedDepth > 0) {
    throw new Error('Unclosed nested object');
  }

  return parsedPairs;
}

module.exports = parseAndVerifyObjectPairs;