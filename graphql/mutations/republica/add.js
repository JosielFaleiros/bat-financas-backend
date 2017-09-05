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
      const republica = await RepublicaModel.findOne({user: options.user})
      if(republica) return

      params.data.user = options.user
      const republicaModel = new RepublicaModel(params.data)
      const newRepublica = await republicaModel.save()
      
      if (!newRepublica) {
        throw new Error('Error adding new blog post')
      }

      return newRepublica
    }
  }
  