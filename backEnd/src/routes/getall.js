require('dotenv').config()
const Banner = require('../models/news/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const {auth, role} = require('../middleware/mid')

//const OTP = require('../models/OTP')
const otpGenerator = require("otp-generator");
const User = require('../models/user')
const Wishlist = require('../models/wishlist')
const News = require('../models/news/news')
const Team = require('../models/competition/team')
const Fixture = require('../models/competition/fixture')
const _ = require('lodash')
const Standing = require('../models/competition/standing/standing')
const Result = require('../models/competition/result')
const Codeofconduct = require('../models/news/codesofconduct')
const Live = require('../models/competition/live')
const CupStanding = require('../models/competition/standing/cup')
const Competition = require('../models/competition/competition')
const Stat = require('../models/competition/stats')
const Player = require('../models/competition/player')
const Cloth = require('../models/clothes')
const Order = require('../models/order')
const Cart = require('../models/cart')
const Category = require('../models/category')

// const Product = require('../models/product')
// const Auth = require('../middleware/mid')



  // const User = mongoose.model('User');
  
  // return await User.aggregate([
  //   {
  //     $search: {
  //       index: 'default', // The name of your Atlas search index
  //       wildcard: {
  //         query: `*${searchString}*`, // Wrapping in asterisks enables partial matching
  //         path: { wildcard: '*' },    // Searches across all schema fields
  //         allowAnalyzedField: true
  //       }
  //     }
  //   }
  // ]);



router.get('/banner', async(req, res)=> {

const data = await Banner.find().sort([['updatedAt', 'desc']]);
  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})




router.get('/category', async(req, res)=> {

 const data = await Category.find().sort([['name', 'asc']]);
  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})



router.get('/clothes/category/:id', async(req, res)=> {

  const data = await Cloth.find({type: req.params.id})

   const dd =  await Cloth.aggregate([
    {
      $search: {
        index: 'default', // The name of your Atlas search index
        wildcard: {
          query: `*${req.params.id}*`, // Wrapping in asterisks enables partial matching
          path: { wildcard: '*' },    // Searches across all schema fields
          allowAnalyzedField: true
        }
      }
    }
  ]);

  console.log(dd);
  

  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {

      const data = await Cloth.find({gender: req.params.id})

  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  } 
  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  } }
})


router.get('/clothes', async(req, res)=> {

  const data = await Cloth.find({}) //.sort("title")
  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})

router.get('/clothes/most-view', async(req, res)=> {

  const data = await Cloth.find().sort({views: 'desc'}) //.sort("title")
  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})


router.get('/clothes/most-recent', async(req, res)=> {

  const data = await Cloth.find({}).sort({createdAt: 'desc'}) //.sort("title")
  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})


router.get('/clothes/most-order', async(req, res)=> {

  const data = await Cloth.find({}).sort({ordered: 'desc'})
  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})



router.get('/orders', async(req, res)=> {

    const data = await Order.find() //.sort("name")
    
    if (data.length !== 0) {

      return  res.status(200).json({
       success: true,
      data: data
     })
    }
  
    else {
      return  res.status(404).json({
      success: false,
      data: "not found"
      })
    }
})


router.get('/orders/uncompleted', async(req, res)=> {

    const data = await Order.find({delivered: false}) //.sort("name")
    
    if (data.length !== 0) {

      return  res.status(200).json({
       success: true,
      data: data
     })
    }
  
    else {
      return  res.status(404).json({
      success: false,
      data: "not found"
      })
    }
})



router.get('/orders/completed', async(req, res)=> {

    const data = await Order.find({delivered: true}) //.sort("name")
    
    if (data.length !== 0) {

      return  res.status(200).json({
       success: true,
      data: data
     })
    }
  
    else {
      return  res.status(404).json({
      success: false,
      data: "not found"
      })
    }
})




router.get('/user-cart', auth, async(req, res)=> {  // all

      const user = req.userId

      const data = await Cart.findOne({userId: user}).populate("products.productId", "name img size ")
      
      if (data.length !== 0) {

        return  res.status(200).json({
         success: true,
        data: data
       })
      }
    
      else {
        return  res.status(404).json({
        success: false,
        data: "empty"
        })
      }
})

router.get('/user-orders', auth, async(req, res)=> {  // all

      const user = req.userId

      const data = await Order.find({userId: user})
      
      if (data.length !== 0) {

        return  res.status(200).json({
         success: true,
        data: data
       })
      }
    
      else {
        return  res.status(404).json({
        success: false,
        data: "no order found"
        })
      }
})





router.get('/news', async(req, res)=> {

    const data = await News.find({}).sort([['updatedAt', 'desc']]);
    
    if (data.length !== 0) {

      return  res.status(200).json({
       success: true,
      data: data
     })
    }
  
    else {
      return  res.status(404).json({
      success: false,
      data: "not found"
      })
    }
})




    router.get('/wishlists', auth, async (req, res, next) => {
    
            const user = req.userId
        
    
    
            try {
                const data = await Wishlist.findOne( {userId: user} ).populate("products.productId", "name img size ")
    
                if (data) {
                    
                  res.status(200).json(data);
    
                } else {
                  res.status(404).json("not found");
    
                }
            } catch (error) {
                return next(error);
            }
    })




// user

router.get('/admin', auth,  async(req, res)=> {

  const data = await User.find({role: "admin"})
  
  if (data) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})

router.get('/user', auth, async(req, res)=> {

  const user = await User.find({role: "user"})
  if (user) {
       return  res.status(200).json({
          success: true,
         data: user
        })
} else {
  return  res.status(400).json({
    success: false,
   message: "please try again can't find user"
  })
}

})












module.exports = router;
