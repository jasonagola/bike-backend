const db = require('../databaseConfig')

const handleLogout = async (req, res) => {
    //client side needs to delete accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204) //Nothing to return
    }
    
    const refreshToken = cookies.jwt;

    db.query(`SELECT * FROM Users WHERE refresh_token = '${refreshToken}'`, async (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log('Successful Database Query')
            if (result.length == 0) {
                res.clearCookie('jwt', {httpOnly: true})
                return res.sendStatus(204) 
            }
            const foundUser = result[0]  
            db.query(`UPDATE Users SET refresh_token='' WHERE username='${foundUser.username}'`, async (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                    console.log('successfully removed refresh token ')
                    res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'})
                    res.sendStatus(204)
                }
            })
        }
    })
}

    

    //delete refresh Token from database

                
        

module.exports = { handleLogout }