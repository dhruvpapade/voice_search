'use strict';

var processInclude = require('base/util');

document.addEventListener("DOMContentLoaded", () => {
  processInclude(require('base/main'));
  processInclude(require('./components/search'));
});
