import mongoose from 'mongoose'

var RepublicaSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    nome: {
        type: String,
        required: true,
    },
    caixa: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Republica', RepublicaSchema);