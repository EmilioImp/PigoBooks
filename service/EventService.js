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
    //get the data about the event
    const event = await db.select('eventID','name','location','time','date','image_path','fblink','instagramlink','twitterlink', 'description').from('Event').where('eventID', eventID);
    if (event.length <= 0){
      throw {actualResponse: 'Event not found', status: 404};
    }
    else {
        //put the data in a better format
        event[0].date = event[0].date.toISOString().slice(0,10);
        //get the book presented in the event
        const book = await db.select('Book.bookID','Book.name').from('Book').join('Event', {'Book.bookID' : 'Event.bookID'}).where('eventID', eventID);
        event[0].book = book[0];
        return {actualResponse: event, status: 200};
    }
};

/**
 * Returns all events' essential data
 * returns List
 */
exports.getEvents = async function() {
    //get the data about all the events
    const events = await db.select('eventID','name','time','date','image_path').from('Event');
    if (events.length <= 0){
        throw {actualResponse: 'No event found', status: 404};
    }
    else{
        //put the data in a better format, for every event
        const nEvents = events.length;
        for(let i=0; i<nEvents; i++){
            events[i].date = events[i].date.toISOString().slice(0,10);
        }
        return {actualResponse: events, status: 200};
    }
};

