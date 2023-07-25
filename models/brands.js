const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    brandName:{
        type: String,
        require: true
    },

    imageURL:{
        type: String,
        required: true
     }


})

const Brands =  mongoose.model('Brands',brandSchema)
module.exports = Brands;