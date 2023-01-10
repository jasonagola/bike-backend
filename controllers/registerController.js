const db = require("../databaseConfig")


const register = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Authentication Failed'})
    }
    try {
        const duplicate = await db.query(`SELECT 1 FROM Users WHERE username = ${username}`)
    }
}