const router = require("express").Router()
const JSONBig = require('json-bigint')

const {Client, Environment} = require('square')

const client = new Client({
    environment: Environment.Production,
    accessToken: process.env.SQUARE_ACCESS_TOKEN
    
})

//Customer search in square customer by fuzzy phone number
router.get('/searchCustomer', async (req, res) => {
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
})

//Create a new customer in square
router.put('/createCustomer', async (req, res) => {
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const phone_number = req.query.phone_number
    const email = req.query.email
    try {
        const response = await client.customersApi.createCustomer({
          givenName: last_name,
          familyName: first_name,
          emailAddress: email,
          phoneNumber: phone_number
        });
      
        console.log(response.result)
        res.send(JSONBig.stringify(response.result));
      } catch(error) {
        console.log(error);
      }
})


module.exports = router