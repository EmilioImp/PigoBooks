'use strict';

const config = require('config');
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
    await db('User').insert([{username: body.username, firstName: body.firstName, lastName: body.lastName, email: body.email, password_hashed: hashed, phone: body.phone}]);
    const registered = await db.select('userID', 'username').from('User').where('username', body.username);
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
}


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
}


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
        const books = await db.select('Book.bookID','Book.name','Book.image_path','Cart.copies',).from('Cart').join('Book',{'Book.bookID' : 'Cart.bookID'}).where('userID', userID);
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
            //if the password is valid, send the token to the user
            const token = jwt.sign({userID: user[0].userID}, config.get('jwtPrivateKey'));
            return {actualResponse: {token: token}, status: 201};
      }
    }
}


/**
 * Buy books from user's cart
 *
 * returns Cart
 **/
exports.userCartBuyBooks = async function(userID) {
    //get the books in the user's cart
    const books = await db.select('bookID', 'copies').from('Cart').where('userID', userID);
    //use an array to create the rows that represent the books (with the number of copies) in the order
    //at each position of the array there is a row
    const numberOfOrderedBooks = books.length;
    let booksArray = [];
    //the first insert is done without using the array, in order to get the orderID generated by the database
    const orderID = await db('Order').insert({bookID: books[0].bookID, copies: books[0].copies, date: new Date(), userID: userID}).returning('orderID');
    //the for starts from 1 instead of 0 because the first book has just been inserted
    for (let i = 1; i < numberOfOrderedBooks; i++) {
      booksArray[i-1] = {orderID: orderID[0], bookID: books[i].bookID, copies: books[i].copies, date: new Date(), userID: userID};
    }
    //all the rows are inserted in the OrderBook table with only 1 insert
    //doing 1 insert for each row would have been less efficient, that's why the array is useful
    await db('Order').insert(booksArray);
    const order = await db.select('bookID', 'copies').from('Order').where('orderID', orderID[0]);
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
        //get all the orderIDs of the user. They want be unique due to the structure of "Order" table
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
            //get each the data about each order of the user (data about one order for each iteration of the cycle)
            orders[i] = await db.select('Book.bookID', 'Book.name', 'Order.copies', 'Order.date').from('Order').join('Book', {'Order.bookID' : 'Book.bookID'}).where('orderID', uniqueOrdersID[i]);
            //make the format of the data to be returned more clear
            const numberOfBooks = orders[i].length;
            for (let j=0; j < numberOfBooks; j++){
                orders[i][j].book = {bookID: orders[i][j].bookID, name: orders[i][j].name };
                orders[i][j].date = orders[i][j].date.toISOString().slice(0,10);
                delete orders[i][j].bookID;
                delete orders[i][j].name;
            }
        }
        return {actualResponse: orders, status: 200};
    }
};

