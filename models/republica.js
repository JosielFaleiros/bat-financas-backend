import mongoose from 'mongoose'

var RepublicaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    caixa: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Republica', RepublicaSchema);