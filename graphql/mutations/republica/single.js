import {
    GraphQLList
  } from 'graphql'
  
  import republicaType from '../../types/republica'
  import RepublicaModel from '../../../models/republica'
  
  export default {
    type: republicaType,
    args: {},
    async resolve (root, params, options) {
      return await RepublicaModel.findOne({user: options.user})
    }
  }