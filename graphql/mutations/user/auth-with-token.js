import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
  } from 'graphql'

import userType from '../../types/novo-usuario-input.js'
import UserModel from '../../../models/user.js'
import jwt from 'jsonwebtoken'
import RepublicaModel from '../../../models/republica.js'
import MoradorModel from '../../../models/morador.js'
import { AbilityBuilder, Ability } from 'casl'

const env       = process.env.NODE_ENV || 'development'
const config = require('../../../config/config')[env]

export default {
  type: GraphQLBoolean,
  args: {
    token: {
      name: 'token',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve (root, params, options) {
    try {
      var teste = await jwt.verify(params.token, config.secret)
    } catch (err){
      return false
    }
    options.user = await UserModel.findById(teste._doc._id)
    options.republica = await RepublicaModel.findOne({user: options.user})
    if(!options.republica) {
      let morador = await MoradorModel.findOne({user: options.user}).populate('republica')
      if(morador)
        options.republica = morador.republica
    }
    if(options.republica)
      defineAbilities(options)
    return true
  }
}

function defineAbilities(options) {
  const { rules, can } = AbilityBuilder.extract()

  if (options.user._id.equals(options.republica.user)) {
    can('manage', ['Conta', 'Morador'])
    can('update', ['Republica'])
  }

  options.abilities = new Ability(rules)
}
