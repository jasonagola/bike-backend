const express = require('express')
const app = express()
const cors = require('cors')
const squareRoute = require("./routes/square")
const databaseRoute = require("./routes/database")
const cron = require('node-cron')
const https = require('https')
const fs = require('fs')



require('dotenv').config()

PORT = 8800

app.listen(PORT, () => console.log(`Customer Loyalty Backend now running on port: ${PORT}`))

app.use(cors())

app.use('/backend/square', squareRoute)
app.use('/backend/db', databaseRoute)

// const httpsServer = https.createServer({
//     key: fs.readFileSync('/etc/letsencrypt/live/bike.jasonagola.dev/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/bike.jasonagola.dev/fullchain.pem'),
//   }, app);

// httpServer.listen(80, () => {
//     console.log('HTTP Server running on port 80');
// });

// httpsServer.listen(443, () => {
//     console.log('HTTPS Server running on port 443');
// });

app.get('/backend', (req, res) => {
    res.send('Hello you have reached the backend.  Leave a message at the beep...')
})

cron.schedule('0 14 * * SUN', function() {console.log('Every Sunday at 14:00')})
cron.schedule('* * * * *', function() {console.log('This runs every minute')})
