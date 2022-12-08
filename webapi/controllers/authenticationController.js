const express = require ('express')
const controller = express.Router()
const userSchema = require ('../schemas/UserSchema')
const bcrypt= require ('bcryptjs')
const jsonWebToken = require ('jsonwebtoken')
const {generateAccessToken} = require ('../middleware/authorization')

// unsecured routes

controller.route('/signup').post(async(httpRequest, httpResponse) => {
    const {name, email, password} = httpRequest.body

    if(!name||!email||!password){
        httpResponse.status(400).json({text:"name, email and password is required"})
    }

    const userExists = await userSchema.findOne({email})

    if (userExists){
        httpResponse.status(409).json({text:"this email is already in use"})
    }
    else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await userSchema.create ({name, email, password:hashedPassword})

        if(user){
            httpResponse.status(201).json()
        }
        else{
            httpResponse.status(400).json({text:"user create failed"})
        }
        
    }
})

controller.route('/signin').post(async(httpRequest, httpResponse) => {

    const {email, password} = httpRequest.body

    if(!email||!password){
        httpResponse.status(400).json({text:"email and password is required"})
    }

    const user = await userSchema.findOne({email})

    if (user && await bcrypt.compare(password, user.password)){
        httpResponse.status(200).json({
            accessToken: generateAccessToken(user._id)
        })
    }
    else{
        httpResponse.status(400).json({text:"incorrect email or password"})
    }

})

module.exports = controller