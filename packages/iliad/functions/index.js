const functions = require('firebase-functions');
const helloWorld =  require('./helloworld');
const imageWorker =  require('./imageworker');

exports.helloWorld = functions.https.onRequest(helloWorld);
exports.imageWorker = functions.storage.object().onChange(imageWorker);
