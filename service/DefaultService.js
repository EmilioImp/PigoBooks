'use strict';

const s3 = require('../bucket.js');

/**
 * upload an image
 *
 * image File The image to be uploaded (optional)
 * no response value expected for this operation
 **/
exports.uploadImage = async (image) => {
  console.log('Posting image...');

  const imageID = Date.now().toString();

  const params = {
    Bucket: 'pigo-books',
    Key: imageID,
    ACL: 'public-read',
    Body: image.buffer
  };

  /*s3.putObject(params, function (err, data) {
    if (err) {
      console.log("Error: ", err);
      result = {actualResponse: 'Image upload error', status: 422}
    } else {
      console.log(data);
      result = {actualResponse: {'imageID': imageID}, status: 201};
    }
  });*/

  /*try {
    const awsRequest = s3.putObject(params);
    const data = await awsRequest.send();
    console.log(data);
    return {actualResponse: {'imageID': imageID}, status: 201};
  }
  catch (err) {
    console.log("Error: ", err);
    return {actualResponse: 'Image upload error', status: 422}
  }*/

  try {
    const data = await s3.putObject(params).promise();
    console.log(data);
    return {actualResponse: {'imageID': imageID}, status: 201};
  }
  catch (err) {
    console.log("Error: ", err);
    return {actualResponse: 'Image upload error', status: 422}
  }


  /*singleUpload(function(err) {
    if (err) {
      return {actualResponse: "Image upload error", status: 422};
    }
    //every image is stored in form https://the-spoon.s3.eu-central-1.amazonaws.com/{id}
    const imageID=req.file.location.split("amazonaws.com/")[1];
    return {actualResponse: {'imageID': imageID}, status: 201};
  });*/

};