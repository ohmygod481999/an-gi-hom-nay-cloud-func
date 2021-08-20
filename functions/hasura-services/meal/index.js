const { gql } = require("apollo-boost");
const apolloClient = require("../apollo-client");

const getMeal = (mealId) => {
    return apolloClient.query({
        query: gql`
            query MyQuery($id: Int!) {
                meal_by_pk(id: $id) {
                    id
                    name
                    mealfoods {
                        food {
                            id
                            name
                            dishes {
                                id
                                name
                                price
                                img
                                description
                                restaurant {
                                    id
                                    name
                                    address
                                    latlng
                                    open
                                    close
                                }
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            id: mealId,
        },
    });
};

exports.getMeal = getMeal;
