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
  return new Promise(async function(resolve, reject) {
    const book = await db.select().from('Book').where('bookID', body.bookID);
      if (book.length <= 0) {
      reject({actualResponse: 'Book not found', status: 404});
    }
    else {
      const bookInCart = await db.select().from('Cart').where({userID: userID, bookID: body.bookID});
      if (bookInCart.length <= 0) {
        await db('Cart').insert([{userID: userID, bookID: body.bookID, copies: body.copies}]);
        const result = await db.select('bookID', 'copies').from('Cart').where('userID', userID);
        resolve({actualResponse: result, status: 201});
      }
      else {
        await db('Cart').update({copies: bookInCart[0].copies + body.copies}).where({userID: userID, bookID: body.bookID});
        const result = await db.select('bookID', 'copies').from('Cart').where('userID', userID);
        resolve({actualResponse: result, status: 201});
      }
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
  return new Promise(async function(resolve, reject) {
    const user = await db.select().from('User').where('username', body.username);
    if (user.length>0) return reject({actualResponse: 'User already registered', status: 400});
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(body.password, salt);444
    await db('User').insert([{username: body.username, firstName: body.firstName, lastName: body.lastName, email: body.email, password_hashed: hashed, phone: body.phone}]);
    const registered = await db.select('userID', 'username').from('User').where('username', body.username);
    resolve({actualResponse: registered, status: 201});
  });
}


/**
 * Deletes user
 * A logged in user deletes his own account
 *
 * returns UserWithID
 **/
exports.deleteUser = function(userID) {
  return new Promise(async function(resolve, reject) {
    const user = await db.select('userID','username','firstName','lastName','email','phone').from('User').where('userID', userID);
    await db('User').del().where('userID', userID);
    resolve({actualResponse: user, status: 200});
  });
}


/**
 * Returns user data
 *
 * returns UserWithoutPass
 **/
exports.getUser = function(userID) {
  return new Promise(async function(resolve, reject) {
    const user = await db.select('username','firstName','lastName','email','phone').from('User').where('userID', userID);
    resolve(user);
  });
}


/**
 * Gets the shopping cart of the user
 *
 * returns Cart
 **/
exports.getUserCart = function(userID) {
  return new Promise(async function(resolve, reject) {
    const books = await db.select('bookID', 'copies').from('Cart').where('userID', userID);
    resolve(books);
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
  return new Promise(async function(resolve, reject) {
    const user = await db.select().from('User').where("username", username);
    if (user.length<=0) reject({actualResponse: 'Invalid username or password', status: 400});
    else {
      const isValid = await bcrypt.compare(password, user[0].password_hashed);
      if (!isValid) reject({actualResponse: 'Invalid username or password', status: 400});
      else {
        const token = jwt.sign({userID: user[0].userID}, 'jwtPrivateKey');
        resolve({actualResponse: token, status: 201});
      }
    }
  });
}


/**
 * Buy books from user's cart
 *
 * returns Cart
 **/
exports.userCartBuyBooksPOST = function(userID) {
  return new Promise(async function(resolve, reject) {
    const books = await db.select('bookID', 'copies').from('Cart').where('userID', userID);
    const orderID = await db('Order').insert([{userID: userID}]).returning('orderID');
    var numberOfOrderedBooks = books.length;
    var booksArray = [];
    for (var i = 0; i < numberOfOrderedBooks; i++) {
      booksArray[i] = {orderID: orderID[0], bookID: books[i].bookID, copies: books[i].copies};
    }
    await db('OrderBook').insert(booksArray);
    const order = await db.select('bookID', 'copies').from('OrderBook').where('orderID', orderID[0]);
    await db('Cart').del().where('userID', userID);
    resolve({actualResponse: order, status: 201});
  });
}


/**
 * Deletes book from the user's cart
 *
 * bookID Long ID of the book to delete from the cart
 * returns Cart
 **/
exports.userCartDeleteBookBookIDDELETE = function(bookID, userID) {
  return new Promise(async function(resolve, reject) {
    const books = await db.select().from('Cart').where({userID: userID, bookID: bookID});
    if (books.length <= 0) {
      reject({actualResponse: "Book not found", status: 404});
    }
    else {
      await db('Cart').del().where({userID: userID, bookID: bookID});
      const cart = await db.select('bookID', 'copies').from('Cart').where('userID', userID);
      resolve({actualResponse: cart, status: 200});
    }
  });
}

