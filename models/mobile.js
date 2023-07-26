const mongoose = require("mongoose");

const mobileSchema = mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  pictures: [
    {
      type: String,
    },
  ],
  modelName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },

  originalPrice: {
    type: Number,
    required: true,
    default: 5000,
  },

  discount_percentage: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },

  condition: {
    type: Number,
    required: true,
    min: [1, "at least one star required"],
    max: [5, "at most five starts "],
  },

  rating: {
    type: Number,
    min: [1, "least is one"],
    max: [5, "most is five"],
  },

  unitsSold: {
    type: Number,
    default: 10,
  },

  inStock: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    trim: true,
  },

  RAM: {
    type: String,
    defaul: "",
  },
  storage: {
    type: String,
    default: "",
  },

  Battery: {
    type: String,
    default: "",
  },

  front_camera: {
    type: String,
    default: "",
  },

  rear_camera: {
    type: String,
    default: "",
  },

  display: {
    type: String,
    default: "",
  },

  warranty: {
    type: Number,
    default: 12,
  },

  color: {
    type: String,
    default: "Blue",
  },

  in_the_box: {
    type: String,
    default: "",
  },
});

const Mobile = mongoose.model("Mobile", mobileSchema);
module.exports = Mobile;

// RAM
// STORAGE
// Battery
// front camera
// rear camera
// display
// warranty
// color
// in the box
