const { UserInputError } = require("apollo-server-express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { getMeal } = require("../hasura-services/meal");

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
        randomDish: async (parent, args, context, info) => {
            const { mealId } = args;

            const result = await getMeal(mealId);
            const meal = (result.data && result.data.meal_by_pk) || {};
            const dishes = [];
            if (result.data) {
                meal.mealfoods.forEach((mealfood) => {
                    const food = mealfood.food;
                    food.dishes.forEach((dish) => {
                        dishes.push(dish);
                    });
                });
            }

            if (dishes.length === 0) return null;

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            const randomIndex = getRandomInt(0, dishes.length - 1);

            functions.logger.info(dishes[randomIndex], {
                structuredData: true,
            });
            return dishes[randomIndex];
        },
    },
    Mutation: {
        grantAdminRole: async (_, { uid }, { dataSource }) => {
            const auth = admin.auth();
            const userRecord = await auth.getUser(uid);
            const customClaims = userRecord["customClaims"];
            if (customClaims && customClaims.isAdmin) {
                throw new UserInputError(
                    "This account have had admin role already"
                );
            } else {
                await auth.setCustomUserClaims(uid, {
                    isAdmin: true,
                });
                return {
                    data: "OK",
                };
            }
        },
    },
};

module.exports = resolversFunctions;
