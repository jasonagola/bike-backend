const db = require('../databaseConfig')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    console.log(cookies)
    if (!cookies?.jwt) {
        console.log('No cookie jwt found')
        return res.sendStatus(401)
    }
    console.log('jwt cookie:' + cookies.jwt)
    
    const refreshToken = cookies.jwt;

    db.query(`SELECT * FROM Users WHERE refresh_token = '${refreshToken}'`, async (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            if (result.length == 0) {
                res.sendStatus(403) //Forbidden
            }
            else {
                const foundUser = result[0]
                //evaluateJWT
                jwt.verify(
                    refreshToken, 
                    process.env.REFRESH_TOKEN_SECRET, 
                    (err, decoded) => {
                        if (err || foundUser.username !== decoded.username) return res.sendStatus(403)
                        const roles = foundUser.roles
                        const accessToken = jwt.sign(
                            { "UserInfo": {
                                'username': decoded.username,
                                "roles": roles
                                }
                            }, 
                            process.env.ACCESS_TOKEN_SECRET,
                            {expiresIn: '1d'}
                        );
                        res.json({accessToken})
                    }
                );
            }
        }
    })
}

                
module.exports = { handleRefreshToken }