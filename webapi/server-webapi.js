require('dotenv').config()
const port = process.env.PORT || 1337
const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const initMongoDB = require('./server-mongodb')
const { graphqlHTTP } = require ('express-graphql')


// middleware
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())

// controller for adress
// app.use('/api/products', require('./controllers/productsController')) 
app.use('/api/athentication', require ('./controllers/authenticationController'))

// Controller GraphQL
app.use('/graphql', graphqlHTTP({
    schema: require('./schemas/graphqlSchema'), 
    graphiql: true
}))

// server start
app.listen(port, () => {
    console.log(`webapi is running on http://localhost:${port}`)
    initMongoDB()
})