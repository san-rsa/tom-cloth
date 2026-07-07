require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt= require('jsonwebtoken')
const otpGenerator = require("otp-generator");
const User = require('../models/user')
const {auth} = require('../middleware/mid')

const _ = require('lodash')

const Wishlist = require('../models/wishlist')
const Category = require('../models/category')
const Cloth = require('../models/clothes')
const Order = require('../models/order')




router.get('/category/:id',  async (req, res, next) => {
  console.log(req.params.id +2);
  


        try {
            const data = await Category.findOne({name: req.params.id})

            if (data) {
                
              res.status(200).json(data);

            } else {
              res.status(404).json("not found");

            }

        } catch (error) {
            res.status(500).json(error);
        }
})



router.get('/cloth/:id',  async (req, res, next) => {
  


        try {
            // const data = await Cloth.findOne({name: req.params.id.replaceAll('-', ' ')})

            const data = await Cloth.findOne({name: req.params.id})



            if (data) {
              data.views +=  1

              data.save();

              res.status(200).json(data);

            } else {
              res.status(404).json("not found");

            }

        } catch (error) {
            res.status(500).json(error);
        }
})





router.get('/order/:id', auth, async (req, res, next) => {


          try {
              const data = await Order.findOne({_id: req.params.id}).populate({path: "products.productId",  model: "Cloth", select: "name img size"})
  
              if (data) {
                
                res.status(200).json(data);
  
              } else {
                res.status(404).json("not found");
  
              }
             } catch (error) {
              res.status(500).json(error);
          }
})



router.get('/admin/order/:id', auth, async (req, res, next) => {


          try {
              const data = await Order.findOne({_id: req.params.id}).populate({path: "products.productId",  model: "Cloth", select: "name img size"}).
              populate({path: "userId", select: "name email phone"}).populate({path: "guestId", select: "name email phone"
})
  
              if (data) {
                
                res.status(200).json(data);
  
              } else {
                res.status(404).json("not found");
  
              }
             } catch (error) {
              res.status(500).json(error);
          }
})



    


router.get('/user', auth, async (req, res, next) => {

        const user = req.userId
    


        try {
            const data = await User.findOne( {_id: user} )

            if (data) {
                
              res.status(200).json(data);

            } else {
              res.status(404).json("not found");

            }
        } catch (error) {
            return next(error);
        }
})


router.get('/user/order-details', auth, async (req, res, next) => {

        const user = req.userId
    


        try {
            const data = await User.findOne( {_id: user} ).select('name email phone address paymentId')

            if (data) {
                
              res.status(200).json(data);

            } else {
              res.status(404).json("not found");

            }
        } catch (error) {
            return next(error);
        }
})

router.get('/user/isloggedin', auth, async (req, res, next) => {

        const user = req.userId
    


        try {
            const data = await User.findOne( {_id: user} )

            if (data) {
                
              res.status(200).json(data);

            } else {
              res.status(404).json("not found");

            }
        } catch (error) {
            return next(error);
        }
})







router.get('/wishlist/:id', auth, async (req, res, next) => {

        const user = req.userId
    


        
        try {
            const data = await Wishlist.findOne( {userId: user} )

            if (data) {

              const indexFound = data.products.findIndex(item => item.productId == req.params.id);

              console.log(req.params.id, indexFound, '00');
              
                

                 if (indexFound == -1 ) {

                return res.status(202).json(false)            }
            //----If quantity of price is 0 throw the error -------
            else if (indexFound !== -1) {
                return res.status(200).json(true)
            }


            } else {
              res.status(404).json("you have no wishlist");

            }
        } catch (error) {
            return next(error);
        }
})
// router.get('/user/:id', auth,  async(req, res)=> {


//   const data = await User.findOne({_id: req.params.id})
  
//    res.status(200).json(data)
// })







module.exports = router;
