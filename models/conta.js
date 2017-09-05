import GraphQLDate from 'graphql-date'
import mongoose from 'mongoose'

var ContaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true,
        default: Date.now()
    },
    valor: {
        type: Number,
        required: true
    },
    republica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Republica',
        required: true
    },
    pagou: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Morador',
        default: null
    }
})

module.exports = mongoose.model('Conta', ContaSchema);