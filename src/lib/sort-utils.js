/**
 * Sorts object pairs by key.
 * @param {Array<Object>} pairs - The array of object pairs to sort.
 * @returns {Array<Object>} The sorted array of object pairs.
 */
function sortPairs(pairs, direction = 'asc') {
  const sortedPairs = pairs.sort((a, b) => {
    const { originalKey: keyA } = a;
    const { originalKey: keyB } = b;
    return direction === 'asc'
      ? keyA.localeCompare(keyB)
      : keyB.localeCompare(keyA);
  });
  return sortedPairs.map((pair) => {
    if (pair.nestedValue) {
      pair.nestedValue = sortPairs(pair.nestedValue, direction);
    }
    return pair;
  });
};

module.exports = sortPairs;