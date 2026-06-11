
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






    gender: {type: String, required: true, trim: true, enum: [ 'male', 'female', 'all'],},

    age: {type: String, required: true, trim: true, enum: [ 'adult', 'minor'],},



    

    views: {type: Number, required: true, default: 0},

    ordered: {type: Number, required: true, default: 0 },
      




}, {
    timestamps: true
})

const Cloth = mongoose.model('Cloth', Schema)

module.exports = Cloth
