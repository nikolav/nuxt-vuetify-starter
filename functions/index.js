/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// https://helloworld-a6gynghkbq-uc.a.run.app
exports.helloWorld = onRequest((request, response) => {
  response.json({
    status: "ok",
    message: "hello world",
    "admin:email": "admin@nikolav.rs",
  });
});
