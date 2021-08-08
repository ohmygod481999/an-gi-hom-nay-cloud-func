const admin = require("firebase-admin");
const functions = require("firebase-functions");

const resolversFunctions = {
    Query: {
        userRecord: async (parent, args, context, info) => {
            const { uid } = args;

            const userRecord = await admin.auth().getUser(uid);

            functions.logger.info(userRecord, {
                structuredData: true,
            });
            return userRecord;
        },
    },
};

module.exports = resolversFunctions;
