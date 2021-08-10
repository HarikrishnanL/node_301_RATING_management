const { body ,param } = require('express-validator');

exports.validatePostRating = [
    param('restaurantId',"error in validation because of data type").isNumeric().notEmpty(),
    body('reviewComments',"error in validation because review comments cannot be empty").notEmpty(),
    body('rating',"error in validation because of data type or rating cannot be empty").isNumeric().notEmpty(),
]

exports.validateGetSingleRating = [
    param('rateId',"error in validation because of data type in rateId").isNumeric().notEmpty(),
    param('restaurantId',"error in validation because of data type in restaurantID").isNumeric().notEmpty(),
]

exports.validateUpdateRating = [
    param('rateId',"error in validation because of data type").isNumeric().notEmpty(),
    body('reviewComments',"error in validation because review comments cannot be empty").notEmpty(),
    body('rating',"error in validation because of data type or rating cannot be empty").isNumeric().notEmpty(),
]

exports.validateUpdateRatingStatus = [
    param('rateId',"error in validation because of data type").isNumeric().notEmpty(),
    body('status',"error in validation because of field is empty").notEmpty(),
]

exports.validateDeleteRating = [
    param('rateId',"error in validation because of data type").isNumeric().notEmpty(),

]