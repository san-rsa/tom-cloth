require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//const OTP = require('../../models/OTP')
const otpGenerator = require("otp-generator");
const User = require('../../models/user')
 const cloudinary = require('../../connection/cloudinary')
 const {auth, role, uploadMiddleware, } = require('../../middleware/mid')
 
const Category = require('../../models/category')
const Cloth = require('../../models/clothes')








    router.patch('/banner/:id' ,  async (req, res, next) => {
        try {

            const update = JSON.parse(req.body.data)
            const file = req.files?.img    
            const imgUrl = []
    

            // await cloudinary.uploader.destroy(data.imgUrl.imgId);

            
            if (req.files) {
                // No file was uploaded
   
                const image = await cloudinary.uploader.upload(
                file.tempFilePath,
                { folder: 'Banner' },
        
              );        
                imgUrl.push({url: image.secure_url,  imgId: image.puplic_id})        
            }
        
        
        
            const save = await Banner.findOneAndUpdate({head: req.params.id}, {
                $set: update, imgUrl: imgUrl[0]
            }, { new: true });
            res.json(save);
            console.log(save, req.body, " updated successfully!");
        } catch (error) {
            return next(error);
        }
    });


    

    
    router.patch('/category/:id' ,  async (req, res, next) => {
        try {

            const update = JSON.parse(req.body.data)
            const file = req.files?.img    
            const imgUrl = []
    

            // await cloudinary.uploader.destroy(data.imgUrl.imgId);

            
            if (req.files) {
                // No file was uploaded
   
                const image = await cloudinary.uploader.upload(
                file.tempFilePath,
                { folder: 'Banner' },
        
              );        
                imgUrl.push({url: image.secure_url,  imgId: image.puplic_id})        
            }
        
        
        
            const save = await Category.findOneAndUpdate({name: req.params.id}, {
                $set: update, imgUrl: imgUrl[0]
            }, { new: true });
            res.json(save);
            console.log(save, req.body, " updated successfully!", imgUrl.url);
        } catch (error) {
            return next(error);
        }
    });







router.patch('/cloth/:id', async (req, res)=> {

    const update = JSON.parse(req.body.data)
    const updatecolor = JSON.parse(req.body.color)
    const updatesize = JSON.parse(req.body.size)
    const updatespecs = JSON.parse(req.body.specs)

    const file = req.files?.img  
      
    

    try {
        const {name, description, gender, age, type,  categoryId,  } = update 
        const imgUrl = []





        console.log(update, updatecolor, updatesize, file)

        if (!name || !type || !available || !description || !gender || !age || !categoryId ) {
            return res.status(403).json({
                success: false,
                message: "All Fields are required",
            });
        }
        const colors = []


        if (req.files) {
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
        }
            console.log(imgUrl, )

            updatecolor.forEach(element => {
                // Object.values(updatecolor)

                colors.push(element.color)

            });


 



        console.log(update, imgUrl, updatesize, updatecolor, Object.values(updatecolor))


        //check if use already exists?


            const save = await Cloth.findOneAndUpdate({name: req.params.id}, {
                $set: update, imgUrl: imgUrl, color: colors, size: updatesize, specs: updatespecs, available
            }, { new: true });
            res.json(save);
            console.log(save, req.body, " updated successfully!", imgUrl.url);

            // res.redirect("/login")

        // return res.status(200).json({
        //     success: true,
        //     db,
        //     message: " created successfully ✅"
           
        // })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : " registration failed"
        })
       
   }  
})
    


router.patch('/news/:id',  async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files?.img  
    const imgUrl = []

     

    try {
        const {head, body}= data



		if (!head || !body ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

    
    if (req.files) {

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'News' },

      );


      imgUrl.push({url: image.secure_url,  imgId: image.public_id})

 
      }
      //  const gg = await News.findOne({head: req.params.id})

        //check if use already exists?
        const save = await News.findOneAndUpdate({head: req.params.id}, {
            $set: data,  imgUrl: imgUrl[0], ref_Region: data.region, ref_Team: data.team
        }, { new: true });
            // res.redirect("/login")

            console.log(data, req.params.id,  save, );
            


           

        return res.status(200).json({
            success: true,
            save,
            message: "successfully ✅"
           
        }) 

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : " registration failed"
        })
       
   }  
})





router.patch('/user/:id' , auth, role(process.env.ADMIN), async (req, res, next) => {
        try {

            const data = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.json(data);
            console.log(data, "user updated successfully!");
        } catch (error) {
            return next(error);
        }
    });




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






module.exports = router;
