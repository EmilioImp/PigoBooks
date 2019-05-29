'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

module.exports.findBooksByGenre = function findBooksByGenre (req, res, next) {
  var genre = req.swagger.params['genre'].value;
  Book.findBooksByGenre(genre)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.findBooksByName = function findBooksByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  Book.findBooksByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBooksByTheme = function findBooksByTheme (req, res, next) {
  var theme = req.swagger.params['theme'].value;
  Book.findBooksByTheme(theme)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.getBookById = function getBookById (req, res, next) {
  var bookID = req.swagger.params['bookID'].value;
  Book.getBookById(bookID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.getGenres = function getGenres (req, res, next) {
  Book.getGenres()
      .then(function (response) {
        utils.writeJson(res, response.actualResponse, response.status);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.getThemes = function getThemes (req, res, next) {
    Book.getThemes()
        .then(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getSimilarBooks = function getSimilarBooks(req, res, next) {
  var bookID = req.swagger.params['bookID'].value;
  Book.getSimilarBooks(bookID)
      .then(function (response) {
        utils.writeJson(res, response.actualResponse, response.status);
      })
      .catch(function (response) {
        utils.writeJson(res, response.actualResponse, response.status);
      })
};

module.exports.favouriteReadings = function favouriteReadings(req, res, next) {
    Book.favouriteReadings()
        .then(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        })
        .catch(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        })
};
