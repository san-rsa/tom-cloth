const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({

    userId : {type: mongoose.Schema.Types.ObjectId,  ref: 'User'
    },

    guestId : {type: mongoose.Schema.Types.ObjectId, ref: 'Guest'
    },

      address: { street: String, city: String, county: String, zipCode: String },

        products: [{
          productId: {type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'productModel' }, // Tells Mongoose to look at the 'itemModel' property
          productModel: {type: String, required: true, }, // Restricts allowed models
    
          sizeId: {type: mongoose.Schema.Types.ObjectId, ref: 'size', required: true },
    
          quantity: {type: Number, required: true, min: 1, default: 1
          },
    
        //   size: {type: String, required: true },
    
    
        //   weight: {type: Number, min: 0, default: 0
        //   },
    
          price: {type: Number, default: 0,
          },
    
          total: {type: Number, default: 0,
          },

          color: {type: String, required: true
          },
    
          productCode: {type: String,
          },
      }],

      totalCost: {type: Number, default: 0, required: true,
        },
    

      stripePaymentIntentId: { 
        type: String, 
        required: true, 
        unique: true // Prevents duplicate orders from webhook retries
      },
      paymentStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'], 
        default: 'pending' 
      },

  expireAt: { type: Date, default: undefined },


      Delivered: {type: Boolean, default: false,  },
}, {
    timestamps: true
})


orderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });


const Order = mongoose.model('Order', orderSchema)

module.exports = Order