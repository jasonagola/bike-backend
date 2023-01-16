const express = require('express')
const router = express.Router();
const registerController = require('../controllers/registerController');

// router.get('/', (req, res) => {
//     res.send('HELLO IDIOT')
// })

router.post('/', registerController.registerNewUser);

module.exports = router