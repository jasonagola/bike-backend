const express = require('express')
const app = express()
const cors = require('cors')
const squareRoute = require("./routes/square")
const databaseRoute = require("./routes/database")


require('dotenv').config()

PORT = 8800

app.listen(PORT, () => console.log(`Customer Loyalty Backend now running on port: ${PORT}`))

app.use(cors({
    // origin: 'http://localhost:5173'
}))

app.use('backend/square', squareRoute)
app.use('backend/db', databaseRoute)




