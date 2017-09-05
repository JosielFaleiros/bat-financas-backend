import {
    GraphQLList
  } from 'graphql'
  
  import republicaType from '../../types/republica'
  import RepublicaModel from '../../../models/republica'
  
  export default {
    type: republicaType,
    args: {},
    async resolve (root, params, options) {
      if(!options.user) 
        throw new Error('Usuario não logado')
      return await RepublicaModel.findOne({user: options.user})
    }
  }