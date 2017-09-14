import {
    GraphQLNonNull,
    GraphQLBoolean
  } from 'graphql'
  
  import moradorInputType from '../../types/morador-input.js'
  import moradorType from '../../types/morador.js'
  import MoradorModel from '../../../models/morador.js'
  import RepublicaModel from '../../../models/republica.js'
  import userType from '../../types/novo-usuario-input.js'
  import UserModel from '../../../models/user.js'

  export default {
    type: moradorType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(moradorInputType)
      },
      user: {
        name: 'user',
        type: new GraphQLNonNull(userType)
      }
    },
    async resolve (root, params, options) {
      if(!options.republica) {
        throw new Error('Republica não encontrada')
      }
      if(options.abilities.cannot('create', 'Morador'))
        throw new Error('Permissão negada')

      let userModel = new UserModel(params.user)
      let newUser = await userModel.save()
      if (!newUser) {
        throw new Error('Error adding new blog post')
      }

      params.data.user = newUser
      params.data.republica = options.republica
      let moradorModel = new MoradorModel(params.data)
      let newMorador = await moradorModel.save()

      if (!newMorador) {
        throw new Error('Error adding new morador')
      }
      
      return newMorador
    }
  }
  