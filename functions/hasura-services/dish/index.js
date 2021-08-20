const { gql } = require("apollo-boost");
const apolloClient = require("../apollo-client");

const getDishes = () => {
    return apolloClient.query({
        mutation: gql`
            query GetDishes {
                dish(objects: { fb_uid: $fb_uid }) {
                    returning {
                        fb_uid
                        id
                    }
                }
            }
        `,
    });
};

exports.getDishes = getDishes;
