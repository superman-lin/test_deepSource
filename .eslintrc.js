module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/no-mutating-props': 'error',
    'vue/require-v-for-key': 'error',
    'eqeqeq': ['error', 'always']
  }
}
