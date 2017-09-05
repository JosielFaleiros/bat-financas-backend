import {
    GraphQLList
  } from 'graphql'
  
  import contaType from '../../types/conta.js'
  import ContaModel from '../../../models/conta.js'
  import RepublicaModel from '../../../models/republica.js'

  export default {
    type: new GraphQLList(contaType),
    args: {},
    async resolve (root, params, options) {
      if(!options.user) 
        throw new Error('Usuario não logado')
      
      const republica = await RepublicaModel.findOne({user: options.user})

      if(!republica)
        throw new Error('Republica não encontrada')

      return await ContaModel.find({republica: republica}).populate('pagou').sort('data')
    }
  }