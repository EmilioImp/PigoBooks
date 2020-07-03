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
  //check if there are books with given genre
  const bookGenre = await db.select().from('BookGenre').where('genre', genre);
  if (bookGenre.length <= 0) throw {actualResponse: 'No books with that genre', status: 404};
  else{
    //get the books with given genre
    const books = await db.select('Book.bookID', 'Book.name', 'Book.image_path').from('Book').join('BookGenre', {'Book.bookID' : 'BookGenre.bookID'}).where('genre', genre);
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
 * Finds books by theme
 *
 * theme List Theme values that need to be considered for filter
 * returns List
 **/
exports.findBooksByTheme = async function(theme) {
  //check if there are books with given theme
  const bookTheme = await db.select().from('BookTheme').where('theme', theme);
  if (bookTheme.length <= 0) throw {actualResponse: 'No books with that theme', status: 404};
  else{
    //get the books with given theme
    const books = await db.select('Book.bookID', 'Book.name', 'Book.image_path').from('Book').join('BookTheme', {'Book.bookID' : 'BookTheme.bookID'}).where('theme', theme);
    //for every book, get the authors
    const nBooks = books.length;
    for (var i=0; i< nBooks; i++){
      const bookID = books[i].bookID;
      books[i].authors = await db.select('Author.authorID', 'Author.firstName', 'Author.lastName').from('Author').join('BookAuthor', {'Author.authorID' : 'BookAuthor.authorID'}).where('BookAuthor.bookID', bookID);
    }
    return {actualResponse: books, status: 200};
  }
};

exports.findBooksByName = async function(name) {
  //get the books with given name
  const books = await db.select('Book.bookID', 'Book.name', 'Book.image_path').from('Book').where('Book.name', 'ilike', '%'+ name +'%');
  if (books.length <= 0) throw {actualResponse: 'No books with that name', status: 404};
  else{
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
 * Find book by ID
 * Returns a single book
 *
 * bookID Long ID of the book to return
 * returns Book
 **/
exports.getBookById = async function(bookID) {
  //get the data about the book
  const book = await db.select('name','edition','isbn','cost','image_path','abstract','authorInterview').from('Book').where('bookID', bookID);
  if (book.length <= 0) throw {actualResponse: 'Book not found', status: 404};
  else{
    //get the authors of the book
    book[0].authors = await db.select('Author.authorID', 'Author.firstName', 'Author.lastName').from('Author').join('BookAuthor', {'Author.authorID' : 'BookAuthor.authorID'}).where('BookAuthor.bookID', bookID);
    //get the genres of the book and put them into an array
    const genres = await db.select('BookGenre.genre').from('BookGenre').join('Book', {'BookGenre.bookID' : 'Book.bookID' }).where('Book.bookID', bookID);
    const nGenres = genres.length;
    const genresArray = [];
    for (let i=0; i<nGenres; i++){
      genresArray[i] = genres[i].genre;
    }
    book[0].genres = genresArray;
    //get the themes of the book and put them into an array
    const themes = await db.select('BookTheme.theme').from('BookTheme').join('Book', {'BookTheme.bookID' : 'Book.bookID'}).where('Book.bookID', bookID);
    const nThemes = themes.length;
    const themesArray = [];
    for (let i=0; i<nThemes; i++){
      themesArray[i] = themes[i].theme;
    }
    book[0].themes = themesArray;
    //get all the books similar to the given one
    book[0].similarBooks = await db.select('Book.bookID', 'Book.name', 'Book.image_path').from('Book').join('BookSimilar', {'Book.bookID' : 'BookSimilar.bookSimilarID'}).where('BookSimilar.bookID', bookID);
    //get all the events related to the book
    book[0].events = await db.select('eventID', 'name').from('Event').where('bookID', bookID);
    //get the reviews of the book
    book[0].reviews = await db.select('reviewer', 'review').from('BookReview').where('bookID', bookID);

    return {actualResponse: book, status: 200};
  }
};

exports.getGenres = async function () {
  //get all the genres and put them into an array
  const genres = await db.select('genre').from('BookGenre');
  const nGenres = genres.length;
  let genresArray = [];
  for (let i=0; i < nGenres; i++){
    genresArray[i] = genres[i].genre;
  }
  //there could be repeated genres values in the array, so they are made unique
  let uniqueGenresArray = [...new Set(genresArray)];
  return {actualResponse: uniqueGenresArray, status: 200};
};

exports.getThemes = async function () {
  //get all the themes and put them into an array
  const themes = await db.select('theme').from('BookTheme');
  const nThemes = themes.length;
  let themesArray = [];
  for (let i=0; i < nThemes; i++){
    themesArray[i] = themes[i].theme;
  }
  //there could be repeated theme values in the array, so they are made unique
  let uniqueThemesArray = [...new Set(themesArray)];
  return {actualResponse: uniqueThemesArray, status: 200};
};

exports.favouriteReadings = async function () {
  const persons = await db.select('FavouriteBook.person', 'FavouriteBook.person_image_path', 'Book.bookID', 'Book.name', 'Book.image_path').from('FavouriteBook').join('Book', {'FavouriteBook.bookID' : 'Book.bookID'});
  const numberOfPersons = persons.length;
  if (numberOfPersons <= 0) throw {actualResponse: 'No favourite readings found', status: 404};
  else{
    for(let i=0; i < numberOfPersons; i++){
      persons[i].book = {bookID: persons[i].bookID, name: persons[i].name, image_path: persons[i].image_path};
      delete persons[i].bookID;
      delete persons[i].name;
      delete persons[i].image_path;
    }
    return {actualResponse: persons, status: 200};
  }
};

exports.getBestSellers = async function () {
  const books = await db.select('BestSeller.bookID', 'BestSeller.placement', 'Book.name', 'Book.image_path').from('BestSeller').join('Book', {'BestSeller.bookID' : 'Book.bookID'});
  if (books.length <= 0) throw {actualResponse: 'No bestseller found', status: 404};
  else{
    //for every book, get the authors
    const nBooks = books.length;
    for (var i=0; i< nBooks; i++){
      const bookID = books[i].bookID;
      books[i].authors = await db.select('Author.authorID', 'Author.firstName', 'Author.lastName').from('Author').join('BookAuthor', {'Author.authorID' : 'BookAuthor.authorID'}).where('BookAuthor.bookID', bookID);
    }
    return {actualResponse: books, status: 200}
  }
};

