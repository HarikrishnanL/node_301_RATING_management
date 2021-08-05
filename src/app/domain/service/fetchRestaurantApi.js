const superagent = require("superagent");
const logger = require("../../utils/logger");

exports.getRestaurant = async (id, token) => {
    try {
        let restaurant = await superagent
            .get(process.env.restaurantTestUrl + "restaurant/single/" + id)
            .set('authToken',token);
            return restaurant.body.data;
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}