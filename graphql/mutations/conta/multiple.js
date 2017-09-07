import {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'
  
import contaType from '../../types/conta.js'
import ContaModel from '../../../models/conta.js'
import RepublicaModel from '../../../models/republica.js'

export default {
  type: new GraphQLList(contaType),
  args: {
    ano: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    mes: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve (root, params, options) {
    if(!options.republica)
      throw new Error('Republica não encontrada')

    return ContaModel.find({
      $and: [
        {republica: options.republica}, 
        {data: {
          "$gte": new Date(params.ano, params.mes, 1), 
          "$lt": new Date(params.ano, params.mes + 1, 1)
        }}]
    }).populate('pagou').sort('data')
  }
}