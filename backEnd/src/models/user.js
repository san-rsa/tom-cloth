const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({



    name: { first:  {type: String, required: true, trim: true, lowercase: true }, last:  {type: String, required: true, trim: true, lowercase: true },},

    username: {type: String, required: true, unique: true, trim: true, }, 


    email: {type: String, required: true, unique: true, lowercase: true, trim: true,

        validate( value ) {
            if( !validator.isEmail( value )) {
                throw new Error( 'Email is invalid' )
            }
        }},

    imgUrl: {url: {type: String}, imgId: {type: String} },


    password: {type: String, required: true, minLength: 8,

        validate(value) {
            if( value.toLowerCase().includes('password')) {
                throw new Error('password musn\'t contain password')
            }
        }},

        paymentId: {type: Object,
        },
        
        
    phone: {type:Number},


    // tokens: [{ token: {type: String, required: true }}],

    // address: {type: String,  },

    // paymentId: {type: String, required: true,
    // },

   teamId: {type: mongoose.Schema.Types.String, ref: "Team", },



    role: { type: String, enum: ['user', process.env.ADMIN, process.env.TEAM], default: 'user' }
}, { timestamps: true }
)




//Generate auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const payload ={
        id: user._id.toString(),
    }


    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
    // user.tokens = user.tokens.concat({token})
    //  await user.save()
    return token
}





     
userSchema.pre('save', async function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();


    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});



userSchema.pre('findOneAndUpdate', async function (next) {
    const user = this;
    if (user._update?.$set?.password) {
      user._update.$set.password = await bcrypt.hash(user._update.$set.password, 10);
    }
    next();
  });


userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
     




const User = mongoose.model('User', userSchema)
module.exports = User