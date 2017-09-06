import {
    GraphQLNonNull,
    GraphQLBoolean
  } from 'graphql'
  
  import contaInputType from '../../types/conta-input.js'
  import contaType from '../../types/conta.js'
  import ContaModel from '../../../models/conta.js'
  import RepublicaModel from '../../../models/republica.js'
  
  export default {
    type: contaType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(contaInputType)
      }
    },
    async resolve (root, params, options) {
      if(!options.republica)
        throw new Error('Republica não encontrada')

      params.data.republica = options.republica
      let contaModel = new ContaModel(params.data)
      let newConta = await contaModel.save()

      if (!newConta)
        throw new Error('Error adding new conta')
      
      
      return newConta
    }
  }
  