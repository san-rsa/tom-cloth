
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const teamSchema = new mongoose.Schema({

    name: {type: String, required: true, trim: true, unique: true, key: true
    },

    logo: [{url: {type: String, required: true}, imgId: {type: String, required: true} }],

    description: {type: String, },

    playerId: [{type: mongoose.Schema.Types.String, ref: "Player", }],


    regionId: [{type: mongoose.Schema.Types.String, ref: "Competition",   }, ],

    userId: [{type: mongoose.Schema.Types.String, ref: "Team", }],
      


      



}, {
    timestamps: true
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team
