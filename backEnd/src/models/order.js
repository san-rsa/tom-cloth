const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({

    userId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },

    guestId : {type: mongoose.Schema.Types.ObjectId, ref: 'Guest'
    },

    products: [{
      productId: {type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'productModel' }, // Tells Mongoose to look at the 'itemModel' property
      productModel: {type: String, required: true, }, // Restricts allowed models

      sizeId: {type: mongoose.Schema.Types.ObjectId, ref: 'size', required: true },

    //   name: {type: String, required: true
    //   },

      quantity: {type: Number, required: true, min: 1, default: 1
      },

      size: {type: String, required: true },


      weight: {type: Number, min: 0, default: 0
      },

      price: {type: Number, default: 0,
      },

      total: {type: Number, default: 0,
      },

      productCode: {type: String,
      },
  }],

      totalCost: {type: Number, default: 0, required: true,
        },
    

      // address: {type: String, required: true,
      // },

       transactionId: {type: String, required: true,
       },

       paymentStatus: {type: String, required: true,
       },

      Delivered: {type: Boolean, default: false,  },
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order