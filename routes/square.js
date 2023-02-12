const squareController = require('../controllers/squareController')

const router = require("express").Router()
require('dotenv').config()


//Customer search in square customer by fuzzy phone number
router.get('/test', (req, res) => {
  res.send('You are at the square route!')
})

router.get('/searchCustomer', squareController.searchCustomer)

//Create a new customer in square
router.put('/createCustomer', squareController.createCustomer)


module.exports = router