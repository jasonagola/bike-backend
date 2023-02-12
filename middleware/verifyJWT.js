const jwt = require('jsonwebtoken')
require('dotenv').config 

// const verifyJWT = (req, res, next) => {
//     console.log('verifying')
//     console.log(req.cookies)
//     const token = req.cookies?.jwt
//     console.log(token)
//     if (!token) return res.sendStatus(401);
//     jwt.verify(
//         token, 
//         process.env.REFRESH_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) {
//                 console.log(err)
//                 return res.sendStatus(403);
//             }
//             req.user = decoded.UserInfo.username
//             req.roles = decoded.UserInfo.roles
//             next();
//         }
//     )
// }
const verifyJWT = (req, res, next) => {
    console.log('verifying')
    const authHeader = req.headers.authorization || req.headers.Authorization
    console.log(authHeader)
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next();
        }
    )
}

module.exports = verifyJWT