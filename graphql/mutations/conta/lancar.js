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

    const contas = await ContaModel.find({
      $and: [
        {republica: options.republica}, 
        {data: {
          "$gte": new Date(params.ano, params.mes - 1, 1), 
          "$lt": new Date(params.ano, params.mes, 1)
        }}]
    }).populate('pagou').sort('data')
    var totalContas = 0
    contas.map(async (conta) => {
      totalContas += conta.valor
    })

    const moradores = await MoradorModel.find({republica: options.republica})

    moradores.map(async (morador) => {
      contas.map((conta)=>{
        if(conta.pagou && conta.pagou.equals(morador)){
          morador.saldo += conta.valor
        }
      })
      morador.saldo -= totalContas / await republica.numeroMoradores()
      morador.saldo -= morador.aluguel
      morador.save()
    })
    return "Lançado"
  }
}