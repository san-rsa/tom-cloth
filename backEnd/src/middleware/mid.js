let middlewareObject = {};
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());


const jwt = require('jsonwebtoken')
const User = require('../models/user')
//a middleware to check if a user is logged in or not

const cloudinary = require("../connection/cloudinary");

const { io } = require("../../server");

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')



function send_mail(guest, data, send_email) {
                
                const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  type: 'gmail',
                  user: process.env.EMAIL,
                  pass: process.env.PASS_EMAIL
               }
              });
              
              const handlebarOptions = {
                  viewEngine: {
                      partialsDir: path.resolve('./email'),
                      defaultLayout: false,
                  },
                  viewPath: path.resolve('./email'),
              };
              
              
              const handlebarOptions2 = {
                viewEngine: {
                  // extname: '.hbs',
                  layoutsDir: path.resolve('./email'),
                  defaultLayout: false,
                  partialsDir: path.resolve('./email'),
                },
                viewPath: path.resolve('./email'),
                // extName: '.hbs',
              };
     
              // use a template file with nodemailer
              transporter.use('compile', hbs(handlebarOptions))



              const mailOptions = {
                from: process.env.EMAIL,
                to: process.env.EMAIL,
                subject: 'NEW ORDER AVAILABLE',
                template: "email",
                
                context: {
                          address: guest.address, fname: guest.name.first, 
                          lname: guest.name.last, email:guest.email, 
                          phone: guest.phone, products: send_email, total:data.totalCost,
                          fullname: guest.name.first + " " + guest.name.last, 
                },
              
                // html: ,
                
              
                // attachments: [{ filename: "id card", path: file?.tempFilePath}, {filename: "signature", path: signature }],
              
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
              
                  
                          return res.status(200).json({
                              success: true,
                              message: " created successfully ✅"
                             
                          }) 
                }
              });
              }



const auth = async (req, res, next)  =>  {
  const token = await req.cookies.user;

  try {

      if (!token) {
     res.sendStatus(403).clearCookie("user");
     next()
  } else { 
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
     next();
  }
  } catch {
    // res.sendStatus(403);
  }
};





const role =  (role)  => async (req, res, next) => {


  try {
    const user = await  User.findOne({_id: req.userId})

    
    if (user.role !== role) {
      return res.status(403).json({ error: 'Forbidden no acces' });
    }
    
   return next();
  } catch (error) {
    console.error('Error authorizing user:', error);
    res.status(500).json({ error: 'An error occurred while authorizing the user' });
  }

}




module.exports = {  auth, role, send_mail, };