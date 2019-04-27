'use strict';


/**
 * Returns a single event by ID
 *
 * eventID Long ID of the event to return
 * returns Event
 **/
exports.getEventByID = function(eventID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "book" : {
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
  },
  "name" : "name"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns all events' essential data
 *
 * returns List
 **/
exports.getEvents = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "id" : 0
}, {
  "name" : "name",
  "id" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

