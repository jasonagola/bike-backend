const db = require('../databaseConfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    console.log('You have hit the auth controller')
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
                res.send(404)
            }
            else {
                const passwordMatch = await bcrypt.compare(password, result[0].password)
                if (passwordMatch) {
                    res.json({'message': 'You have signed in'})
                }
            }
        }
    })
    
    }
    
    // if (passwordMatch) {
    //     res.json({'message': `User ${username} is logged in!`})
    //     ///create JWT
    //     // const accessToken = jwt.sign(
    //     //     process.env.ACCESS_TOKEN_SECRET
    //     // )
    // } else {
    //     res.sendStatus(401)
    // }
    



//     const passwordMatch = await bcrypt.compare(password, user.password)
//     if (passwordMatch) {
//         const accessToken = jwt.sign(
//             {'username': user.username},
//             process.env.ACCESS_TOKEN_SECRET,
//             {expiresIn: '30s'}
//         );
//     const refreshToken = jwt.sign(
//         { 'username': user.username }, 
//         process.env.REFRESH_TOKEN_SECRET,
//         {expiresIn: '1d'}
//     );
//     const currentUser = {...user, refreshToken}
//     }

// }

module.exports = { handleLogin }