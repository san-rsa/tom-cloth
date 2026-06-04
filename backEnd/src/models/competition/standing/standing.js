
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    competition: { type: mongoose.Schema.Types.String, ref: "Competition",
    },

    year : {type: Number  , required: true},


    type : {type: String  , default: "league"},




    standing: [{ teams: {type: mongoose.Schema.Types.String, ref: "Team",  },

            stats: {
                win: {type: Number,  default: 0   },
                loss: {type: Number, default: 0   },
                draw: {type: Number,  default: 0   },
                gd: {type: Number,  default: 0   },
                points: {type: Number, default: 0   },
                gs: {type: Number, default: 0   },
                ga: {type: Number, default: 0   },
                played: {type: Number, default: 0   },

                form: [ {type: String, enum: ['W', 'L', 'D'] }]


                

            }

}]
}, {
    timestamps: true
})

const Standing = mongoose.model('Standing', Schema)

module.exports = Standing
