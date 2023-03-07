
//Returns a new date formatted for mySQL
export function dateToDb(date) {
    return format(new Date(date), 'yyyy-MM-dd')
}


module.exports = {
    dateToDb
}