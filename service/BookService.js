'use strict';


/**
 * Add a new book to the store
 *
 * body Book Book that needs to be added to the store
 * returns BookWithID
 **/
exports.addBook = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes a book
 *
 * bookID Long The ID of the book to delete
 * returns BookWithID
 **/
exports.deleteBook = function(bookID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
}, {
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
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
exports.findBooksByGenre = function(genre) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
}, {
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
}, {
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finds Books by status
 *
 * status List Status values that need to be considered for filter
 * returns List
 **/
exports.findBooksByStatus = function(status) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
}, {
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
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
 * returns BookWithID
 **/
exports.getBookById = function(bookID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update data regarding an existing book
 *
 * bookID Long The ID of the book to modify
 * body Book Data to be updated about the book
 * returns BookWithID
 **/
exports.updateBook = function(bookID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cost" : 1,
  "author" : "author",
  "coverImageUrl" : "coverImageUrl",
  "genre" : {
    "name" : "historical novel"
  },
  "name" : "Il sentiero",
  "publisher" : "publisher",
  "edition" : 6,
  "id" : 0,
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

