const express = require('express')
const { verifyJWT } = require('../middleware/verifyJWT')
const loyalty = express.Router()
const loyaltyController = require('../controllers/loyaltyController')



// loyalty.route('/checkIn')
//     .get(verifyJWT, )
    
loyalty.route('/ride')
    .get(loyaltyController.getRide)
    .post(loyaltyController.addRide)
    // .delete(loyaltyController.deleteRide)

loyalty.route('/listRides')
    .get(loyaltyController.getRidesThisMonth)

loyalty.route('/test')
    .get(() => console.log("This worked"))

loyalty.route('/checkInStatus')
    .get(loyaltyController.checkInStatus)

loyalty.route('/customer')
    .get(loyaltyController.checkCustomerExists)
    .put(loyaltyController.addCustomer)

module.exports = loyalty