const express = require('express')
const bingo = express.Router()
const bingoController = require('../controllers/bingoController')


bingo.get('/boardData', bingoController.getBoardData)


module.exports = bingo