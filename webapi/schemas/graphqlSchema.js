const graphql = require('graphql')

const Vendor = require('../schemas/vendorSchemas')
const Product = require('../schemas/productSchema')

// types
const VendorType = new graphql.GraphQLObjectType({
    name:'Vendor',
    fields: () => ({
        _id: {type:graphql.GraphQLID},
        name: {type:graphql.GraphQLString},
        products:{
            type: new graphql.GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({vendorId:parent._id})
            }
        }
    })
})

const ProductType = new graphql.GraphQLObjectType({
    name:'Product',
    fields: () => ({
        _id:{type:graphql.GraphQLID},
        name:{type:graphql.GraphQLString, required:true},
        description:{type:graphql.GraphQLString},
        category:{type:graphql.GraphQLString},
        price:{type:graphql.GraphQLFloat, required:true},
        rating:{type:graphql.GraphQLInt},
        tag:{type:graphql.GraphQLString},
        imageName:{type:graphql.GraphQLString},
        vendor:{
            type: VendorType,
            resolve(parent, args){
                return Vendor.findById(parent.vendorId)
            }
        }
    })
})

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        vendor: {
            type: VendorType,
            args: {id: {type: graphql.GraphQLID}},
            resolve(parent, args) {
                return Vendor.findById(args.id)
            }
        },
        vendors: {
            type: new graphql.GraphQLList(VendorType),
            resolve(parent, args){
                return Vendor.find({})
            }
        },

        product: {
            type: ProductType,
            args: {id: {type:graphql.GraphQLID}},
            resolve(parent, args){
                return Product.findById(args.id)
            }
        },
        products: {
            type: new graphql.GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({})
            }
        }
    }
})

// mutations
const Mutation = new graphql.GraphQLObjectType({
    name:'Mutation',
    fields:{
        addVendor:{
            type: VendorType,
            args:{
                name: {type:graphql.GraphQLString}
            },
            resolve(parent, args){
                const vendor = new Vendor ({
                    name: args.name
                })
                return vendor.save()
            }
        },
        addProduct:{
            type: ProductType,
            args:{
                name:{type:graphql.GraphQLString, required:true},
                description:{type:graphql.GraphQLString},
                category:{type:graphql.GraphQLString},
                price:{type:graphql.GraphQLFloat, required:true},
                rating:{type:graphql.GraphQLInt},
                tag:{type:graphql.GraphQLString},
                imageName:{type:graphql.GraphQLString},
                vendorId:{ type: graphql.GraphQLID}
            },
            resolve(parent, args){
                const Product = new Product ({
                    name:args.name,
                    description:args.description,
                    category:args.category,
                    price:args.price,
                    rating:args.rating,
                    tag:args.tag,
                    imageName:args.imageName,
                    vendorId:args.vendorId
                })
                return vendor.save()
            }
        }
    }
}) 

module.exports = new graphql.GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})