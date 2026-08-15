module.exports = {
  'apps/web/**/*.{ts,tsx}': [
    'eslint --config apps/web/eslint.config.js --fix',
    'prettier --write',
  ],
  'apps/api/**/*.ts': ['prettier --write'],
}
