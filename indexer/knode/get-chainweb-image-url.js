// get-chainweb-image-url.js
const AWS = require("aws-sdk");

console.log(AWS);

const s3 = new AWS.S3({
    accessKeyId: 'AKIAYX5GBYQTWB4M5UNJ', // Add your Access Key ID from IAM
    secretAccessKey: 'KxYacjDwd/EklHBWgfCsuom9qK0+Ol4zE1oL53ah', // Add your Secret Access Key from IAM
    region: "us-east-2",
});
const params = {
    Bucket: "kadena-node-db",
    Expires: 14000,
    Key: "db-chainweb-node-ubuntu.18.04-latest.tar.gz",
    RequestPayer: "requester",
};
// When ran, the script will output exclusively the signed url
s3.getSignedUrl("getObject", params, (_err, res) => {
    console.log( 'how how how');
    console.log(res)
});
