'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('GetSuggestions', function (req, res, next) {
  var viewData = res.getViewData();
  viewData.searchParameter = req.querystring.q;
  res.setViewData(viewData);

  next();
});

module.exports = server.exports();
