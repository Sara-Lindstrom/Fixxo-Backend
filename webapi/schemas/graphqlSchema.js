const graphql = require('graphql')

const Product = require('../schemas/productSchema')

const ProductType = new graphql.GraphQLObjectType({
    name:'Product',
    fields: () => ({
        _id:{type:graphql.GraphQLID},
        name:{type:graphql.GraphQLString, required:true},
        tag:{type:graphql.GraphQLString},
        description:{type:graphql.GraphQLString},
        category:{type:graphql.GraphQLString},
        price:{type:graphql.GraphQLString, required:true},
        rating:{type:graphql.GraphQLString},
        imageName:{type:graphql.GraphQLString},
    })
})

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
        addProduct:{
            type: ProductType,
            args:{
                name:{type:graphql.GraphQLString, required:true},
                description:{type:graphql.GraphQLString},
                category:{type:graphql.GraphQLString},
                price:{type:graphql.GraphQLString, required:true},
                // rating:{type:graphql.GraphQLInt},
                tag:{type:graphql.GraphQLString},
                imageName:{type:graphql.GraphQLString},
            },
            resolve(parent, args){
                const product = new Product ({
                    name:args.name,
                    description:args.description,
                    category:args.category,
                    price:args.price,
                    // rating:args.rating,
                    tag:args.tag,
                    imageName:args.imageName,
                })
                return product.save()
            }
        }
    }
}) 

module.exports = new graphql.GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})