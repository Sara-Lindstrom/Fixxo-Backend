const jsonWebToken = require('jsonwebtoken')

const generateAccessToken = (id) => {
    return jsonWebToken.sign({id}, process.env.JSONWEBTOKEN_SECRET,{
        expiresIn:'1d'
    })

}

const authorize = (httpRequest, httpResponse, next) => {
    if (httpRequest.headers.authorization && httpRequest.headers.authorization.startsWith('Bearer')){
        try{
            const accessToken = httpRequest.headers.authorization.split(' ')[1]
            const decodedAccessToken = jsonWebToken.verify(accessToken, process.env.JSONWEBTOKEN_SECRET)
            next()
        } 
        catch {
            httpResponse.status(401).json()
        }
    }
    else{
        httpResponse.status(401).json()
    }
}


module.exports = {generateAccessToken, authorize}