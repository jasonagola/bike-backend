
const JSONBig = require('json-bigint')

const {Client, Environment} = require('square')
require('dotenv').config()

const client = new Client({
    environment: Environment.Production,
    accessToken: process.env.SQUARE_ACCESS_TOKEN
    
})


const searchCustomer = async (req, res) => {
    const searchTerm = req.query.searchTerm
    console.log(searchTerm)
    try {
        const response = await client.customersApi.searchCustomers({
            query: {
                filter: {
                  phoneNumber: {
                    fuzzy: searchTerm
                  }
                }
              },
              'limit': 5
            });
        console.log(response.result)
        const responseString = JSONBig.stringify(response.result)
        res.send(responseString)
    } catch(error) {
        console.log(error)
    }
}

const createCustomer = async (req, res) => {
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const phone_number = req.query.phone_number
    const email = req.query.email
    try {
        const response = await client.customersApi.createCustomer({
          givenName: first_name,
          familyName: last_name,
          emailAddress: email,
          phoneNumber: phone_number
        });
      
        console.log(response.result)
        res.send(JSONBig.stringify(response.result));
      } catch(error) {
        console.log(error);
      }
}




module.exports = {
    searchCustomer,
    createCustomer
}