import {
    GraphQLNonNull,
    GraphQLBoolean
  } from 'graphql'
  
  import republicaInputType from '../../types/republica-input.js'
  import republicaType from '../../types/republica.js'
  import RepublicaModel from '../../../models/republica.js'
  
  export default {
    type: republicaType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(republicaInputType)
      }
    },
    async resolve (root, params, options) {
      if(!options.user)
        throw new Error('Usuario não encontrado')
      

      if(options.republica) {
        throw new Error('Usuario já possui uma republica')
      }


      params.data.user = options.user
      const republicaModel = new RepublicaModel(params.data)
      const newRepublica = await republicaModel.save()
      
      if (!newRepublica) {
        throw new Error('Error adding new republica')
      }

      return newRepublica
    }
  }
  