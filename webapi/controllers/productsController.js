const { json } = require('express')
const express = require ('express')
const controller = express.Router()
let products = require('../data/simulated-database')
const productSchema = require('../schemas/productSchemas')

// MIDDLEWARE
controller.param("articleNumber", (req,res,next, articleNumber)=>{
    res.product = products.find(product => product.articleNumber == articleNumber)
    next()
})


// UNSECURED ROUTES
// get all
// http://localhost:5000/api/products
controller.route('/').get (async (httpRequest, httpResponse) => {
    
    try{
        httpResponse.status(200).json(await productSchema.find())
    }
    catch{
        httpResponse.status(500).json()
    }

    
})

// get tagged and amount
// http://localhost:5000/api/products/take/:tag/:amount
controller.route("/take/:tag/:amount").get (async(httpRequest, httpResponse) => {

    const products = await productSchema.find({tag: httpRequest.params.tag}).limit(httpRequest.params.amount)

    if (products){
        httpResponse.status(200).json(products)
    }
    else{
        httpResponse.status(400).json()
    }

})

// get from article number
// http://localhost:5000/api/products/:articleNumber
controller.route("/:articleNumber").get ((httpRequest, httpResponse) => {
    if (httpRequest != undefined){
        httpResponse.status(200).json(httpResponse.product)
    }
    else{
        httpResponse.status(404).json()
    }
})

// SECURED ROUTES
// create new product
// http://localhost:5000/api/products
controller.route('/').post ((httpRequest, httpResponse) => {
    let product = {
        // articleNumber: (products[products.length -1])?.articleNumber > 0 ? (products [products.length -1])?.articleNumber +1 : 1,
        name: httpRequest.body.name,
        description: httpRequest.body.description,
        category: httpRequest.body.category,
        price: httpRequest.body.price,
        imageName: httpRequest.body.imageName
    }

    products.push(product)
    httpResponse.status(201).json(product)
})

// update product
// http://localhost:5000/api/products/:articleNumber
controller.route("/:articleNumber").put ((httpRequest, httpResponse) => {

    if (httpRequest != undefined){

        httpResponse.product.name = httpRequest.body.name ? httpRequest.body.name : httpResponse.product.name
        httpResponse.product.description = httpRequest.body.description ? httpRequest.body.description : httpResponse.product.description
        httpResponse.product.category = httpRequest.body.category ? httpRequest.body.category : httpResponse.product.category
        httpResponse.product.price = httpRequest.body.price ? httpRequest.body.price : httpResponse.product.price
        httpResponse.product.imageName = httpRequest.body.imageName ? httpRequest.body.imageName : httpResponse.product.imageName

        httpResponse.status(200).json(httpResponse.product)
    }
    else{
        httpResponse.status(404).json()
    }
})

// delete product
// http://localhost:5000/api/products/:articleNumber
controller.route("/:articleNumber").delete ((httpRequest, httpResponse) => {
    if (httpRequest != undefined){
        products= products.filter(product => product.articleNumber !== httpRequest.product.articleNumber)

        httpResponse.status(204).json()
    }
    else{
        httpResponse.status(404).json()
    }
})

module.exports = controller