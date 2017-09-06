import GraphQLDate from 'graphql-date'
import mongoose from 'mongoose'

var MoradorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    entrou: {
        type: Date,
        required: true
    },
    saiu: {
        type: Date,
        required: false
    },
    aluguel: {
        type: Number,
        required: true
    },
    republica: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Republica',
      required: true
    },
    saldo: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Morador', MoradorSchema);