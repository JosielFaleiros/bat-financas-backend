import mongoose from 'mongoose'
import MoradorModel from './morador'

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
        required: false,
        default: 0
    }
})

// Compare password input to password saved in database
RepublicaSchema.methods.numeroMoradores = async function () {
    const moradores = await MoradorModel.find({republica: this})
    return moradores.length
}

module.exports = mongoose.model('Republica', RepublicaSchema);