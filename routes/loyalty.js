const express = require('express')
const { verifyJWT } = require('../middleware/verifyJWT')
const loyalty = express.Router()
const loyaltyController = require('../controllers/loyaltyController')



loyalty.route('/checkIn')
    .get(verifyJWT, )
    
loyalty.route('/ride')
    .get(loyaltyController.getRide)
    .post(verifyJWT, loyaltyController.addRide)

loyalty.route('/listRides')
    .get(loyaltyController.getRidesThisMonth)

