const express = require('express')
const app = express()
const cors = require('cors')
const squareRoute = require("./routes/square")
const databaseRoute = require("./routes/database")
const registerRoute = require("./routes/register")
const authRoute = require('./routes/auth')
const loyaltyRoute = require('./routes/loyalty')
const refreshRoute = require('./routes/refresh')
const logoutRoute = require('./routes/logout')
const bingoRoute = require('./routes/bingo')
const cron = require('node-cron')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const https = require('https')
const fs = require('fs')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const { dailyLoyaltyCleanUp } = require('./schedule')




require('dotenv').config()

PORT = 8800

app.listen(PORT, () => console.log(`Customer Loyalty Backend now running on port: ${PORT}`))

app.use(credentials)
app.use(cors(corsOptions))

//Middleware
app.use(express.json())
app.use(cookieParser())




app.use('/auth', authRoute)
app.use('/refresh', refreshRoute )
app.use('/logout', logoutRoute)

//Verified Routes
app.use(verifyJWT);
app.use('/bingo', bingoRoute)
app.use('/register', registerRoute)
app.use('/square', squareRoute);
app.use('/backend/db', databaseRoute);
app.use('/loyalty', loyaltyRoute);

////For use in deployed VPS for https creation

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
// cron.schedule('* * * * *', function() {console.log('This runs every minute')})



//Schedule for 5AM UTC every day. Adds New CheckIns to Customer 
cron.schedule('0 5 * * *', dailyLoyaltyCleanUp)

//Need To add Monthly Cleanup and Customer Group assignments
//