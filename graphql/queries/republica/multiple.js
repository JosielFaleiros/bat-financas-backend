import {
    GraphQLList
  } from 'graphql'
  
  import republicaType from '../../types/republica'
  import RepublicaModel from '../../../models/republica'
  
  export default {
    type: new GraphQLList(republicaType),
    args: {},
    resolve (root, params, options) {
  
      return RepublicaModel
        .find()
        .sort('nome')
        .exec()
        
    }
  }