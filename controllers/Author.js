'use strict';

var utils = require('../utils/writer.js');
var Author = require('../service/AuthorService');

module.exports.getAuthorByID = function getAuthorByID (req, res, next) {
  var authorID = req.swagger.params['authorID'].value;
  Author.getAuthorByID(authorID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.getAuthors = function getAuthors (req, res, next) {
  Author.getAuthors()
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};
