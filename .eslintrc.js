const eslint = require('verify-fabric/dist/eslint');

module.exports = {
  ...eslint,
  rules: {
    ...eslint.rules,
  },
};
