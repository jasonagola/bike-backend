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
    db.query(`INSERT INTO CheckIn (customer_id, checkIn) VALUES ('${customer_id}',${checkInDate})`, (err, result) => {
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


module.exports = router