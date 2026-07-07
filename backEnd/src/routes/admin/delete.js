require('dotenv').config()
const User = require('../../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//const OTP = require('../../models/OTP')
 const {auth, role, uploadMiddleware, } = require('../../middleware/mid')
const cloudinary = require('../../connection/cloudinary')

const Cloth = require('../../models/clothes')
const Order = require('../../models/order')
const Category = require('../../models/category')






router.patch('/admin' , auth, role(process.env.ADMIN), async (req, res, next) => {
    try {

        const data = await User.findByIdAndUpdate(req.body.productId, {
            $set: req.body, role: 'user'
        }, { new: true });
        res.json(data);
        console.log(data, "user updated successfully!");
    } catch (error) {
        return next(error);
    }
});









router.patch('/add-user-to-admin', async (req, res)=> {

    const data = JSON.parse(req.body.data)
     

    try {
        const {_id, name }= data



        if (!_id || !name ) {
            return res.status(403).json({
                success: false,
                message: "All Fields are required please try again later",
            });
        }

 
      
        //check if use already exists?
        const existingUser = await User.findOne({_id: _id})



        if(!existingUser){
            return res.status(400).json({
                success: false,
                message: "no user found"
            })
        }
        

        existingUser.role = "user"


        existingUser.save()


        console.log(existingUser, );
        









            // res.redirect("/login")

        return res.status(200).json({
            success: true,
   
            message: "successfully ✅ added"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  
})

 

router.delete('/banner', auth, role(process.env.ADMIN), async (req, res, next) => {
    const id = req.body.productId

    try {

        const data = await Banner.findById(id);

        console.log(data);
        

        await cloudinary.uploader.destroy(data.imgUrl.imgId);

        const del = await Banner.findByIdAndDelete(id)


        res.status(200).json({
            msg: del,
        });
    } catch (error) {
        return next(error);
    }
});



router.delete('/category/:id', auth, role(process.env.ADMIN), async (req, res, next) => {
    // const id = req.body.productId

    try {

        const data = await Category.findById(req.params.id);

        console.log(data);
        

        // await cloudinary.uploader.destroy(data.img.imgId);

        if (data) {
                const del = await Category.findByIdAndDelete(req.params.id)

                        console.log(del);

                      res.status(200).json({
            msg: del,
        });  
        } else {
            
        }



    } catch (error) {
        return next(error);
    }
});

router.delete('/cloth/:id', auth, role(process.env.ADMIN), async (req, res, next) => {
    // const id = req.body.productId

    try {

        const data = await Cloth.findById(req.params.id);

        console.log(data);
        

        // await cloudinary.uploader.destroy(data.img.imgId);

        if (data) {
                const del = await Cloth.findByIdAndDelete(req.params.id)

                        console.log(del);

                      res.status(200).json({
            msg: del,
        });  
        } else {
            
        }



    } catch (error) {
        return next(error);
    }
});






router.delete("/order/:id", auth, async (req, res) => {  // complete order
    const user = req.userId
    const deliver = req.body.deliver


    try {
        const order = await Order.findOne({ _id: req.params.id });
       // let productDetailss = await productById(productId);

             if (!deliver) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--If Cart Exists ----


        if (order) {

            
        console.log( user, order,  "2222" , )


            //----Check if quantity is greater than 0 then add item to items array ----
            if (order.Delivered !== false ) {
               order.Delivered = false
                
            }
            //----If quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                type: "product added",
                msg: "this product has not been delivered "
                })
            }
            const data = await order.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
        }
        //------------ This creates a new cart and then adds the item to the cart that has been created------------
        else {

            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        
            
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});








router.delete('/user/:id', auth, role(process.env.ADMIN), async (req, res, next) => {
    try {
        const data = await User.findByIdAndRemove(req.params.id);
        res.status(200).json({
            msg: data,
        });
    } catch (error) {
        return next(error);
    }
});


// router.delete('/banner/:id', async (req, res, next) => {
//     try {
//         const data = await Banner.findByIdAndRemove(req.params.id);
//         res.status(200).json({
//             msg: data,
//         });
//     } catch (error) {
//         return next(error);
//     }
// });


// router.delete('/banner/:id', async (req, res, next) => {
//     try {
//         const data = await Banner.findByIdAndRemove(req.params.id);
//         res.status(200).json({
//             msg: data,
//         });
//     } catch (error) {
//         return next(error);
//     }
// });

module.exports = router;




