const express = require('express');
const router = express.Router();

//import controller
const ratingController = require('../controllers/ratingController');

// import session validator
const authSessionValidator = require('../utils/sessionValidatorUtils');

// import validation 
const validation = require('../validation/validation');


router.post('/rating/restaurant/:restaurantId', authSessionValidator.sessionAuthValidator, ratingController.createRating);

router.get('/rating/all', authSessionValidator.sessionAuthValidator, ratingController.getAllRating);

router.get('/rating/single/:rateId/restaurant/:restaurantId', authSessionValidator.sessionAuthValidator, validation.validateGetSingleRating, ratingController.getSingleRating);

router.put('/rating/:rateId', authSessionValidator.sessionAuthValidator, validation.validateUpdateRating, ratingController.updateRating);

router.patch('/rating/:rateId', authSessionValidator.sessionAuthValidator, validation.validateUpdateRatingStatus, ratingController.updateRatingStatus);

router.delete('/rating/:rateId', authSessionValidator.sessionAuthValidator, validation.validateDeleteRating, ratingController.deleteRating);

module.exports = router;