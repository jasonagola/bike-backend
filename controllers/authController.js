const db = require('../config/databaseConfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogin = async (req, res) => {
    // console.log(req.body)
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({'message': 'Username and Password are required'});
    }
    db.query(`SELECT * FROM Users WHERE username = '${username}'`, async (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            if (result.length == 0) {
                res.sendStatus(401)
            }
            else {
                const foundUser = result[0]
                const passwordMatch = await bcrypt.compare(password, foundUser.password)
                if (passwordMatch) {
                    const roles = foundUser.roles
                    console.log(roles)
                    const accessToken = jwt.sign(
                        { "UserInfo": {
                            'username': foundUser.username,
                            "roles": roles
                            }
                        }, 
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '5m'}
                    );
                    const refreshToken = jwt.sign(
                        {'username': foundUser.username},
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '24h'}
                    );
                    // Adding refresh token to specific user
                    db.query(`UPDATE Users SET refresh_token='${refreshToken}' WHERE username='${foundUser.username}'`, async (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send(err)
                        } else {
                            console.log('refresh_token set')
                        };
                    });
                    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true,  maxAge: 24 * 60 * 60 * 1000 }); // sameSite: 'None', secure: true,   Add for deployed server
                    res.json({accessToken, roles})
                } else {
                    res.sendStatus(401)
                }
            }
        }
    })
    
    }
    
module.exports = { handleLogin }