'use strict';

const config = require('config');
const knex = require('../knex.js');
const db = knex.database;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const admin = require('firebase-admin');
const serviceAccount = JSON.parse(config.get('FIREBASE_KEY'));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pigo-books-7e9fe.firebaseio.com"
});

/**
 * Adds book to the user's cart
 *
 * body AddToCartRequest bookID and number of copies to add to the cart (optional)
 * returns Cart
 **/
exports.addBookToCart = async function(body, userID) {
    //check if there are books with given bookID
    const book = await db.select().from('Book').where('bookID', body.bookID);
      if (book.length <= 0) {
      throw {actualResponse: 'Book not found', status: 404};
    }
    else {
        //check if the book with given bookID is already in the cart
        const bookInCart = await db.select().from('Cart').where({userID: userID, bookID: body.bookID});
        if (bookInCart.length <= 0) {
            //if the book isn't already in the cart, add it with given number of copies
            await db('Cart').insert([{userID: userID, bookID: body.bookID, copies: body.copies}]);
            const result = await db.select('bookID', 'copies').from('Cart').where('userID', userID);
            return {actualResponse: result, status: 201};
      }
      else {
          //else (the book is already in the cart) update the number of copies, by adding the given value
          await db('Cart').update({copies: bookInCart[0].copies + body.copies}).where({userID: userID, bookID: body.bookID});
          const result = await db.select('bookID', 'copies').from('Cart').where('userID', userID);
          return {actualResponse: result, status: 201};
      }
    }
};


/**
 * Creates user
 * Creates a new user profile
 *
 * body User User that needs to register (optional)
 * returns UserWithID
 **/
exports.createUser = async function(body) {
    //check if the the username is already taken (it must be unique)
    const user = await db.select().from('User').where('username', body.username);
    if (user.length>0) throw {actualResponse: 'User already registered', status: 400};
    //hash the password with a salt
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(body.password, salt);
    //create the user
    await db('User').insert([{username: body.username, firstName: body.firstName, lastName: body.lastName, email: body.email, password_hashed: hashed, phone: body.phone, imageID: body.imageID}]);
    const registered = await db.select('userID', 'username', 'imageID').from('User').where('username', body.username);
    //get the token, so that the registered user is already logged in
    registered[0].token = jwt.sign({userID: registered[0].userID}, config.get('jwtPrivateKey'));
    //send the link to the image instead of the imageID
    registered[0].imageLink = 'https://pigo-books.s3.eu-central-1.amazonaws.com/' + registered[0].imageID;
    delete registered[0].imageID;
    return {actualResponse: registered, status: 201};
};


/**
 * Deletes user
 * A logged in user deletes his own account
 *
 * returns UserWithID
 **/
exports.deleteUser = async function(userID) {
    //check if there is a user with given userID
    const user = await db.select('userID','username','firstName','lastName','email','phone').from('User').where('userID', userID);
    if (user.length <= 0) throw {actualResponse: 'User not found', status: 404};
    else{
        //delete the user
        await db('User').del().where('userID', userID);
        return {actualResponse: user, status: 200};
    }
};


/**
 * Returns user data
 *
 * returns UserWithoutPass
 **/
exports.getUser = async function(userID) {
    //get the data about the user with given userID (if it exists)
    const user = await db.select('username','firstName','lastName','email','phone').from('User').where('userID', userID);
    if (user.length <= 0) throw {actualResponse: 'User not found', status: 404};
    else return {actualResponse: user, status: 200};
};


/**
 * Gets the shopping cart of the user
 *
 * returns Cart
 **/
exports.getUserCart = async function(userID) {
    //check if there is a user with given userID
    const user = await db.select().from('User').where('userID', userID);
    if (user.length <= 0) throw {actualResponse: 'User not found', status: 404};
    else{
        //get the books in user's cart
        const books = await db.select('Book.bookID','Book.name','Book.image_path','Book.cost','Cart.copies',).from('Cart').join('Book',{'Book.bookID' : 'Cart.bookID'}).where('userID', userID);
        //for every book, get the authors
        const nBooks = books.length;
        for (var i=0; i< nBooks; i++){
            const bookID = books[i].bookID;
            books[i].authors = await db.select('Author.authorID', 'Author.firstName', 'Author.lastName').from('Author').join('BookAuthor', {'Author.authorID' : 'BookAuthor.authorID'}).where('BookAuthor.bookID', bookID);
        }
        return {actualResponse: books, status: 200};
    }
};


/**
 * Logs user into the system
 *
 * username String The user name for login
 * password String The password for login
 * returns Token
 **/
