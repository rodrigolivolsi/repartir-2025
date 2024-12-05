const path = require('path');

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname, '../main/frontend/node_modules'),
      'node_modules'
    ]
  }
};