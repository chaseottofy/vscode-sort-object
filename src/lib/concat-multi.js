const {
  KEY_VALUE_BETWEEN,
} = require('./constants');

/**
 * Find values that contain multi-line methods and concatenate them.
 * 
 * Only targets values that contain methods, ignores 
 * multi-line objects/arrays.
 * @param {string} data 
 * @returns {string}
 * @example
 * ```
 * {
 *  "key": new String('a')
 *    .length
 *    .toString(),
 * };
 * 
 * => {
 *  "key": new String('a').length.toString(),
 * }
 * ```
 */
function concatMultiMethod(data) {
  return data.replaceAll(KEY_VALUE_BETWEEN, (match) => {
    return match.split('\n').map((el, i) => i === 0 ? el : el.trim()).join('');
  });
};

module.exports = concatMultiMethod;