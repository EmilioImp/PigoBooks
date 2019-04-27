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
  return new Promise(function(resolve, reject) {
    db.select().from('Author').where('authorID', authorID).then(function(author){
      db.select('Book.bookID', 'name').from('Book').join('BookAuthor', {'Book.bookID' : 'BookAuthor.bookID'}).where('authorID', authorID).then(function(books){
        resolve(author.concat(books));
      })

    })
  });
}


/**
 * Returns all authors' essential data
 *
 * returns List
 **/
exports.getAuthors = function() {
  return new Promise(function(resolve, reject) {
    db.select().from('Author').then(function(authors) {
      resolve(authors);
    })
  });
}

