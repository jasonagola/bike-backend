const db = require('../databaseConfig')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hangleLogin = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({'message': 'Username and Password are required'});
    }
    const user = db.query(`SELECT 1 FROM Users WHERE username = ${username}`, err => {
        if (err) {
            console.log(err)
        }
    })
    
    if (!foundUser) {
        return res.sendStatus(401)
    }
    const passwordMatch = await bycrypt.compare(password, user.password)
    if (passwordMatch) {
        const accessToken = jwt.sign(
            {'username': user.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
    const refreshToken = jwt.sign(
        { 'username': user.username }, 
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    );
    const currentUser = {...user, refreshToken}
    }

}

module.exports = { handleLogin }