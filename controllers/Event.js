'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getEventByID = function getEventByID (req, res, next) {
  var eventID = req.swagger.params['eventID'].value;
  Event.getEventByID(eventID)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};

module.exports.getEvents = function getEvents (req, res, next) {
  Event.getEvents()
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};
