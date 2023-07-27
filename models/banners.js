const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    bannerName:{
        type: String,
        trim:true,
        required: true
    },

    imageURL:{
        type: String,
        trim:true,
        required: true
    },
    
    description: {
        type: String,
        trim:true,
        default: ""
    }

})


const Banner = new mongoose.model("Banner", bannerSchema);
module.exports = Banner;