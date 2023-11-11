module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'vue/no-v-html': 'off',
    'import/prefer-default-export': 0,
    'prettier/prettier': [
      'warn',
      {
        semi: true,
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        endOfLine: 'auto',
        printWidth: 120,
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'css',
        vueIndentScriptAndStyle: false,
        embeddedLanguageFormatting: 'off'
      }
    ],
    curly: 'error'
  }
};
