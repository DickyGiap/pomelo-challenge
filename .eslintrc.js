module.exports = {
  extends: ['plugin:@hapi/recommended'],
  rules: {
    strict: ['off', 'global'],
    '@hapi/capitalize-modules': ['off'],
    indent: ['warn', 2],
    'func-style': ['off'],
    '@hapi/scope-start': ['off']
  }
};
