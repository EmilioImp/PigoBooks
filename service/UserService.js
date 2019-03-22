'use strict';


/**
 * Adds books to the user's cart
 *
 * bookID Long ID of the book to add to the cart
 * returns Cart
 **/
exports.addBooksToCart = function(bookID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "booklist" : [ {
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
  } ],
  "total_price" : 6,
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Creates user
 * Creates a new user profile
 *
 * body User User that needs to register (optional)
 * returns UserWithID
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "phone" : "phone",
  "id" : 0,
  "email" : "email",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes user
 * A logged in user deletes his own account
 *
 * returns UserWithID
 **/
exports.deleteUser = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "phone" : "phone",
  "id" : 0,
  "email" : "email",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns user data
 *
 * returns User
 **/
exports.getUser = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "phone" : "phone",
  "email" : "email",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets the shopping cart of the user
 *
 * returns Cart
 **/
exports.getUserCart = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "booklist" : [ {
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
  } ],
  "total_price" : 6,
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs user into the system
 *
 * username String The user name for login
 * password String The password for login
 * returns Token
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Buy books from user's cart
 *
 * returns Cart
 **/
exports.userCartBuyBooksPOST = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "booklist" : [ {
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
  } ],
  "total_price" : 6,
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes book from the user's cart
 *
 * bookID Long ID of the book to delete from the cart
 * returns Cart
 **/
exports.userCartDeleteBookBookIDDELETE = function(bookID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "booklist" : [ {
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
  } ],
  "total_price" : 6,
  "id" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

