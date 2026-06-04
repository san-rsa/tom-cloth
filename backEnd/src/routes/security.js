require('dotenv').config()
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const bycrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const cloudinary = require('../connection/cloudinary')
const {auth, role} = require("../middleware/mid")
const nodemailer = require("nodemailer");






router.post('/register', async(req, res)=> {
    try {

      const data = JSON.parse(req.body.data)
      const file = req.files.img 
      const imgUrl = [] 
        
      const {fname, lname, email, password, phone, username,}= data

      const fullname = {first: fname, last: lname}

      if (!req.files) {
          // No file was uploaded
          return res.status(400).json({ error: "No file uploaded" });
        }

        console.log(fname, lname, email, password, phone, username);
        

        // Check if All Details are there or not

		if (!fname || !lname || !email || !password ) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}


        //check if use already exists?
        const existingUser = await  User.findOne( { $or: [ {'email': email}, {'name':fullname}, {'username':username} ]}, );
           // User.findOne({ $or: [ {email, name: fullname, username }]} )


        console.log(existingUser);
        

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }



        const image = await cloudinary.uploader.upload(
          file.tempFilePath,
          { folder: 'user' },
  
        );
  
        imgUrl.push({url: image.secure_url,  imgId: image.public_id})
  
  


        const user = await User.create({
            name: fullname, email, password, phone, username, imgUrl: imgUrl[0]
        })

        user.save()
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            user,
            message: "user created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "User registration failed"
        })
       
   }  
})




router.post('/login', async(req, res)=> {



    try {
        //data fetch
        const data = JSON.parse(req.body.data)

        const {email, password} = data
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "Plz fill all the details"
            })
        }
        console.log(email, password)

        //check for registered User
        let user= await User.findOne( { $or: [ {'email': email},  {'username':email} ]}, );
        //if user not registered or not found in database
        if(!user){
            return res.status(401).json({
                success: false,
                message: "You have to Signup First no user round"
            })
        }

        const passwordMatch = await user.comparePassword(password);

            console.log(passwordMatch, );

        if (!passwordMatch) {
          return res.status(401).json({success: false, message: 'Incorrect password ⚠️' });
        }
   
        




          if (passwordMatch == true) {
            const token = await user.generateAuthToken()
 

            // const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "5h"});
    
    
    
                 console.log(token);
    
                const options = {
                    expires: new Date(Date.now() + 86400000), 
                    maxAge:   86400000, //10 * 24 * 60 * 60 * 1000,
                    httpOnly: true,  //It will make cookie not accessible on clinet side -> good way to keep hackers away
                  //  secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                  //   domain: 'https://footbal-alpha.vercel.app',

			// sameSite: 'strict' ,

			
                    	// domain: 'footbal-alpha',

			// domain: 'footbal-alpha.vercel.app',


    				path: "/",
   				 secure: true,
    
                }
                console.log(password, process.env.JWT_SECRET, token); 

              return  res.cookie("user", token, options
                ).status(200).json({
                    success: true,
                    token,
                    message: "Logged in Successfully✅"
    
                })
    
          } else {
    
            res.status(403).json({
                success: false,
              
                message: "incorect password "
          })
        }
 


    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Login failure⚠️ :" + error
        })
    }

})




router.get("/autoLogin", (req, res, next) => {
    const cookies = req.cookies.user //req.headers.cookie;
  
    // if we received no cookies then user needs to login.
    if (!cookies || cookies === null) {
      
      return res.sendStatus(401);
    }

    else {
      if (cookies) {
          return res.sendStatus(200);

    } 
  }
  
  });











  router.get("/logout", auth, (req, res) => {

    return res
      .clearCookie("user")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  })







  router.post("/forgetpassword", async (req, res) => {
    try {


      // Find the user by email
      const user = await User.findOne({ email: req.body.email });
        console.log( req.body.email, user);

      // If user not found, send error message
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Generate a unique JWT token for the user that contains the user's id
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: "10m",});
  
      // Send the token to the user's email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

              console.log(token,);
  
      // Email configuration
      const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: "sanuthrahman@gmail.com", //req.body.email,
        subject: "Reset Password",
        html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="${process.env.ORIGIN}/reset-password/${token}">${process.env.ORIGIN}/reset-password/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
      };



      // Send the email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Email sent" });
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });








  router.post("/reset-password/:token", async (req, res) => {

    try {
      // Verify the token sent by the user
      const decodedToken = jwt.verify(
         req.params.token,
        process.env.JWT_SECRET
      );
  
      // If the token is invalid, return an error
      if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
      }


      // find the user with the id from the token
      // const user =  User.findOneAndUpdate({ _id: decodedToken.userId }, {password: req.body.newPassword},  {new: true} );
      // if (!user) {
      //   return res.status(401).send({ message: "no user found" });
      // }


      const user = await User.findOne({ _id: decodedToken.userId });
      if (!user) {
        return res.status(401).send({ message: "no user found" });
      }
      
      // Hash the new password
      const salt = await bycrypt.genSalt(10);
      req.body.newPassword = await bycrypt.hash(req.body.newPassword, salt);
  
      // Update user's password, clear reset token and expiration time
      user.password = req.body.newPassword;
      await user.save();


      const reset = (req.params.token)

      console.log('decodedToken',)
                return res.status(200)
               .clearCookie("*")
                .json({
            success: true,
            data: reset,
            message: "user edited successfully ✅"
   
})
  

      // Send success response
      res.status(200).send({ message: "Password updated" });
     // res.redirect("/login")
    } catch (err) {
      // Send error response if any error occurs
      res.status(500).send({ message: err.message });
    }
  });


module.exports = router;
