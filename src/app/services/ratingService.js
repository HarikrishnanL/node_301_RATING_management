const RatingModel = require('../models/RatingModel');
const ratingStatus = require('../domain/enumerations/ratingStatus');
let q = 'rating_management';


exports.getAllRating = async (pageSize, pageIndex, sortingKey, sortingPriorty) => {
    try {
        let order = [[sortingKey, sortingPriorty]];
        let paginate = {
            offset: (pageIndex - 1) * pageSize,
            limit: pageSize,
        }

        const ratings = await RatingModel.findAndCountAll({
            order,
            distinct: true,
            ...paginate
        })

        const paginateData = {
            totalCount: ratings.count,
            totalPages: Math.ceil(ratings.count / pageSize),
            pageSize,
            pageIndex
        }

        if (ratings.rows.length > 0) {
            return { response: ratings.rows, "paginateData": paginateData }
        } else {
            return new Error("No Ratings found");
        }

    } catch (error) {
        throw error;
    }
}

exports.getSingleRating = async (rateId, customer, restaurant) => {
    try {
        const rating = await RatingModel.findOne(
            {
                where: {
                    "id": rateId,
                    "status": ratingStatus.Active
                }

            }
        );
        if (rating) {
            // rating.customer = customer;
            // rating.restaurant = restaurant;
            return {rating,user:customer,restaurant:restaurant};
        } else {
            throw new Error("Such rating not found");
        }

    } catch (error) {
        throw error;
    }
}

exports.createRating = async (body) => {
    try {
        const rating = await RatingModel.create(body);
        if (rating) {
            return rating;
        } else {
            throw new Error("Failed to create rating for a restaurant");
        }
    } catch (error) {
        throw error;
    }
}

exports.updateRating = async (body, rateId) => {
    try {
        const rating = await RatingModel.findOne({ where: { id: rateId, status: ratingStatus.Active } });
        if (rating) {
            const updateRating = await RatingModel.update(body, { where: { id: rateId } });
            if (updateRating[0] === 1) {
                return true;
            } else {
                throw new Error("Failed to update rating");
            }
        } else {
            throw new Error("Such rating not found");
        }
    } catch (error) {
        throw error;
    }
}

exports.updateRatingStatus = async (body, rateId) => {
    try {
        const rating = await RatingModel.findOne({ where: { id: rateId } });
        if (rating) {
            const updateRatingStatus = await RatingModel.update({ status: body.status }, { where: { id: rateId } });
            if (updateRatingStatus[0] === 1) {
                return true;
            } else {
                throw new Error("Failed to update rating status");
            }
        } else {
            throw new Error("No such rating records available");
        }

    } catch (error) {
        throw error;
    }
}

exports.deleteRating = async (rateId) => {
    try {
        const rating = await RatingModel.findOne({ where: { id: rateId, status: ratingStatus.Active } });
        if (rating) {
            await RatingModel.destroy({ where: { id: rateId } });
            return true;
        } else {
            throw new Error("Such rating not found");
        }
    } catch (error) {
        throw error;
    }
};
