const ratingService = require("../services/ratingService");
const apiResponse = require("../helpers/apiResponse");
const logger = require("../utils/logger");
const fetchCustomerApi = require("../domain/service/fetchCustomerApi");
const fetchRestaurantApi = require("../domain/service/fetchRestaurantApi");
const amqp_connection_string = process.env.amqp_connection_string;
const amqp_task_queue_str = "rating_post";
const { validationResult } = require('express-validator');
const {promisify} = require("util");
const redis_client = require("../config/redisConfiguration");

const redisGet = promisify(redis_client.get).bind(redis_client);

exports.getAllRating = async (req, res,next) => {
    try {
        let { size, index, key, sortingPriority } = req.query;
        size = size ? size : 10;
        index = index && index > 0 ? index : 1;
        key = key ? key : "id";
        sortingPriority = sortingPriority ? sortingPriority : "ASC";
        const ratings = await ratingService.getAllRating(size, index, key, sortingPriority);
        return apiResponse.successResponseWithData(res, "All rating records found", ratings);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getSingleRating = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }
        const restaurant = await fetchRestaurantApi.getRestaurant(req.params.restaurantId, req.user.token);
        if (restaurant.status) {

            const rating = await ratingService.getSingleRating(req.params.rateId, req.user, restaurant);
            return apiResponse.successResponseWithData(res, "Single rating record found", rating);
        } else {
            const error = new Error("No such restaurant found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.createRating = async (req, res,next) => {
    try {
        let body = req.body;
        body.customerId = req.user.id;
        const restaurant = await fetchRestaurantApi.getRestaurant(req.params.restaurantId, req.user.token);
        if (restaurant) {
            body.restaurantId = req.params.restaurantId;
            const rating = await ratingService.createRating(body);
            let open = require('amqplib').connect(amqp_connection_string);
            open.then(function (conn) {
                return conn.createChannel();
            }).then(function (ch) {
                return ch.assertQueue(amqp_task_queue_str).then(function (ok) {
                    return ch.sendToQueue(amqp_task_queue_str, Buffer.from(JSON.stringify({ userRating: rating })));
                });
            }).catch(err => console.log("error amqp=======>", err));
            // redis_client.setex();
            // redis_client.get()
            return apiResponse.successResponseWithData(res, "Rating review add successfully", rating);
        } else {
            const error = new Error("No such restaurant found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {

        logger.error(error.message);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateRating = async (req, res,next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }
        let body = req.body;
        const updateRating = await ratingService.updateRating(body, req.params.rateId);
        return apiResponse.successResponseWithData(res, "Rating review updated successfully", updateRating);

    } catch (error) {
        logger.error(error.message);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateRatingStatus = async (req, res,next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }
        let body = req.body;
        const updateRatingStatus = await ratingService.updateRatingStatus(body, req.params.rateId);
        return apiResponse.successResponseWithData(res, "Rating review status updated successfully", updateRatingStatus);
    } catch (error) {
        logger.error(error.message);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);


    }
}

exports.deleteRating = async (req, res,next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() });
        }
        await ratingService.deleteRating(req.params.rateId);

        return apiResponse.successResponse(res, "Rating review deleted successfully");

    } catch (error) {
        logger.error(error.message);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);

    }
}