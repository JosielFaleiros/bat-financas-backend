import {
    GraphQLList
  } from 'graphql'
  
  import moradorType from '../../types/morador.js'
  
  export default {
    type: new GraphQLList(moradorType),
    args: {},
    resolve (root, params, options) {
      return options.user.republica.moradores
    }
  }