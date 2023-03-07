const db = require('../config/databaseConfig')

const getBoardData = async (req, res) => {
    db.query('SELECT * FROM BingoSquares', async (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

module.exports = {
    getBoardData
}