import {
    GraphQLNonNull,
    GraphQLString
  } from 'graphql'
  
  import userType from '../../types/novo-usuario-input.js'
  import UserModel from '../../../models/user.js'
  import jwt from 'jsonwebtoken'
  
  export default {
    type: GraphQLString,
    args: {
      token: {
        name: 'token',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve (root, params, options) {
        const teste = await jwt.verify(params.token, 'superSecret')
        options.user = await UserModel.findById(teste._doc._id)
    }
  }
  