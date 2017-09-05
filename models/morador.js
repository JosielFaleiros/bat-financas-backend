import GraphQLDate from 'graphql-date'
import mongoose from 'mongoose'

var MoradorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    entrou: {
        type: Date,
        required: true
    },
    aluguel: {
        type: Number,
        required: true
    },
    republica: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Republica',
      required: true
    }
})

module.exports = mongoose.model('Morador', MoradorSchema);