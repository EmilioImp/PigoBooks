'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

module.exports.addBook = function addBook (req, res, next) {
  var body = req.swagger.params['body'].value;
  Book.addBook(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteBook = function deleteBook (req, res, next) {
  var bookID = req.swagger.params['bookID'].value;
  Book.deleteBook(bookID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBooksByAuthor = function findBooksByAuthor (req, res, next) {
  var author = req.swagger.params['author'].value;
  Book.findBooksByAuthor(author)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findBooksByGenre = function findBooksByGenre (req, res, next) {
  var genre = req.swagger.params['genre'].value;
  Book.findBooksByGenre(genre)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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

module.exports.findBooksByStatus = function findBooksByStatus (req, res, next) {
  var status = req.swagger.params['status'].value;
  Book.findBooksByStatus(status)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookById = function getBookById (req, res, next) {
  var bookID = req.swagger.params['bookID'].value;
  Book.getBookById(bookID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateBook = function updateBook (req, res, next) {
  var bookID = req.swagger.params['bookID'].value;
  var body = req.swagger.params['body'].value;
  Book.updateBook(bookID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
