
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const playerSchema = new mongoose.Schema({

    name: {first: {type: String, required: true, trim: true, }, last : {type: String, required: true, trim: true, unique: true  }},

    dob: {type: Date, required: true, trim: true,  },


    picture: {url: {type: String, required: true}, imgId: {type: String, required: true} },


     teamId: {type: mongoose.Schema.Types.String, ref: "Team",   },

      exTeamId: [{type: mongoose.Schema.Types.String, ref: "Team", } ],


      position: {type: String, required: true, trim: true },

      number: {type: Number},

      


}, {
    timestamps: true
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player
