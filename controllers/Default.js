'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.uploadImage = function uploadImage (req, res, next) {
  var image = req.swagger.params['image'].value;
  Default.uploadImage(image)
    .then(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.actualResponse, response.status);
    });
};
