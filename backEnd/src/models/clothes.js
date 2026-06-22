
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    name: {type: String, required: true, trim: true, unique: true, key: true
    },

    img: [{url: {type: String, required: true}, imgId: {type: String, required: true} }],

    description: {type: String, trim: true },

    type: {type: String, required: true, trim: true, enum: [ 'top', 'bottom', 'accesory'],},

    size: [{ size: {type: String, required: true }, price: {type: Number, required: true }  }],

    categoryId: [{type: mongoose.Schema.Types.String, ref: "Category",     },],

    discount: { type: Number,  }  ,

    color: [{type: String},],

//   basePrice: 28.00,
//   specs: [
//     { label: "Material", value: "85% Polyester / 15% Spandex" },
//     { label: "Fit", value: "Athletic Slim Fit" },
//     { label: "Care", value: "Machine wash cold, tumble dry low" }
//   ],





    gender: {type: String, required: true, trim: true, enum: [ 'male', 'female', 'all'],},

    age: {type: String, required: true, trim: true, enum: [ 'adult', 'minor'],},

    available: {type: Number, required: true, default: 1},

    views: {type: Number, required: true, default: 0},

    ordered: {type: Number, required: true, default: 0 },
      




}, {
    timestamps: true
})

const Cloth = mongoose.model('Cloth', Schema)

module.exports = Cloth
