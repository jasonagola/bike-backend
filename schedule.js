const db = require("./config/databaseConfig")

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


async function dailyLoyaltyCleanUp() {
    console.log('Running Attempt at Consolidation')
    //Get CheckIns from Database
    db.query(`SELECT * FROM CheckIn WHERE check_in = CURRENT_DATE`, (err, result) => {
        try {
            const checkInData = result
            console.log(checkInData)
            // for (checkIn in checkInData) {
            //     db.query(`SELECT * FROM Customers WHERE customer_id = '${checkIn.customer_id}'`, (err, result) => {
            //         try {
            //             console.log('Successfully Found Customer')
            //             console.log(result)
            //         } catch(err) {
            //             console.log(err)
            //         }
            //     })
            // }
        }catch(err) {
            console.log(err)
        }
    })

    // console.log(checkInData)

    // const currentCustomerLoyalty = {}
    // for (checkIn in result) {
    //     db.query(`Select * from Customers WHERE customer_id = ${checkIn.customer_id}`, (err, result) => {
    //         try {
    //             console.log(result)
    //         } catch(err) {
    //             console.log(err)
    //         }
    //     })
    // }
    
    //Get Current Loyalty Value from Each Customer that checked In
    //Add CheckIn Value 
}


module.exports = {
    dailyLoyaltyCleanUp
}