exports.loginUser = async function(body) {
    //check if there is a user with given username
    const user = await db.select().from('User').where("username", body.username);
    if (user.length<=0) throw {actualResponse: 'Invalid username or password', status: 400};
    else {
        //check if the password is correct
        const isValid = await bcrypt.compare(body.password, user[0].password_hashed);
        if (!isValid) throw {actualResponse: 'Invalid username or password', status: 400};
        else {
            //if the password is valid, send the token and the username to the user
            const token = jwt.sign({userID: user[0].userID}, config.get('jwtPrivateKey'));
            return {actualResponse: {token: token, username: user[0].username, imageLink: 'https://pigo-books.s3.eu-central-1.amazonaws.com/' + user[0].imageID}, status: 201};
      }
    }
};


/**
 * Buy books from user's cart
 *
 * returns Cart
 **/
exports.userCartBuyBooks = async function(userID) {
    //get the books in the user's cart
    const books = await db.select('bookID', 'copies').from('Cart').where('userID', userID);

    //create the order, with the association to its user and the date. get the orderID generated
    const orderID = await db('Order').insert({userID: userID, date: new Date()}).returning('orderID');

    //use an array to create the rows that represent the books (with the number of copies) in the order
    //at each position of the array there is a row
    const numberOfOrderedBooks = books.length;
    let booksArray = [];
    for (let i = 0; i < numberOfOrderedBooks; i++) {
      booksArray[i] = {orderID: orderID[0], bookID: books[i].bookID, copies: books[i].copies};
    }
    //all the rows are inserted in the OrderBook table with only 1 insert
    //doing 1 insert for each row would have been less efficient, that's why the array is useful
    await db('OrderBook').insert(booksArray);
    const order = await db.select('bookID', 'copies').from('OrderBook').where('orderID', orderID[0]);
    //delete all the books from the cart, since they have been ordered
    await db('Cart').del().where('userID', userID);
    return {actualResponse: order, status: 201};
};


/**
 * Deletes book from the user's cart
 *
 * bookID Long ID of the book to delete from the cart
 * returns Cart
 **/
exports.userCartDeleteBookBookID = async function(bookID, userID) {
    //check if the book with given bookID is in the user's cart
    const books = await db.select().from('Cart').where({userID: userID, bookID: bookID});
    if (books.length <= 0) {
        throw {actualResponse: "Book not found", status: 404};
    }
    else {
        //delete the book from the cart (by means of deleting all of the copies, so deleting the row in the table)
        await db('Cart').del().where({userID: userID, bookID: bookID});
        const cart = await db.select('bookID', 'copies').from('Cart').where('userID', userID);
        return {actualResponse: cart, status: 200};
    }
};


exports.getUserOrders = async function(userID) {
    //check if there is a user with given userID
    const user = await db.select().from('User').where('userID', userID);
    if (user.length <= 0) throw {actualResponse: 'User not found', status: 404};
    else{
        //get all the orderIDs of the user. They won't be unique due to the structure of "Order" table
        const ordersID = await db.select('orderID').from('Order').where('userID', userID);
        //make the orderIDs unique
        let ordersIDArray = [];
        const numberOfNotUniqueOrdersID = ordersID.length;
        for (let i = 0; i < numberOfNotUniqueOrdersID; i++){
            ordersIDArray[i] = ordersID[i].orderID;
        }
        //this array contains the unique orderIDs
        let uniqueOrdersID = [...new Set(ordersIDArray)];
        const numberOfOrders = uniqueOrdersID.length;
        const orders = [];
        for (let i=0; i < numberOfOrders; i++){
            //get the date of the order
            const date = await db.select('date').from('Order').where('orderID', uniqueOrdersID[i]);
            //put the date in a better format
            orders[i] = {date: date[0].date.toISOString().slice(0,10)};
            //get the data about all the books ordered in every specific order
            orders[i].books = await db.select('Book.bookID', 'Book.name', 'Book.image_path', 'Book.cost', 'OrderBook.copies').from('OrderBook').join('Book', {'OrderBook.bookID' : 'Book.bookID'}).where('orderID', uniqueOrdersID[i]);
        }
        return {actualResponse: orders, status: 200};
    }
};

exports.createThirdPartyUser = async function createThirdPartyUser(body) {
    //check if the the uid is already taken (it must be unique)
    const decodedIdToken = await admin.auth().verifyIdToken(body.idToken);
    const uid = decodedIdToken.uid;
    const user = await db.select().from('UserThirdParty').where('uid', uid);
    if (user.length>0) throw {actualResponse: 'User already registered', status: 400};
    //create the user
    await db('UserThirdParty').insert([{uid: uid, username: body.username, firstName: body.firstName, lastName: body.lastName, email: body.email, phone: body.phone, imageID: body.imageID}]);
    const registered = await db.select('userID', 'username', 'imageID').from('UserThirdParty').where('username', body.username);
    //send the link to the image instead of the imageID
    registered[0].imageLink = 'https://pigo-books.s3.eu-central-1.amazonaws.com/' + registered[0].imageID;
    delete registered[0].imageID;
    return {actualResponse: registered, status: 201};
};

