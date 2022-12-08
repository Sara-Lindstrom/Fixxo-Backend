const productsController = require ('../controllers/productsController')
const request = require ('supertest')
const express = require ('express')
const mongoose = require('mongoose')
const app = require('../server-webapi')
const { deleteOne } = require('../schemas/productSchema')
require ('dotenv').config()
const controller = express.Router()

beforeEach (() => {
   mongoose.connect(process.env.MONGODB_URI)
})

afterAll (async () => {
    await mongoose.disconnect()
})


test('should return all products', () => {

    controller.route('/').get (async (httpRequest, httpResponse) => {
    
        try{
            httpResponse.status(200).json(await productSchema.find())
        }
        catch{
            httpResponse.status(500).json()
        }
    
        expect (httpResponse).ToBe(200)
    })

    
})
