const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
gender:{
  type: String,
  required: true,
  enum: { values: ['Male', 'Female'], message: 'only Male or Female values allowed' }
},
age:{
  type: Number,
  required: true,
  min:[18,'must be atleast 18 years and above']
},
dp:{
  type:String
},
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: true,
    type: String,
  },

  emailVerified:{
    type: Boolean,
    default:false
  }
  
      

});

const User = mongoose.model("User", userSchema);
module.exports = User;