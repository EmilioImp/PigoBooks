'use strict';

const knex = require('../knex.js');
const db = knex.database;

/**
 * Finds books by author
 *
 * author List Author values that need to be considered for filter
 * returns List
 **/
exports.findBooksByAuthor = function(author) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finds books by genre
 *
 * genre List Genre values that need to be considered for filter
 * returns List
 **/
exports.findBooksByGenre = async function(genre) {
    const bookGenre = await db.select().from('BookGenre').where('genre', genre);
    if (bookGenre.length <= 0) throw {actualResponse: 'No books with that genre', status: 404};
    else{
       const books = await db.select('Book.bookID', 'Book.name').from('Book').join('BookGenre', {'Book.bookID' : 'BookGenre.bookID'}).where('genre', genre);
       const nBooks = books.length;
       for (var i=0; i< nBooks; i++){
         const bookID = books[i].bookID;
         const authors = await db.select('Author.authorID', 'Author.firstName', 'Author.lastName').from('Author').join('BookAuthor', {'Author.authorID' : 'BookAuthor.authorID'}).where('BookAuthor.bookID', bookID);
         books[i] = Object.assign(books[i], authors);
       }
       return {actualResponse: books, status: 200};
    }
}


/**
 * Finds books by name
 *
 * name List Name values that need to be considered for filter
 * returns List
 **/
exports.findBooksByName = function(name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finds books by theme
 *
 * theme List Theme values that need to be considered for filter
 * returns List
 **/
exports.findBooksByTheme = function(theme) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find book by ID
 * Returns a single book
 *
 * bookID Long ID of the book to return
 * returns Book
 **/
exports.getBookById = function(bookID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "themes" : [ {
    "name" : "love"
  }, {
    "name" : "love"
  } ],
  "cost" : 1,
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "edition" : 6,
  "authors" : [ {
    "firstName" : "firstName",
    "lastName" : "",
    "id" : 0
  }, {
    "firstName" : "firstName",
    "lastName" : "",
    "id" : 0
  } ],
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

