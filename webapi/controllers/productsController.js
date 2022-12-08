const express = require ('express')
const { authorize } = require('../middleware/authorization')
const controller = express.Router()
const productSchema = require('../schemas/productSchema')

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
// http://localhost:5000/api/products/:id
controller.route("/:id").get (async (httpRequest, httpResponse) => {
    const product = await productSchema.findById(httpRequest.params.id)

    if (product != undefined){
        httpResponse.status(200).json(product)
    }
    else{
        httpResponse.status(404).json()
    }
})

// SECURED ROUTES
// create new product
// http://localhost:5000/api/products
controller.route('/').post (authorize, async (httpRequest, httpResponse) => {

    const { name, description, price, category, tag, imageName } = httpRequest.body

    if(!name || !price){
        httpResponse.status(400).json({text: 'name and price is recuired.'})
    }

    const product_exist = await productSchema.findOne({name})

    if (product_exist){
        httpResponse.status(409).json({text:"A product with the same name already exists."})
    }

    else{
        const product = await productSchema.create({
            name, 
            description,
            price,
            category,
            tag,
            imageName
        })
        console.log(product)

        if(product){
            httpResponse.status(201).json({text:"product created"})
            
        }
        else{
            httpResponse.status(400).json({text:"Something went wrong! We could not create the product."})
        }
    }
})

// update product
// http://localhost:5000/api/products/:id
controller.route("/:id").put (authorize, async(httpRequest, httpResponse) => {

    if(httpRequest.params.id != undefined){
        const product = await productSchema.updateOne(
            {_id: httpRequest.params.id},
            { $set: httpRequest.body}
        )   
        
        httpResponse.status(200).json({text:"Product updated"})
    }
    else {
        httpResponse.status(404).json()
    }
})

// delete product
// http://localhost:5000/api/products/:id
controller.route("/:id").delete (authorize, async (httpRequest, httpResponse) => {

    if(!httpRequest.params.id){
        httpResponse.status(400).json({text:"no id was specified"})
    }
    else{
        const product = await productSchema.findById(httpRequest.params.id)

        if (product){
            await productSchema.deleteOne(product)
            httpResponse.status(200).json({text:`porduct ${httpRequest.params.id} was removed`})
        }
        else{
            httpResponse.status(404).json({text:`product ${httpRequest.params.id} was not found`})
        }       
    }

})

module.exports = controller