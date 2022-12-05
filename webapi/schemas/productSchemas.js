const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    articleNumber:{type:mongoose.Schema.Types.ObjectId},
    name:{type:String, required:true},
    description:{type:String},
    category:{type:String},
    price:{type:Number, required:true},
    rating:{type:Number},
    tag:{type:String},
    imageName:{type:String}
})

module.exports = mongoose.model('Products', productSchema)