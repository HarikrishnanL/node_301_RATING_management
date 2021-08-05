const express = require('express');
const router = express.Router();

//import controller
const ratingController = require('../controllers/ratingController');

// import session validator
const authSessionValidator = require('../utils/sessionValidatorUtils');

router.post('/rating/restaurant/:restaurantId', authSessionValidator.sessionAuthValidator, ratingController.createRating);

router.get('/rating/all',authSessionValidator.sessionAuthValidator,ratingController.getAllRating);

router.get('/rating/single/:rateId/restaurant/:restaurantId',authSessionValidator.sessionAuthValidator,ratingController.getSingleRating);

router.put('/rating/:rateId',authSessionValidator.sessionAuthValidator,ratingController.updateRating);

router.patch('/rating/:rateId',authSessionValidator.sessionAuthValidator,ratingController.updateRatingStatus);

router.delete('/rating/:rateId',authSessionValidator.sessionAuthValidator,ratingController.deleteRating);

module.exports = router;