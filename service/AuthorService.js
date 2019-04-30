'use strict';

const knex = require('../knex.js');
const db = knex.database;

/**
 * Returns a single author by ID
 *
 * authorID Long ID of the author to return
 * returns Author
 **/
exports.getAuthorByID = function(authorID) {
  return new Promise(async function(resolve, reject) {
    const author = await db.select().from('Author').where('authorID', authorID);
    if (author.length <= 0) reject({actualResponse: 'Author not found', status: 404});
    else{
      const books = await db.select('Book.bookID', 'name').from('Book').join('BookAuthor', {'Book.bookID' : 'BookAuthor.bookID'}).where('authorID', authorID);
      resolve({actualResponse: author.concat(books), status: 200});
    }
  });
}


/**
 * Returns all authors' essential data
 *
 * returns List
 **/
exports.getAuthors = function() {
  return new Promise(async function(resolve, reject) {
    const authors = await db.select().from('Author');
    if (authors.length <= 0) reject({actualResponse: 'No author found', status: 404});
    else resolve({actualResponse: authors, status: 200});
  });
}

