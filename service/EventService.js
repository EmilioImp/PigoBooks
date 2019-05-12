'use strict'

const knex = require('../knex.js');
const db = knex.database;

/**
 * Returns a single event by ID
 *
 * eventID: ID of the wanted event
 * returns Event
 */
exports.getEventByID = async function(eventID) {
    const event = await db.select('eventID','name','location','time','date','image_path').from('Event').where('eventID', eventID);
    if (event.length <= 0){
      throw {actualResponse: 'Event not found', status: 404};
    }
    else {
        const book = await db.select('Book.bookID','Book.name').from('Book').join('Event', {'Book.bookID' : 'Event.bookID'}).where('eventID', eventID);
        event[0].book = book[0];
        return {actualResponse: event, status: 200};
    }
}

/**
 * Returns all events' essential data
 * returns List
 */
exports.getEvents = async function() {
    const events = await db.select().from('Event');
    if (events.length <= 0){
      throw {actualResponse: 'No event found', status: 404};
    }
    else{
      return {actualResponse: events, status: 200};
    }
}

