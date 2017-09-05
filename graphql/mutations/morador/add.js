import {
    GraphQLNonNull,
    GraphQLBoolean
  } from 'graphql'
  
  import moradorInputType from '../../types/morador-input.js'
  import moradorType from '../../types/morador.js'
  import MoradorModel from '../../../models/morador.js'
  import RepublicaModel from '../../../models/republica.js'
  
  export default {
    type: moradorType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(moradorInputType)
      }
    },
    async resolve (root, params, options) {
      if(!options.republica) {
        throw new Error('Republica não encontrada')
      }
      params.data.republica = options.republica
      const moradorModel = new MoradorModel(params.data)
      const newMorador = await moradorModel.save()

      if (!newMorador) {
        throw new Error('Error adding new morador')
      }
      
      return newMorador
    }
  }
  