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

module.exports.addBookToCartThirdParty = function addBookToCartThirdParty (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.addBookToCartThirdParty(body)
      .then(function (response) {
        utils.writeJson(res, response.actualResponse, response.status);
      })
      .catch(function (response) {
        utils.writeJson(res, response.actualResponse, response.status);
      });
};

module.exports.createUser = function createUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.createUser(body)
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

module.exports.getUserThirdParty = function getUserThirdParty (req, res, next) {
    var body = req.swagger.params['body'].value;
    User.getUserThirdParty(body)
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

module.exports.getUserCartThirdParty = function getUserCartThirdParty (req, res, next) {
    var body = req.swagger.params['body'].value;
    User.getUserCartThirdParty(body)
        .then(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        })
        .catch(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        });
};

module.exports.loginUser = function loginUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.loginUser(body)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.userCartBuyBooks = function userCartBuyBooks (req, res, next) {
  const authenticated = auth(req, res);
  if (!authenticated) return;
  var userID = req.user.userID;
  User.userCartBuyBooks(userID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userCartThirdPartyBuyBooks = function userCartThirdPartyBuyBooks (req, res, next) {
    var body = req.swagger.params['body'].value;
    User.userCartThirdPartyBuyBooks(body)
        .then(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.userCartDeleteBookBookID = function userCartDeleteBookBookID (req, res, next) {
  const authenticated = auth(req, res);
  if (!authenticated) return;
  var userID = req.user.userID;
  var bookID = req.swagger.params['bookID'].value;
  User.userCartDeleteBookBookID(bookID, userID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.userCartThirdPartyDeleteBookBookID = function userCartThirdPartyDeleteBookBookID (req, res, next) {
    var body = req.swagger.params['body'].value;
    var bookID = req.swagger.params['bookID'].value;
    User.userCartThirdPartyDeleteBookBookID(body, bookID)
        .then(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        })
        .catch(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        });
};

module.exports.getUserOrders = function getUserOrders (req, res, next) {
  const authenticated = auth(req, res);
  if (!authenticated) return;
  var userID = req.user.userID;
  User.getUserOrders(userID)
      .then(function (response) {
        utils.writeJson(res, response.actualResponse, response.status);
      })
      .catch(function (response) {
        utils.writeJson(res, response.actualResponse, response.status);
      });
};

module.exports.getUserOrdersThirdParty = function getUserOrdersThirdParty (req, res, next) {
    var body = req.swagger.params['body'].value;
    User.getUserOrdersThirdParty(body)
        .then(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        })
        .catch(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        });
};

module.exports.createThirdPartyUser = function createThirdPartyUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.createThirdPartyUser(body)
      .then(function (response) {
        utils.writeJson(res, response.actualResponse, response.status);
      })
      .catch(function (response) {
        utils.writeJson(res, response.actualResponse, response.status);
      });
};

module.exports.modifyUser = function modifyUser (req, res, next) {
    const authenticated = auth(req, res);
    if (!authenticated) return;
    var userID = req.user.userID;
    var body = req.swagger.params['body'].value;
    User.modifyUser(body, userID)
        .then(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        })
        .catch(function (response) {
            utils.writeJson(res, response.actualResponse, response.status);
        });
};