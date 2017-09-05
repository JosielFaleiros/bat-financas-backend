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
    const user = await UserModel.findOne({
      email: params.data.email
    })
    if (!user) {
      throw new Error('Usuario não existe.')
    }

    if(!await user.comparePassword(params.data.password))
      throw new Error('Senha incorreta.')

    return jwt.sign(user, 'superSecret', {});
  }
}
