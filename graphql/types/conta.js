import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLID
  } from 'graphql'
import GraphQLDate from 'graphql-date'
import GraphQLMorador from './morador'
export default new GraphQLObjectType({
  name: 'Conta',
  fields: {
    _id: {type: GraphQLID},
    nome: {type: GraphQLString},
    data: {type: GraphQLDate},
    valor: {type: GraphQLFloat},
    pagou: {type: GraphQLMorador}
  }
})
  