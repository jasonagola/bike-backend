const router = require("express").Router()
const db = require('../databaseConfig')

router.get('/customer/customerExists', async (req, res) => {
    const customer_id = req.query.customer_id
    db.query(`SELECT EXISTS(SELECT 1 FROM Customers WHERE customer_id = '${customer_id}')`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

router.put('/customer/add', async (req, res) => {
    console.log('Hitting backend customer add')
    const customer_id = req.query.customer_id
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const phone_number = req.query.phone_number
    const email = req.query.email
    db.query(`INSERT INTO Customers (customer_id, first_name, last_name, phone_number, email) VALUES ('${customer_id}', '${first_name}','${last_name}','${phone_number}','${email}')`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            console.log(result)
            res.send(result)
        }
    } 
    )
})

router.put('/loyalty/checkIn', (req, res) => {
    const customer_id = req.query.customer_id
    const checkInDate = req.query.checkInDate
    db.query(`INSERT INTO CheckIn (customer_id, checkIn) VALUES ('${customer_id}','${checkInDate}')`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

// })


// app.put('/db/loyalty/join', async (req, res) => {
//     const customer_id = req.query.customer_id;
//     const first_name = req.query.first_name
//     const last_name = req.query.last_name
//     const phone_number = req.query.phone_number
//     const email = req.query.email
// })

router.get('/loyalty/checkInStatus', (req, res) => {
    const customer_id = req.query.customer_id
    db.query(`SELECT EXISTS(SELECT 1 FROM CheckIn WHERE customer_id = '${customer_id}')`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
    
})


router.put('/rides/addRide', (req, res) => {
    const {date, start, end, value, processed} = req.query.rideInfo
    console.log(date)
    // const date = req.query.date
    // const start = req.query.start
    // const end = req.query.end
    // const processed = req.query.processed
    db.query(`INSERT INTO Rides (ride_date, start_time, end_time, ride_value, processed) VALUES ('${date}', '${start}', '${end}', ${value}, 0)`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
})


router.get('/rides/ridesThisMonth', (req, res) => {
    db.query(`SELECT * FROM Rides WHERE MONTH(ride_date)= MONTH(CURRENT_DATE())`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

router.get('/rides/rideToday', (req, res) => {
    db.query('SELECT * FROM Rides WHERE ride_date = CURRENT_DATE()', (err, res) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
})

module.exports = router