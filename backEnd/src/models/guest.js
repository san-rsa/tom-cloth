const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Schema = new mongoose.Schema({



    name: { first:  {type: String, required: true, trim: true, lowercase: true }, last:  {type: String, required: true, trim: true, lowercase: true },},

    email: {type: String, required: true, unique: true, lowercase: true, trim: true,

        validate( value ) {
            if( !validator.isEmail( value )) {
                throw new Error( 'Email is invalid' )
            }
        }},
        
        
    phone: {type:Number, required: true },


    address: { street: String, city: String, county: String, zipCode: String },

    paymentId: {type: String, },


}, { timestamps: true }
)

     




const Guest = mongoose.model('Guest', Schema)
module.exports = Guest