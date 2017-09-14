import {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
  
import ContaModel from '../../../models/conta'
import MoradorModel from '../../../models/morador'
import RepublicaModel from '../../../models/republica'
export default {
  type: GraphQLString,
  args: {
    ano: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    mes: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  async resolve (root, params, options) {
    if(!options.republica)
      throw new Error('Republica não encontrada')

    if(options.abilities.cannot('update', 'Republica'))
      throw new Error('Permissão negada')

    let contas = await ContaModel.find({
      $and: [
        {republica: options.republica}, 
        {data: {
          "$gte": new Date(params.ano, params.mes, 1), 
          "$lt": new Date(params.ano, params.mes + 1, 1)
        }}]
    }).populate('pagou').sort('data')

    let moradores = await MoradorModel.find({republica: options.republica})

    moradores.map( (morador) => {
      let contasPagas = contas.filter((conta) => conta.pagou && conta.pagou.equals(morador))
      morador.saldo += somarContas(contasPagas)
      morador.saldo -= somarContas(contas) / moradores.length
      morador.saldo -= morador.aluguel
      morador.save()
    })
    return "Lançado"
  }
}
function somarContas(contas){
  let totalContas = 0
  contas.map((conta) => {
    totalContas += conta.valor
  })
  return totalContas
}