import {
    GraphQLNonNull,
    GraphQLBoolean
  } from 'graphql'
  
  import moradorInputType from '../../types/morador-input.js'
  import republicaType from '../../types/republica.js'
  import MoradorModel from '../../../models/morador.js'
  
  export default {
    type: republicaType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(moradorInputType)
      }
    },
    async resolve (root, params, options) {
      if(options.user.republica === null) return

      const moradorModel = new MoradorModel(params.data)
      const newMorador = await moradorModel.save()

      if (!newMorador) {
        throw new Error('Error adding new blog post')
      }
      
      options.user.republica.moradores.push(newMorador)
      options.user.republica.save()

      return options.user.republica
    }
  }
  