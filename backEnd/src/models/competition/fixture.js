
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    competition: { type: mongoose.Schema.Types.String,
    },

    year : {type: Number , required: true, } ,


    type : {type: String,  enum: [ 'league', 'cup'],  },

    fixture: [{ matchday: {type: Number, required: true},
               


                      teams: [{
                        
                        home :{type: mongoose.Schema.Types.String, ref: "Team",  },
              
                            homeScore: {type: Number , default: 0}, awayScore: {type: Number , default: 0 },  
              
                            away :{type: mongoose.Schema.Types.String, ref: "Team",  },
                          

                              
                              
                            live : {type: Boolean, default: false }, start : {type: Boolean, default: false },

                                                            
                              time: { now: {type: Number, default: 0}, first: {type: Number , required: true, default: 45}, second: {type: Number , required: true, default: 90},  firstET: {type: Number , required: true, default: 105},  secondET: {type: Number , required: true, default: 120}}, 


                              half : {type: String,  enum: ['full time', 'half time', 'full time AET', 'half time AET', 'live', "upcoming" ],  },


                              day: { date: {type: Date , required: true}, time: {type: String , required: true},},  

                              
                              group: {type: String  },
                              stage : {type: String,  enum: ['knockout', 'group'],  },
              
                              refree: {type: String, }, stadium: {type: String},
              
                              lineup: {
                                  starting: {
                                      home: [{type: mongoose.Schema.Types.ObjectId, ref: "Player", }],
                                      away: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}]
                                  },
              
                                  sub: {
                                      home: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}],
                                      away: [{type: mongoose.Schema.Types.ObjectId, ref: "Player"}]
                                  }
              
                              },
              
              
                              motm: {type: mongoose.Schema.Types.ObjectId, ref: "Player"},
              
                              timeline: [{
                                  time: { time: {type: Number}, et: {type: Number, default: 0}}, 
                                  player: {
                                      main: {type: mongoose.Schema.Types.ObjectId, ref: "Player"},
                                      assist: {type: mongoose.Schema.Types.ObjectId, ref: "Player"},
                                  },
              
                                  action: {type: String,  enum: [ 'goal', 'red', "yellow", "substitution", ],  },
              
                                  team: {type: String,  enum: [ 'home', 'away'],  }, 
                              

                              }], 
              
              
                              
              
                        
                          },
              
                          
                       ]
    }]



}, {
    timestamps: true
})


// Schema.plugin(require('mongoose-autopopulate'));

const Fixture = mongoose.model('Fixture', Schema)

module.exports = Fixture 
