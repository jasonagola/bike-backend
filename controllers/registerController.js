const db = require("../databaseConfig")
const bcrypt = require('bcrypt')

const registerNewUser = async (req, res) => {
    // console.log('You have made it to the register controller')
    const {username, password} = req.body
    console.log(username, password)
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and Password are required for login'})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(`INSERT INTO Users (username, password) VALUES ('${username}', '${hashedPassword}')`, (err, result) => {
        if (err) {
            console.log(err)
            if(err.errno == 1062) {
                res.status(409).json({'message': 'Conflict error. If you already have an account please login.'})
            } else {
                res.status(500).json({'message': err.message})
            }
        } else {
            res.status(201).json({'success': `New user ${username} has been created.`});
        }
    })
}

module.exports = { registerNewUser }