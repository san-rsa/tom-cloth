
const mongoose = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({

    regionId: {type: mongoose.Schema.Types.String, ref: "Competition",   },
    

    name: {type: String, required: true, trim: true, unique: true
    },


    bio: {type: String, },
    pictures: [{url: {type: String, }, imgId: {type: String, } }],

    








    views: {type: Number, default: 0 },






}, {
    timestamps: true
})

const Sub_Region  = mongoose.model('Competition_Sub-Region ', Schema)

module.exports = Sub_Region  
