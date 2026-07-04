require('dotenv').config()
const User = require('../../models/user')
const Banner = require('../../models/news/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//const OTP = require('../../models/OTP')
 const {auth, role, uploadMiddleware, deleteFixture, updateStanding, updateCupStanding, firstHalf} = require('../../middleware/mid')
const cloudinary = require('../../connection/cloudinary')
const News = require('../../models/news/news')
const Competition = require('../../models/competition/competition')
const Team = require('../../models/competition/team')
const Player = require('../../models/competition/player')
const Fixture = require('../../models/competition/fixture')
const Result = require('../../models/competition/result')
const Standing = require('../../models/competition/standing/standing')
const Codeofconduct = require('../../models/news/codesofconduct')
const CupStanding = require('../../models/competition/standing/cup')
const Live = require('../../models/competition/live')




const Cloth = require('../../models/clothes')
const Category = require('../../models/category')
const Order = require('../../models/order')













 router.patch('/toadmin', auth, role(process.env.ADMIN), async (req, res, next) => {
    try {

        const data = await User.findByIdAndUpdate(req.body.productId, {
            $set: req.body, role: 'admin'
        }, { new: true });
        res.json(data);
    } catch (error) {
        return next(error);
    }
});





 



router.post('/banner',  async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {head, body}= data
        const imgUrl = []

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Banner' },

      );


      imgUrl.push({url: image.secure_url,  imgId: image.public_id})

 
      


        console.log(data)

		if (!head || !imgUrl ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await Banner.findOne({head})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "banner already exists"
            })
        }

        const banner = await Banner.create({
            head, body, imgUrl: imgUrl[0]
        })
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            banner,
            message: "banner created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "banner registration failed"
        })
       
   }  
})




router.post('/cloth', async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const color = JSON.parse(req.body.color)
    const size = JSON.parse(req.body.size)
    const specs = JSON.parse(req.body.specs)


    const file = req.files?.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }      
    

    try {
        const {name, description, gender, age, type,  categoryId, available, } = data
        const imgUrl = []





        console.log(data, color, size, file, specs, )

		if (!name || !type, !description || !gender || !age || !categoryId || !available ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


          if (file.length > 1) {
    
                for (const i in file){
                  const image = await cloudinary.uploader.upload(
                    file[i].tempFilePath,
                    { folder: 'Product' },
    
                );
    
                imgUrl.push({url: image.secure_url,  imgId: image.public_id})
                console.log(image);
                }
              
                
          } else {
    
                 const image = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'Product' },
    
          );
    
    
            imgUrl.push({url: image.secure_url,  imgId: image.public_id})
    
                          console.log(image)
    
    
          }
            console.log(imgUrl, )


 



        console.log(data, imgUrl, size, color, )


        const colors = []


         color.forEach(element => {
                // Object.values(updatecolor)

                colors.push(element.color)

            });
        //check if use already exists?
        const existingItem = await Cloth.findOne({name})

        if(existingItem){
            return res.status(400).json({
                success: false,
                message: " already exists"
            })
        }

        const db = await Cloth.create({
           name, description, type, available, categoryId, img: imgUrl, gender, age, type, color: colors, size, specs
        })
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            db,
            message: " created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : " registration failed"
        })
       
   }  
})


router.post('/category',  async (req, res)=> {

     const data = JSON.parse(req.body.data)
        const file = req.files.img 

    console.log(file);
            
        if (!req.files) {
            // No file was uploaded
            return res.status(400).json({ error: "No file uploaded" });
          }
         

    try {
            const {name}= data
            const imgUrl = []
    
            const image = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'Category' },
          );
    
    
          imgUrl.push({url: image.secure_url,  imgId: image.public_id})
    
                          console.log(image)
    
    
        
        // Check if All Details are there or not

        if (!name || !imgUrl) {
            return res.status(403).json({
                success: false,
                message: "All Fields are required",
            });
        }

        //check if use already exists?
        const existingItem = await Category.findOne({name})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "category  already exists"
            })
        }

        console.log(imgUrl);
        



        const cat = await Category.create({
            name, slug: name, imgUrl: imgUrl[0]
        })
        

        return res.status(200).json({
            success: true,
            cat,
            message: "category  created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "category  registration failed"
        })
       
   }  
})



router.post("/order/:id", auth, async (req, res) => {  // complete order
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
            if (order.Delivered !== true ) {
               order.Delivered = true
                
            }
            //----If quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                type: "product added",
                msg: "you have this product in your delivered"
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


router.post('/add-user-to-admin', async (req, res)=> {

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
        

        existingUser.role = process.env.ADMIN


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







module.exports = router;
