const {
  COMMENT_REGEX,
  COMMENT_FRAGMENT_REGEX,
  DECLARATION_REGEX,
  WHITESPACE_SURROUND_REGEX,
} = require('./constants');

/**
 * Handles the full object selection process.
 * @param {string} text - The input text containing the object to process.
 * @returns {string} The processed and formatted object as a string.
 * @throws {Error} If the text is empty or processing fails.
 */
function handleFullObjectSelection(text) {
  text = text.trim();
  text = text.replaceAll(COMMENT_REGEX, '$2');
  text = text.replaceAll(COMMENT_FRAGMENT_REGEX, '');
  if (text) text = text.replaceAll(WHITESPACE_SURROUND_REGEX, '');
  else throw new Error('No text selected');
  const match = text.match(DECLARATION_REGEX);
  
  const matchData = {
    isKeyPairs: false,
    objectContent: '',
    objectEnd: '',
    objectName: '',
    objectStart: '',
  };

  if (match) {
    const [, declarationType, objectName, objectContent] = match;
    if (declarationType) {
      matchData.objectStart += declarationType + ' ';
    }
    if (objectName) {
      matchData.objectStart += objectName;
    }
    matchData.objectStart += ' =' + ' {\n';
    matchData.objectContent += objectContent;
    matchData.objectEnd += '}';
  } else {
    if (text.startsWith('{')) {
      matchData.objectStart += '{\n';
      matchData.objectContent += text.replaceAll(/^{|}$/g, '');
      matchData.objectEnd += '}';
    } else {
      matchData.objectContent += text;
      matchData.isKeyPairs = true;
    }
  }

  return matchData;
}

module.exports = handleFullObjectSelection;