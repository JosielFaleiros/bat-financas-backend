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
      data: {
        name: 'data',
        type: new GraphQLNonNull(userType)
      }
    },
    async resolve (root, params, options) {
      let userModel = new UserModel(params.data)
      let newUser = await userModel.save()
      if (!newUser) {
        throw new Error('Error adding new blog post')
      }
      return jwt.sign(newUser, 'superSecret', {})
    }
  }
  