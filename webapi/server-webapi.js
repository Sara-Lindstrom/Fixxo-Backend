require('dotenv').config()
const port = process.env.PORT || 1337
const express = require ('express')
const app = express()
const cors = require ('cors')
const bodyParser = require('body-parser')
const initMongoDB = require('./server-mongodb')


// middleware
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())

// controller for adress
const productsController = require('./controllers/productsController')
app.use('/api/products', productsController) 

initMongoDB()
app.listen(port, () => console.log(`webapi is running on http://localhost:${port}`))

