const express = require ('express')
const controller = express.Router()
let products = require('../data/simulated_database')

// POST - Create
controller.post('/', (httpRequest, httpResponse) =>{
    let product = {
        articleNumber: (products[products.length -1])?.articleNumber > 0 ? (products [products.length -1])?.articleNumber +1 : 1,
        name: httpRequest.body.name,
        description: httpRequest.body.description,
        category: httpRequest.body.category,
        price: httpRequest.body.price,
        imageName: httpRequest.body.imageName
    }

    products.push(product)
    httpResponse.status(201).json(product)
})

// GET - GetAll
controller.get('/', (httpRequest, httpResponse) =>{
    httpResponse.status(200).json(products)
})

// GET - get
controller.get('/:articleNumber', (httpRequest, httpResponse) =>{
    httpResponse.status(200).json(products)
})

controller.route("/articleNumber")
.get ((httpRequest, httpResponse) => {})
.put ((httpRequest, httpResponse) => {})
.delete ((httpRequest, httpResponse) => {})


module.exports = controller