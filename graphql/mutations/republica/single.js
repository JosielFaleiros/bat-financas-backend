import {
    GraphQLList
  } from 'graphql'
  
  import republicaType from '../../types/republica'
  import RepublicaModel from '../../../models/republica'
  
  export default {
    type: republicaType,
    args: {},
    async resolve (root, params, options) {
      if(!options.republica) {
        throw new Error('Usuario não possui uma republica')
      }
      return options.republica
    }
  }