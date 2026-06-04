
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

            competition: { type: mongoose.Schema.Types.String, ref: "Competition", },

            year : {type: Number  ,},




            stats: [{
                player: { type: mongoose.Schema.Types.String, ref: "Player",    },
                team: {type: mongoose.Schema.Types.String, ref: "Team",  },


                played: {type: Number, default: 0   },
                goal: {type: Number, default: 0   },
                assist: {type: Number,  default: 0   },
                yellow: {type: Number,  default: 0   },
                red: {type: Number, default: 0   },
                motm: {type: Number, default: 0   },
                potm: {type: Number, default: 0   }, 
            }]


}, {
    timestamps: true
})

const Stat = mongoose.model('Player-Stat', Schema)

module.exports = Stat
