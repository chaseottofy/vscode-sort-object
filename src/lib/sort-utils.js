/**
 * Sorts object pairs by key.
 * @param {Array<Object>} pairs - The array of object pairs to sort.
 * @returns {Array<Object>} The sorted array of object pairs.
 */
function sortPairs(pairs, direction = 'asc') {
  const sortedPairs = pairs.sort((a, b) => {
    let { originalKey: keyA } = a;
    let { originalKey: keyB } = b;

    if (!keyA) return 1;
    if (!keyB) return -1;

    if (keyA.startsWith('...')) {
      keyA = keyA.slice(3);
    }

    if (keyB.startsWith('...')) {
      keyB = keyB.slice(3);
    } 

    return direction === 'asc'
      ? keyA.localeCompare(keyB, undefined, { numeric: true })
      : keyB.localeCompare(keyA, undefined, { numeric: true });
  });
  return sortedPairs.map((pair) => {
    if (pair.nestedValue) {
      pair.nestedValue = sortPairs(pair.nestedValue, direction);
    }
    return pair;
  });
};

module.exports = sortPairs;