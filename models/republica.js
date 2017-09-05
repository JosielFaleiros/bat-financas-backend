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
    },
    moradores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Morador'
    }]
})

module.exports = mongoose.model('Republica', RepublicaSchema);