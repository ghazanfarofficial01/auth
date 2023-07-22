const mongoose = require('mongoose')


const mobileSchema = mongoose.Schema({
    brand:{
      type: String,
      required: true,
      trim: true,
    },
    
    modelName:{
        type: String,
        required: true,
        trim: true,
    },
    price:{
      type: Number,
      required: true,
    },

    description:{
      type: String,
      trim: true
    },

    condition:{
       type: Number,
       required: true,
       min:[1,'at least one star required'],
       max:[5,'at most five starts ']
    },

    rating:{
      type: Number,
      min:[1,'least is one'],
      max:[5,'most is five']
    },
    inStock:{
       type:Number,
       required:true
    },

    category:{
      type: String,
      trim: true,
    }

})

const Mobile = mongoose.model("Mobile", mobileSchema);
module.exports = Mobile;