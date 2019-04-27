'use strict';

const knex = require('../knex.js');
const db = knex.database;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Adds books to the user's cart
 *
 * bookID Long ID of the book to add to the cart
 * returns Cart
 **/
exports.addBooksToCart = function(bookID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "booklist" : [ {
    "name" : "Il sentiero",
    "id" : 0,
    "authors" : [ {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    }, {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    } ]
  }, {
    "name" : "Il sentiero",
    "id" : 0,
    "authors" : [ {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    }, {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    } ]
  } ],
  "total_price" : 6,
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Creates user
 * Creates a new user profile
 *
 * body User User that needs to register (optional)
 * returns UserWithID
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    db.select().from('User').where('username', body.username).then(function (user) {
      if (user.length>0) return reject('User already registered');
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(body.password, salt, function(err, hashed) {
          db('User').insert([{username: body.username, firstName: body.firstName, lastName: body.lastName, email: body.email, password_hashed: hashed, phone: body.phone}]).then(function () {
            db.select('userID', 'username').from('User').where('username', body.username).then(function(registered) {
              resolve(registered);
          })
          })
        })
      })
    })
  });
}


/**
 * Deletes user
 * A logged in user deletes his own account
 *
 * returns UserWithID
 **/
exports.deleteUser = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "phone" : "phone",
  "id" : 0,
  "email" : "email",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns user data
 *
 * returns User
 **/
exports.getUser = function(userID) {
  return new Promise(function(resolve, reject) {
    db.select('username','firstName','lastName','email','phone').from('User').where('userID', userID).then(function (user) {
      resolve(user);
    })
  });
}


/**
 * Gets the shopping cart of the user
 *
 * returns Cart
 **/
exports.getUserCart = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "booklist" : [ {
    "name" : "Il sentiero",
    "id" : 0,
    "authors" : [ {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    }, {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    } ]
  }, {
    "name" : "Il sentiero",
    "id" : 0,
    "authors" : [ {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    }, {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    } ]
  } ],
  "total_price" : 6,
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs user into the system
 *
 * username String The user name for login
 * password String The password for login
 * returns Token
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    db.select().from('User').where("username", username).then(function (user) {
      if (user.length<=0) reject('Invalid username or password');
      else bcrypt.compare(password, user[0].password_hashed, function (err, isValid) {
        if (!isValid) reject('Invalid username or password');
        else {
          const token = jwt.sign({userID: user[0].userID}, 'jwtPrivateKey');
          resolve(token);
        }
      })
    })
  });
}


/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Buy books from user's cart
 *
 * returns Cart
 **/
exports.userCartBuyBooksPOST = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "booklist" : [ {
    "name" : "Il sentiero",
    "id" : 0,
    "authors" : [ {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    }, {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    } ]
  }, {
    "name" : "Il sentiero",
    "id" : 0,
    "authors" : [ {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    }, {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    } ]
  } ],
  "total_price" : 6,
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes book from the user's cart
 *
 * bookID Long ID of the book to delete from the cart
 * returns Cart
 **/
exports.userCartDeleteBookBookIDDELETE = function(bookID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "booklist" : [ {
    "name" : "Il sentiero",
    "id" : 0,
    "authors" : [ {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    }, {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    } ]
  }, {
    "name" : "Il sentiero",
    "id" : 0,
    "authors" : [ {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    }, {
      "firstName" : "firstName",
      "lastName" : "",
      "id" : 0
    } ]
  } ],
  "total_price" : 6,
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

