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
      if(!options.user) 
        throw new Error('Usuario não logado')
      
      const republica = await RepublicaModel.findOne({user: options.user})

      if(!republica)
        throw new Error('Republica não encontrada')

      return await MoradorModel.find({republica: republica})
    }
  }