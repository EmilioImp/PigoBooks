'use strict';

const knex = require('../knex.js');
const db = knex.database;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Adds book to the user's cart
 *
 * body AddToCartRequest bookID and number of copies to add to the cart (optional)
 * returns Cart
 **/
exports.addBookToCart = function(body, userID) {
  return new Promise(function(resolve, reject) {
    db.select().from('Book').where('bookID', body.bookID).then(function (book) {
      if (book.length <= 0) {
        reject({actualResponse: 'Book not found', status: 404});
      }
      else {
        db.select().from('Cart').where({userID: userID, bookID: body.bookID}).then(function (bookInCart) {
          if (bookInCart.length <= 0) {
            db('Cart').insert([{userID: userID, bookID: body.bookID, copies: body.copies}]).then(function () {
              db.select('bookID', 'copies').from('Cart').where('userID', userID).then(function (result) {
                resolve({actualResponse: result, status: 201});
              })
            })
          }
          else {
            db('Cart').update({copies: bookInCart[0].copies + body.copies}).where({userID: userID, bookID: body.bookID}).then(function () {
              db.select('bookID', 'copies').from('Cart').where('userID', userID).then(function (result) {
                resolve({actualResponse: result, status: 201});
              })
            })
          }
        })
      }
    });
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
      if (user.length>0) return reject({actualResponse: 'User already registered', status: 400});
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(body.password, salt, function(err, hashed) {
          db('User').insert([{username: body.username, firstName: body.firstName, lastName: body.lastName, email: body.email, password_hashed: hashed, phone: body.phone}]).then(function () {
            db.select('userID', 'username').from('User').where('username', body.username).then(function(registered) {
              resolve({actualResponse: registered, status: 201});
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
exports.deleteUser = function(userID) {
  return new Promise(function(resolve, reject) {
    db.select('userID','username','firstName','lastName','email','phone').from('User').where('userID', userID).then(function (user) {
      db('User').del().where('userID', userID).then(function () {
        resolve({actualResponse: user, status: 200})
      })
    })
  });
}


/**
 * Returns user data
 *
 * returns UserWithoutPass
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
exports.getUserCart = function(userID) {
  return new Promise(function(resolve, reject) {
    db.select('bookID', 'copies').from('Cart').where('userID', userID).then(function (books) {
      resolve(books);
    })
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
      if (user.length<=0) reject({actualResponse: 'Invalid username or password', status: 400});
      else bcrypt.compare(password, user[0].password_hashed, function (err, isValid) {
        if (!isValid) reject({actualResponse: 'Invalid username or password', status: 400});
        else {
          const token = jwt.sign({userID: user[0].userID}, 'jwtPrivateKey');
          resolve({actualResponse: token, status: 201});
        }
      })
    })
  });
}


/**
 * Buy books from user's cart
 *
 * returns Cart
 **/
exports.userCartBuyBooksPOST = function(userID) {
  return new Promise(function(resolve, reject) {
    db.select('bookID', 'copies').from('Cart').where('userID', userID).then(function (books) {
      db('Order').insert([{userID: userID}]).returning('orderID').then(function (orderID) {
        var numberOfOrderedBooks = books.length;
        var booksArray = [];
        for (var i = 0; i < numberOfOrderedBooks; i++) {
          booksArray[i] = {orderID: orderID[0], bookID: books[i].bookID, copies: books[i].copies};
        }
        db('OrderBook').insert(booksArray).then(function () {
          db.select('bookID', 'copies').from('OrderBook').where('orderID', orderID[0]).then(function (order) {
            db('Cart').del().where('userID', userID).then(function () {
              resolve({actualResponse: order, status: 201});
            })
          })
        });
      })
    })
  });
}


/**
 * Deletes book from the user's cart
 *
 * bookID Long ID of the book to delete from the cart
 * returns Cart
 **/
exports.userCartDeleteBookBookIDDELETE = function(bookID, userID) {
  return new Promise(function(resolve, reject) {
    db.select().from('Cart').where({userID: userID, bookID: bookID}).then(function (books) {
      if (books.length <= 0) {
        reject({actualResponse: "Book not found", status: 404});
      }
      else {
        db('Cart').del().where({userID: userID, bookID: bookID}).then(function () {
          db.select('bookID', 'copies').from('Cart').where('userID', userID).then(function (cart) {
            resolve({actualResponse: cart, status: 200})
          })
        })
      }
    })
  });
}

