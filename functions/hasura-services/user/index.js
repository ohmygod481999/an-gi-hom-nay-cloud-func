const { gql } = require("apollo-boost");
const apolloClient = require("../apollo-client");

const insertUser = (fb_uid) => {
    return apolloClient.mutate({
        mutation: gql`
            mutation insertUser($fb_uid: String!) {
                insert_user(objects: { fb_uid: $fb_uid }) {
                    returning {
                        fb_uid
                        id
                    }
                }
            }
        `,
        variables: {
            fb_uid,
        },
    });
};

exports.insertUser = insertUser;
