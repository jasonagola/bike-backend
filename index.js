const express = require('express')
const app = express()
const cors = require('cors')
const squareRoute = require("./routes/square")
const databaseRoute = require("./routes/database")
const https = require('https')
const fs = require('fs')



require('dotenv').config()

PORT = 8800

app.listen(PORT, () => console.log(`Customer Loyalty Backend now running on port: ${PORT}`))

app.use(cors({
    // origin: 'http://localhost:5173'
}))

app.use('/backend/square', squareRoute)
app.use('/backend/db', databaseRoute)

const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/bike.jasonagola.dev/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/bike.jasonagola.dev/fullchain.pem'),
  }, app);


app.get('/backend', (req, res) => {
    res.send('Hello you have reached the backend.  Leave a message at the beep...')
})