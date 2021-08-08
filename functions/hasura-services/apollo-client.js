const ApolloClient = require("apollo-boost").ApolloClient;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;
const fetch = require("cross-fetch/polyfill").fetch;
const createHttpLink = require("apollo-link-http").createHttpLink;

const client = new ApolloClient({
    // cache: new InMemoryCache(),
    link: createHttpLink({
        uri: "https://an-gi-hom-nay.hasura.app/v1/graphql",
        headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret":
                "yjsR6rUOSNTH5DiNDwWYpHE0ZsDAcRGKud0FXYVSc84BTFyHjhoM7X7V0YyLoql3",
        },
        fetch: fetch,
    }),
    cache: new InMemoryCache(),
});

module.exports = client;
