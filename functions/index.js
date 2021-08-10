const functions = require("firebase-functions");
const admin = require("firebase-admin");
const gqlServer = require("./graphql/server");
const { insertUser } = require("./hasura-services/user");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp();

const server = gqlServer();

const api = functions.https.onRequest(server);

const addUserHasura = functions.auth.user().onCreate(async (user) => {
    const { uid } = user;
    functions.logger.info(`A user have created: ${JSON.stringify(user)}`, {
        structuredData: true,
    });
    await admin.auth().setCustomUserClaims(uid, {
        isAdmin: false,
    });
    const userRecord = await admin.auth().getUser(uid);
    functions.logger.info(
        `SetCustomUserClaims: ${JSON.stringify(userRecord)}`,
        {
            structuredData: true,
        }
    );
    const result = await insertUser(uid);
    functions.logger.info(
        `User add to hasura cloud: ${JSON.stringify(result)}`,
        {
            structuredData: true,
        }
    );
    return result;
});

module.exports = {
    api,
    addUserHasura,
};
