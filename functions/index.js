const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp();

exports.getUserByUid = functions.https.onRequest(async (request, response) => {
    const uid = request.query.uid;
    if (uid) {
        functions.logger.info(`User id: ${uid}`, {
            structuredData: true,
        });
        const userRecord = await admin.auth().getUser(uid);
        return response.json({
            result: userRecord,
        });
    }

    response.json({
        result: null,
    });
});

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    functions.logger.info(`A user have created: ${JSON.stringify(user)}`, {
        structuredData: true,
    });
});
