const JwtAuthUtils = require('../utils/jwtAuthUtils');
const FetchCustomer = require('../domain/service/fetchCustomerApi');
const apiResponse = require('../helpers/apiResponse');
const customerCustomMessages = require('../domain/customMessages/customer')


exports.sessionAuthValidator = (req, res, next) => {

    let authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('AuthToken required');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        // decodedToken = JwtAuthUtils.decode(token, process.env.kJWTSecret);
        decodedToken = JwtAuthUtils.decode(token, "customerNodejs");
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.user = {
        id: decodedToken.id,
        email: decodedToken.email,
        number: decodedToken.phoneNumber,
        token: token
    }
    next();
}