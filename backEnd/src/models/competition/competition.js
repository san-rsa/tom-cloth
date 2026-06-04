
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    name: {type: String, required: true, trim: true, unique: true
    },

    type : {type: String,  enum:  ['league', 'cup', ] },

    min: {ft: { type: Number,}, et: {type: Number,},},



    logo: [{url: {type: String, required: true}, imgId: {type: String, required: true} }],


    teams: [ {type: mongoose.Schema.Types.String, ref: "Team",   },  ],

    substitute: {starting: { type: Number,}, sub: {type: Number,}, },


    views: {type: Number, default: 0 },






}, {
    timestamps: true
})









Schema.pre('findOne', async function (next) {
    const user = this;
    user.views = Number(user.views) + 1
    
    next();
  });

const Competition  = mongoose.model('Competition ', Schema)

module.exports = Competition  
