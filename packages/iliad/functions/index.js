const functions = require('firebase-functions');
const imageWorker = require('./imageworker');
const monolith = require('./monolith');

exports.imageWorker = functions.storage.object().onChange(imageWorker);
exports.monolith = functions.https.onRequest(monolith.app);
