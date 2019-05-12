'use strict';

const knex = require('../knex.js');
const db = knex.database;

/**
 * Returns a single author by ID
 *
 * authorID Long ID of the author to return
 * returns Author
 **/
exports.getAuthorByID = async function(authorID) {
    const author = await db.select().from('Author').where('authorID', authorID);
    if (author.length <= 0) throw {actualResponse: 'Author not found', status: 404};
    else{
      author[0].writtenBooks = await db.select('Book.bookID', 'name').from('Book').join('BookAuthor', {'Book.bookID' : 'BookAuthor.bookID'}).where('authorID', authorID);
      return {actualResponse: author, status: 200};
    }
};


/**
 * Returns all authors' essential data
 *
 * returns List
 **/
exports.getAuthors = async function() {
    const authors = await db.select().from('Author');
    if (authors.length <= 0) throw {actualResponse: 'No author found', status: 404};
    else return {actualResponse: authors, status: 200};
};

