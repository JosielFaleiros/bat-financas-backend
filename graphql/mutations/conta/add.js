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
      if(options.user === null) return


      params.data.republica = await RepublicaModel.findOne({user: options.user})

      if(!params.data.republica) {
        throw new Error('Republica não encontrada')
      }

      const contaModel = new ContaModel(params.data)
      const newConta = await contaModel.save()

      if (!newConta) {
        throw new Error('Error adding new morador')
      }
      
      return newConta
    }
  }
  