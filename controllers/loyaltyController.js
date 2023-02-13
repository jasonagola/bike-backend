const db = require('../config/databaseConfig')

///Should Rewrite to return customer anyway
const checkCustomerExists = async (req, res) => {
    console.log(`Checking Customer Exists`)
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
}

const addCustomer = async (req, res) => {
    const {customer_id, first_name, last_name, phone_number, email} = req.query
    db.query(`INSERT INTO Customers (customer_id, first_name, last_name, phone_number, email) VALUES ('${customer_id}', '${first_name}','${last_name}','${phone_number}','${email}')`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
}

const checkIn = async (req, res) => {
    const {customer_id, rideInfo, checkInDate} = req.query
    const ride_value = rideInfo.ride_value
    const ride_id = rideInfo.ride_id
    db.query(`INSERT INTO CheckIn (customer_id, check_in, ride_id, value) VALUES ('${customer_id}','${checkInDate}', '${ride_id}', '${ride_value}')`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)
        }
    })
}

const checkInStatus = async (req, res) => {
    const {customer_id, ride_id} = req.query

    db.query(`SELECT EXISTS(SELECT 1 FROM CheckIn WHERE customer_id = '${customer_id}' AND ride_id = '${ride_id}')`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            res.send(result)
        }
    })
}

const getRide = async (req, res) => {
    db.query(`SELECT * FROM Rides WHERE ride_date = '${req.query.date}'`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            console.log(result)
            res.send(result)
        }
    })
}

const getRidesThisMonth = async (req, res) => {
    db.query(`SELECT * FROM Rides WHERE MONTH(ride_date)= MONTH(CURRENT_DATE())`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            res.send(result)
        }
    })
}


const addRide = async (req, res) => {
    console.log('Hitting Add Ride in Loyalty Controller')
    const {date, start, end, value, processed} = req.query.rideInfo
    db.query(`INSERT INTO Rides (ride_date, start_time, end_time, ride_value, processed) VALUES ('${date}', '${start}', '${end}', ${value}, 0)`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            res.send(result)
        }
    })
}

const updateRide = async (req, res) => {
    const {id, date, start, end, value} = req.query.rideInfo
    db.query(`UPDATE Rides SET ride_date='${date}', start_time='${start}', end_time='${end}', ride_value=${value} WHERE ride_id=${id}`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            res.send(result)
        }
    })
}

const deleteRide = async (req, res) => {
   const ride_id = req.query.rideId
    console.log('delete ride endpoint but no delete function implemented')
    db.query(`DELETE FROM Rides WHERE ride_id = '${ride_id}'`, (err, result) => {
        if (err) {
            console.log(err)
            return res.send(err)
        } else {
            res.send(result)
        }
    })
}



module.exports = {
    checkCustomerExists,
    addCustomer,
    checkInStatus,
    checkIn,
    getRide, 
    getRidesThisMonth,
    addRide,
    deleteRide,
    updateRide
}