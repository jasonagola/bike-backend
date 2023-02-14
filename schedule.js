const db = require("./config/databaseConfig")
const {format, sub} = require('date-fns')
const { checkIn } = require("./controllers/loyaltyController")

function getRideDates() {
    var sundayDates = []
    var wednesdayDates = []
    const today = new Date()
    const daysInAYear = 365
    const year = today.getFullYear()
    const leap = isLeapYear(today)
    if (leap) {
        const daysInAYear = 366
    }
    for (let i=0; i<=daysInAYear; i++) {
        const dateToCheck = dayOfWeek(year, i)
        if (dateToCheck == 0) {
            sundayDates.push(new Date(year, 0, i))
        }
        if (dateToCheck == 3) {
            wednesdayDates.push(new Date(year, 0, i))
        }
    }
    addRidestoDatabase(sundayDates, wednesdayDates)

}

function addRidestoDatabase(sundayDates, wednesdayDates) {
    sundayDates.map(date => {
        const rideInfo = {
            date: format(new Date(date), 'yyyy-MM-dd'),
            start: '10:00', 
            end: '11:00',
            value: 5,
            processed: 0 
        }
        addRide(rideInfo)
    })
    wednesdayDates.map(date => {
        const rideInfo = {
            date: format(new Date(date), 'yyyy-MM-dd'),
            start: '17:30',
            end: '18:30',
            value: 5, 
            processed: 0
        }
        addRide(rideInfo)
    })
}

function onceAYear() {
    const {sundayDates, wednesdayDates} = getRideDates()
    addRidestoDatabase(sundayDates, wednesdayDates)
}

function dayOfWeek(year, day) {
    return getDay(new Date(year, 0, day))
}

//Scheduled to Run 5AM UTC every day
async function dailyLoyaltyCleanUp() {
    console.log('Running Attempt at Consolidation')

    //Returning day prior from UTC time on server
    const yesterday = format(sub(new Date(), {days: 1}), 'yyyy-MM-dd')
    // console.log(yesterday)

    //Update loyalty_total in Customers Table by adding Value found in CheckIn table for yesterdays date where customer_id matches
    db.query(
        `UPDATE Customers
        SET loyalty_total = loyalty_total + (
            SELECT SUM(value) 
            FROM CheckIn 
            WHERE check_in = '${yesterday}' 
            AND customer_id = Customers.customer_id
        )
        WHERE customer_id IN (
            SELECT customer_id 
            FROM CheckIn 
            WHERE check_in = '${yesterday}'
        )`, (err, result) => {
            try {
                console.log('Successfully updated loyalty_total')
                console.log(result)
            } catch(err) {
                console.log(err)
            }
        })
}


module.exports = {
    dailyLoyaltyCleanUp
}