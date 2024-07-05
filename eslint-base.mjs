const nodeFiles = {
  files: [
    '**/*.{js,mjs,cjs}',
  ]
};

const nodeIgnores = {
  ignores: [
    'node_modules/**',
    'node_modules',
    'dist/**',
    'build/**',
    'coverage/**',
    'docs/**',
    'public/**',
    '.vscode/**',
    '.vscode-test/**',
    'dist',
    'extensions',
    'user-data',
  ]
};

const nodeLanguageOptions = {
  languageOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  }
};

const shared = {
  ...nodeFiles,
  ...nodeIgnores,
  ...nodeLanguageOptions,
};

export default shared;