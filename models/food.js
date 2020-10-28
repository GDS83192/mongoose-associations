const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
    }, ],
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);