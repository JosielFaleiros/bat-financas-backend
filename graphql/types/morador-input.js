import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat
} from 'graphql'
import GraphQLDate from 'graphql-date'

export default new GraphQLInputObjectType({
  name: 'MoradorInput',
  fields: {
    nome: {type: new GraphQLNonNull(GraphQLString)},
    entrou: {type: GraphQLDate},
    aluguel: {type: new GraphQLNonNull(GraphQLFloat)}
  }
})