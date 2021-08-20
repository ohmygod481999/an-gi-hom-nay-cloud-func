const { gql } = require("apollo-server-express");

const schema = gql`
    type UserMetadata {
        creationTime: String
        lastSignInTime: String
        lastRefreshTime: String
    }

    type CustomClaims {
        isAdmin: Boolean
    }

    type MutationResponse {
        data: String
    }

    type UserRecord {
        uid: String
        email: String
        displayName: String
        phoneNumber: String
        emailVerified: Boolean
        photoURL: String
        disabled: Boolean
        metadata: UserMetadata
        customClaims: CustomClaims
    }

    type Restaurant {
        id: Int
        name: String
        address: String
        latlng: String
        img: String
        open: String
        close: String
    }

    type Dish {
        id: Int
        name: String
        price: Int
        img: String
        description: String
        restaurant: Restaurant
    }

    type Query {
        "A simple type for getting started!"
        userRecord(uid: String!): UserRecord
        randomDish(mealId: Int!): Dish
    }

    type Mutation {
        grantAdminRole(uid: String!): MutationResponse
    }
`;

module.exports = schema;
