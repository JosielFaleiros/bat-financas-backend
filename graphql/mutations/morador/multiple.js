import {
    GraphQLList
  } from 'graphql'
  
  import moradorType from '../../types/morador.js'
  import MoradorModel from '../../../models/morador.js'
  import RepublicaModel from '../../../models/republica.js'
  export default {
    type: new GraphQLList(moradorType),
    args: {},
    async resolve (root, params, options) {
      if(!options.user) return
      const republica = await RepublicaModel.findOne({user: options.user})
      return await MoradorModel.find({republica: republica})
    }
  }