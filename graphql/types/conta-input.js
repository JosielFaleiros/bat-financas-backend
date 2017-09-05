import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLID
} from 'graphql'
import GraphQLDate from 'graphql-date'

export default new GraphQLInputObjectType({
  name: 'ContaInput',
  fields: {
    nome: {type: new GraphQLNonNull(GraphQLString)},
    data: {type: GraphQLDate},
    valor: {type: new GraphQLNonNull(GraphQLFloat)},
    pagou: {type: GraphQLID}
  }
})