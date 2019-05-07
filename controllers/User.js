'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

const auth = require('../authentication.js');

module.exports.addBookToCart = function addBookToCart (req, res, next) {
  const authenticated = auth(req, res);
  if (!authenticated) return;
  var userID = req.user.userID;
  var body = req.swagger.params['body'].value;
  User.addBookToCart(body, userID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.createUser = function createUser (req, res, next) {
  var username = req.swagger.params['username'].value;
  var firstName = req.swagger.params['firstName'].value;
  var lastName = req.swagger.params['lastName'].value;
  var email = req.swagger.params['email'].value;
  var password = req.swagger.params['password'].value;
  var phone = req.swagger.params['phone'].value;
  User.createUser(username, firstName, lastName, email, password, phone)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.deleteUser = function deleteUser (req, res, next) {
  const authenticated = auth(req, res);
  if (!authenticated) return;
  var userID = req.user.userID;
  User.deleteUser(userID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.getUser = function getUser (req, res, next) {
  const authenticated = auth(req, res);
  if (!authenticated) return;
  var userID = req.user.userID;
  User.getUser(userID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.getUserCart = function getUserCart (req, res, next) {
  const authenticated = auth(req, res);
  if (!authenticated) return;
  var userID = req.user.userID;
  User.getUserCart(userID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.loginUser = function loginUser (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  User.loginUser(username,password)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.userCartBuyBooksPOST = function userCartBuyBooksPOST (req, res, next) {
  const authenticated = auth(req, res);
  if (!authenticated) return;
  var userID = req.user.userID;
  User.userCartBuyBooksPOST(userID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userCartDeleteBookBookIDDELETE = function userCartDeleteBookBookIDDELETE (req, res, next) {
  const authenticated = auth(req, res);
  if (!authenticated) return;
  var userID = req.user.userID;
  var bookID = req.swagger.params['bookID'].value;
  User.userCartDeleteBookBookIDDELETE(bookID, userID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};
