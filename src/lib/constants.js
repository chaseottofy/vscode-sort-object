const constants = {
  MAX_DEPTH: 20,
  MAX_LINES: 10000,
  COMMENT_REGEX: /((?:(?:^[\t ]*)?(?:\/\*[^*]*\*+(?:[^*/][^*]*\*+)*\/(?:[\t ]*\r?\n(?=[\t ]*(?:\r?\n|\/\*|\/\/)))?|\/\/(?:[^\\]|\\(?:\r?\n)?)*?(?:\r?\n(?=[\t ]*(?:\r?\n|\/\*|\/\/))|(?=\r?\n))))+)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|(?:\r?\n|.).[^\s"'/\\]*)/gms,
  COMMENT_FRAGMENT_REGEX: /\/\/.*|\/\*.*|\*\/.*/g,
  DECLARATION_REGEX: /^(const|let|var)?\s*([$A-Z_a-z][\w$]*)\s*=\s*\{([\s\S]*?)\}\s*(?:;\s*)?$/,
  LINE_IS_SPREAD: /^\s*\.{3}([\w$]+)\s*(,|$)/,
  VALID_KEY_PAIR_REGEX: /^(\s*)(["']?)([^:]+)\2(\s*):(\s*)(.+)(\s*)$/,
  NESTED_OBJ_START_REGEX: /^(\s*)(["']?)([^:]+)\2(\s*):(\s*){(\s*)$/,
  WHITESPACE_SURROUND_REGEX: /^\s*[\n\r]/gm,
};

module.exports = constants;
