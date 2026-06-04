
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({

    competition: { type: mongoose.Schema.Types.String, ref: "Competition",
    },

    year : {type: Number  , required: true, },


    type : {type: String,  enum: [ 'league', 'cup'],  },

      live: [{ matchday: {type: Number, required: true},

  
                 

        teams: [{home :{type: mongoose.Schema.Types.ObjectId, ref: "Team",  },

                homeScore: {type: Number , },  
                awayScore: {type: Number , },  

                away :{type: mongoose.Schema.Types.ObjectId, ref: "Team",  },
            
            
                
                time: { now: {type: Number , required: true, default: 0}, first: {type: Number , required: true, default: 45}, second: {type: Number , required: true, default: 90}}, 
                
                
                group: {type: String  },
                stage : {type: String,  enum: ['knockout', 'group'],  },

                refree: {type: String, },
                stadium: {type: String},

                lineup: {
                    starting: {
                        home: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}],
                        away: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}]
                    },

                    sub: {
                        home: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}],
                        away: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}]
                    }

                },


                motm: {type: mongoose.Schema.Types.ObjectId, ref: "Player"},

                timelines: [{
                    time: { time: {type: Number}, et: {type: Number, default: 0}}, 

                    player: {
                        main: {type: mongoose.Schema.Types.ObjectId, ref: "Player"},
                        assist: {type: mongoose.Schema.Types.ObjectId, ref: "Player"},
                    },

                    event: {type: String,  enum: [ 'goal', 'red', "yellow", "sub", ],  },

                    team: {type: String,  enum: [ 'home', 'away'],  },
                


                }], 

                timeline: {
                  
                        goal: {
                            home: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}],
                            away: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}]
                        },
    
                        assist: {
                            home: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}],
                            away: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}]
                        },


                        yellow: {
                            home: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}],
                            away: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}]
                        },
    
                        red: {
                            home: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}],
                            away: [{time: {type: String}, player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}]
                        },

                        sub: {
    
                            home: [{time: {type: String}, in: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}, out: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}],
                            away: [{time: {type: String}, in: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}, out: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}}]
                     
                        },


    
                },

                

          
            },

            
         ]
        }]
}, {
    timestamps: true
})





const Live = mongoose.model('Live', schema)

module.exports = Live
