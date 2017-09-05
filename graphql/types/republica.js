import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLID
  } from 'graphql'
  
  export default new GraphQLObjectType({
    name: 'Republica',
    fields: {
      _id: {
        type: GraphQLID
      },
      nome: {
        type: GraphQLString
      },
      caixa: {
        type: GraphQLFloat
      }
    }
  })
  