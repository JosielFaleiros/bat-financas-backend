import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat
} from 'graphql'

export default new GraphQLInputObjectType({
  name: 'RepublicaInput',
  fields: {
    nome: {type: new GraphQLNonNull(GraphQLString)},
    caixa: {type: GraphQLFloat}
  }
})