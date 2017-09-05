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
      if(options.user.republica) return

      const republicaModel = new RepublicaModel(params.data)
      const newRepublica = await republicaModel.save()
      if (!newRepublica) {
        throw new Error('Error adding new blog post')
      }
      options.user.republica = newRepublica
      options.user.save()

      return newRepublica
    }
  }
  