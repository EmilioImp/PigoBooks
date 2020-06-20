const aws = require('aws-sdk');
const config = require('config');


const s3 = new aws.S3({
    secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
    accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
});


module.exports = s3;