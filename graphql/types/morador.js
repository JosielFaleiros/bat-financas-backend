import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLID
  } from 'graphql'
import GraphQLDate from 'graphql-date'
  
export default new GraphQLObjectType({
  name: 'Morador',
  fields: {
    _id: {
      type: GraphQLID
    },
    nome: {
      type: GraphQLString
    },
    entrou: {
      type: GraphQLDate
    },
    aluguel: {
      type: GraphQLFloat
    }
  }
})
  