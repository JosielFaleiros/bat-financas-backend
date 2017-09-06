import {
    GraphQLNonNull,
    GraphQLString
  } from 'graphql'
  
import userType from '../../types/novo-usuario-input.js'
import UserModel from '../../../models/user.js'
import jwt from 'jsonwebtoken'
import RepublicaModel from '../../../models/republica.js'

export default {
  type: GraphQLString,
  args: {
    token: {
      name: 'token',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    let teste = await jwt.verify(params.token, 'superSecret')
    options.user = await UserModel.findById(teste._doc._id)
    options.republica = await RepublicaModel.findOne({user: options.user})
  }
}
  