module.exports = { extends: [
'stylelint-config-recommended', 'stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-css-modules', 'stylelint-config-prettier',
],
plugins: ['stylelint-scss'],
ignoreFiles: ['./coverage/**/*.css', './dist/**/*.css'], rules: {
'at-rule-no-unknown': [ true,
{
ignoreAtRules: [
// -------- // Tailwind // -------- 'tailwind', 'apply', 'variants', 'responsive', 'screen',
], },
],
'declaration-block-no-duplicate-custom-properties': null, 'named-grid-areas-no-invalid': null,
'no-duplicate-selectors': null,
'no-empty-source': null,
'selector-pseudo-element-no-unknown': null, 'declaration-block-trailing-semicolon': null,
'no-descending-specificity': null,
'string-no-newline': null,
// Use camelCase for classes and ids only. Works better with CSS modules
// 'selector-class-pattern': /^[a-z][a-zA-Z]*(-(enter|leave)(-(active|to))?)?$/, // 'selector-id-pattern': /^[a-z][a-zA-Z]*$/