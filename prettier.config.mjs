/** @type {import("prettier").Config} */
export default {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: ['^react$', '^react-dom$', '^@vercel/(.*)$', '^@fontsource/(.*)$', '^@?\\w', '^\\./', '^\\.\\./'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
