'use strict';

const knex = require('../knex.js');
const db = knex.database;

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
         books[i].authors = await db.select('Author.authorID', 'Author.firstName', 'Author.lastName').from('Author').join('BookAuthor', {'Author.authorID' : 'BookAuthor.authorID'}).where('BookAuthor.bookID', bookID);
       }
       return {actualResponse: books, status: 200};
    }
};


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
};


/**
 * Finds books by theme
 *
 * theme List Theme values that need to be considered for filter
 * returns List
 **/
exports.findBooksByTheme = async function(theme) {
  const bookTheme = await db.select().from('BookTheme').where('theme', theme);
  if (bookTheme.length <= 0) throw {actualResponse: 'No books with that theme', status: 404};
  else{
    const books = await db.select('Book.bookID', 'Book.name').from('Book').join('BookTheme', {'Book.bookID' : 'BookTheme.bookID'}).where('theme', theme);
    const nBooks = books.length;
    for (var i=0; i< nBooks; i++){
      const bookID = books[i].bookID;
      books[i].authors = await db.select('Author.authorID', 'Author.firstName', 'Author.lastName').from('Author').join('BookAuthor', {'Author.authorID' : 'BookAuthor.authorID'}).where('BookAuthor.bookID', bookID);
    }
    return {actualResponse: books, status: 200};
  }
};


/**
 * Find book by ID
 * Returns a single book
 *
 * bookID Long ID of the book to return
 * returns Book
 **/
exports.getBookById = async function(bookID) {
  const book = await db.select().from('Book').where('bookID', bookID);
  if (book.length <= 0) throw {actualResponse: 'Book not found', status: 404};
  else{
    book[0].authors = await db.select('Author.authorID', 'Author.firstName', 'Author.lastName').from('Author').join('BookAuthor', {'Author.authorID' : 'BookAuthor.authorID'}).where('BookAuthor.bookID', bookID);
    return {actualResponse: book, status: 200};
  }
};

exports.getGenres = async function () {
  const genres = await db.select('genre').from('BookGenre');
  const nGenres = genres.length;
  let genresArray = [];
  for (let i=0; i < nGenres; i++){
    genresArray[i] = genres[i].genre;
  }
  let uniqueGenresArray = [...new Set(genresArray)];
  return {actualResponse: uniqueGenresArray, status: 200};
};

exports.getThemes = async function () {
  const themes = await db.select('theme').from('BookTheme');
  const nThemes = themes.length;
  let themesArray = [];
  for (let i=0; i < nThemes; i++){
    themesArray[i] = themes[i].theme;
  }
  let uniqueThemesArray = [...new Set(themesArray)];
  return {actualResponse: uniqueThemesArray, status: 200};
};

exports.getSimilarBooks = async function (bookID) {
  const similarBooks = await db.select('Book.bookID', 'Book.name').from('Book').join('BookSimilar', {'Book.bookID' : 'BookSimilar.bookSimilarID'}).where('BookSimilar.bookID', bookID);
  if (similarBooks.length <= 0) throw {actualResponse: 'No similar books found', status: 404};
  else{
    return {actualResponse: similarBooks, status: 200};
  }
};

