const ratingService = require("../services/ratingService");
const apiResponse = require("../helpers/apiResponse");
const logger = require("../utils/logger");
const fetchCustomerApi = require("../domain/service/fetchCustomerApi");
const fetchRestaurantApi = require("../domain/service/fetchRestaurantApi");

exports.getAllRating = async (req, res) => {
    try {
        let { size, index, key, sortingPriority } = req.query;
        size = size ? size : 10;
        index = index && index > 0 ? index : 1;
        key = key ? key : "id";
        sortingPriority = sortingPriority ? sortingPriority : "ASC";
        const ratings = await ratingService.getAllRating(size, index, key, sortingPriority);
        return apiResponse.successResponseWithData(res, "All rating records found", ratings);
    } catch (error) {
        logger.error(error.message);
        return apiResponse.customErrorResponse(res, error.message, 404);
    }
}

exports.getSingleRating = async (req, res) => {
    try {
        const restaurant = await fetchRestaurantApi.getRestaurant(req.params.restaurantId, req.user.token);
        if (restaurant) {
            const rating = await ratingService.getSingleRating(req.params.rateId, req.user, restaurant);
            return apiResponse.successResponseWithData(res, "Single rating record found", rating);
        } else {
            throw new Error("No such restaurant found");
        }
    } catch (error) {
        logger.error(error.message);
        return apiResponse.customErrorResponse(res, error.message, 404);
    }
}

exports.createRating = async (req, res) => {
    try {
        let body = req.body;
        body.customerId = req.user.id;
        const restaurant = await fetchRestaurantApi.getRestaurant(req.params.restaurantId, req.user.token);
        if (restaurant) {
            body.restaurantId = req.params.restaurantId;
            const rating = await ratingService.createRating(body);
            return apiResponse.successResponseWithData(res, "Rating review add successfully", rating);
        } else {
            throw new Error("No such restaurant found");
        }
    } catch (error) {
        logger.error(error.message);
        return apiResponse.customErrorResponse(res, error.message, 406);
    }
}

exports.updateRating = async (req, res) => {
    try {
        let body = req.body;
        const updateRating = await ratingService.updateRating(body,req.params.rateId);
        return apiResponse.successResponseWithData(res, "Rating review updated successfully", updateRating);

    } catch (error) {
        logger.error(error.message);
        return apiResponse.customErrorResponse(res, error.message, 406);
    }
}

exports.updateRatingStatus = async (req, res) => {
    try {
        let body = req.body;
        const updateRatingStatus = await ratingService.updateRatingStatus(body, req.params.rateId);
        return apiResponse.successResponseWithData(res, "Rating review status updated successfully", updateRatingStatus);
    } catch (error) {
        logger.error(error.message);
        return apiResponse.customErrorResponse(res, error.message, 406);

    }
}

exports.deleteRating = async (req, res) => {
    try {
        const deleteRating = await ratingService.deleteRating(rateId);
        if(deleteRating){
            return apiResponse.successResponseWithData(res, "Rating review deleted successfully", updateRatingStatus);
        }else{
            throw new Error("Failed to delete the rating records");
        }
    } catch (error) {
        logger.error(error.message);
        return apiResponse.customErrorResponse(res, error.message, 406);
    }
}