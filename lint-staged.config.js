export default {
  '*.{js,ts,json,html,xml,css,scss,sass,md}': 'cspell --no-must-find-files',
  'src/**/*.{js,ts}': 'eslint --max-warnings 0 --fix',
  '*': 'prettier --write --ignore-unknown'
};
