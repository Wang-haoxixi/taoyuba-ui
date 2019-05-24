module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      'ignores': [],
    }],
    'prettier/prettier': [
      'error', {
        // singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'babel',
        insertPragma: true,
        requirePragma: true,
      },
    ],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
