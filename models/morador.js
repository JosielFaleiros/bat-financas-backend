import GraphQLDate from 'graphql-date'
import mongoose from 'mongoose'

var MoradorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
      },
    nome: {
        type: String,
        required: true
    },
    entrou: {
        type: Date,
        required: true,
        default: new Date()
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