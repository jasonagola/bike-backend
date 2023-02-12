const router = require("express").Router()
const db = require('../config/databaseConfig')
const { verifyJWT } = require("../middleware/verifyJWT")



// router.get('/customer/customerExists', async (req, res) => {
//     const customer_id = req.query.customer_id
//     db.query(`SELECT EXISTS(SELECT 1 FROM Customers WHERE customer_id = '${customer_id}')`, (err, result) => {
//         if (err) {
//             console.log(err)
//             return res.send(err)
//         } else {
//             console.log(result)
//             res.send(result)
//         }
//     })
// })

// router.put('/customer/add', async (req, res) => {
//     console.log('Hitting backend customer add')
//     const customer_id = req.query.customer_id
//     const first_name = req.query.first_name
//     const last_name = req.query.last_name
//     const phone_number = req.query.phone_number
//     const email = req.query.email
   
// })

// router.put('/loyalty/checkIn', (req, res) => {
//     const customer_id = req.query.customer_id
//     const checkInDate = req.query.checkInDate
//     db.query(`INSERT INTO CheckIn (customer_id, checkIn) VALUES ('${customer_id}','${checkInDate}')`, (err, result) => {
//         if (err) {
//             console.log(err)
//             res.send(err)
//         } else {
//             res.send(result)
//         }
//     })
// })

// router.get('/loyalty/checkInStatus', (req, res) => {
//     const customer_id = req.query.customer_id
//     db.query(`SELECT EXISTS(SELECT 1 FROM CheckIn WHERE customer_id = '${customer_id}')`, (err, result) => {
//         if (err) {
//             console.log(err)
//             return res.send(err)
//         } else {
//             res.send(result)
//         }
//     })
    
// })


// router.put('/rides/addRide', (req, res) => {
//     const {date, start, end, value, processed} = req.query.rideInfo
//     db.query(`INSERT INTO Rides (ride_date, start_time, end_time, ride_value, processed) VALUES ('${date}', '${start}', '${end}', ${value}, 0)`, (err, result) => {
//         if (err) {
//             console.log(err)
//             return res.send(err)
//         } else {
//             res.send(result)
//         }
//     })
// })


// router.get('/rides/ridesThisMonth', (req, res) => {
//     db.query(`SELECT * FROM Rides WHERE MONTH(ride_date)= MONTH(CURRENT_DATE())`, (err, result) => {
//         if (err) {
//             console.log(err)
//             return res.send(err)
//         } else {
//             res.send(result)
//         }
//     })
// })

// router.get('/rides/getRide', (req, res) => {
//     console.log(req.query.date)
//     console.log("Hello ffrom thhe BA")
//     db.query(`SELECT * FROM Rides WHERE ride_date = '${req.query.date}'`, (err, result) => {
//         if (err) {
//             console.log(err)
//             return res.send(err)
//         } else {
//             console.log(result)
//             res.send(result)
//         }
//     })
// })

// router.get('/rides/updateRide', (req, res) => {
//     const {id, date, start, end, value} = req.query.rideInfo
//     db.query(`UPDATE Rides SET ride_date='${date}', start_time='${start}', end_time='${end}', ride_value=${value} WHERE ride_id=${id}`, (err, result) => {
//         if (err) {
//             console.log(err)
//             return res.send(err)
//         } else {
//             res.send(result)
//         }
//     })
// })

module.exports = router