import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLID,
    GraphQLList
  } from 'graphql'
import GraphQLMorador from './morador'

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
      },
      moradores: {
        type: new GraphQLList(GraphQLMorador)
      }
    }
  })
  