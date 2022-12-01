const { json } = require('express')
const express = require ('express')
const controller = express.Router()
let products = require('../data/simulated_database')

// middleware
controller.param("articleNumber", (req,res,next, articleNumber)=>{
    res.product = products.find(product => product.articleNumber == articleNumber)
    next()
})

controller.param("tag", (req, res, next, tag)=>{
    res.productTag = products.filter(p => p.tag === tag)

    next()
})

// http://localhost:5000/api/products
controller.route('/')
// POST - Create
.post ((httpRequest, httpResponse) => {
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
// GET - getAll
.get ((httpRequest, httpResponse) => {
    httpResponse.status(200).json(products)
})


// http://localhost:5000/api/products/:articleNumber
controller.route("/:articleNumber")
// GET - get
.get ((httpRequest, httpResponse) => {
    if (httpRequest != undefined){
        httpResponse.status(200).json(httpResponse.product)
    }
    else{
        httpResponse.status(404).json()
    }
})
.put ((httpRequest, httpResponse) => {

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
.delete ((httpRequest, httpResponse) => {
    if (httpRequest != undefined){
        products= products.filter(product => product.articleNumber !== httpRequest.product.articleNumber)

        httpResponse.status(204).json()
    }
    else{
        httpResponse.status(404).json()
    }
})

// http://localhost:5000/api/products/take/:tag/:amount
controller.route("/take/:tag/:amount")
// GET - get amount
.get ((httpRequest, httpResponse) => {
    if (httpRequest != undefined){

        let productAmount

        if(httpResponse.productTag > httpRequest.params.amount){
            productAmount = httpResponse.productTag.slice(0, Number(httpRequest.params.amount));
        }
        else{
            productAmount = httpResponse.productTag
        }
        httpResponse.status(201).json(productAmount)
    }
    else {
        httpResponse.status(404).json()
    }
    

})

module.exports = controller