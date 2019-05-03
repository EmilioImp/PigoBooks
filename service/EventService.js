'use strict'

const knex = require('../knex.js');
const db = knex.database;

/**
 * Returns a single event by ID
 *
 * eventID: ID of the wanted event
 * returns Event
 */
exports.getEventByID = function(eventID) {
  return new Promise(async function(resolve, reject){
    const event = await db.select().from('Event').where('eventID', eventID);
    if (event.length <= 0){
      reject({actualResponse: 'Event not found', status: 404});
    }
    else {
      const books = await db.select('Book.bookID', 'name').from('Book').join('Event', {'Book.bookID' : 'Event.bookID'}).where('eventID', eventID);
      resolve({actualResponse: event.concat(books), status: 200});
    }
  })
}

/**
 * Returns all events' essential data
 * returns List
 */
exports.getEvents = function() {
  return new Promise(async function (resolve, reject) {
    const events = await db.select().from('Event');
    if (events.length <= 0){
      reject({actualResponse: 'No event found', status: 404});
    }
    else{
      resolve({actualResponse: events, status: 200});
    }
  })
}

