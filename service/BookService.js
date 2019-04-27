'use strict';


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
exports.findBooksByGenre = function(genre) {
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

