const mongoose = require('mongoose');
  

const cartSchema = new mongoose.Schema({

        
        userId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
        },
    
    
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

}, 
{
    timestamps: true
}

)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
















