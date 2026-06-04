
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    name: {type: String, required: true, trim: true, unique: true, key: true
    },

    img: [{url: {type: String, required: true}, imgId: {type: String, required: true} }],

    description: {type: String, },

    playerId: [{type: mongoose.Schema.Types.String, ref: "Player", }],


    regionId: [{type: mongoose.Schema.Types.String, ref: "Competition",   }, ],

    userId: [{type: mongoose.Schema.Types.String, ref: "Team", }],

    size: {type: String, required: true, trim: true, },

    type: {type: String, required: true, trim: true, },

    size: {type: String, required: true, trim: true, },



      


      



}, {
    timestamps: true
})

const Team = mongoose.model('Team', Schema)

module.exports = Team
