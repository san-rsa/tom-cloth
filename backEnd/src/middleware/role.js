const User = require("../models/user")


// const authorizeUser = (requiredRole) =>  (req, res, next) => {
//     try {
//       const user =  User.findById(req.userId);
      
//       if (user.role !== requiredRole) {
//         return res.status(403).json({ error: 'Forbidden' });
//       }
      
//       next();
//     } catch (error) {
//       console.error('Error authorizing user:', error);
//       res.status(500).json({ error: 'An error occurred while authorizing the user' });
//     }
//   };

//   module.exports = authorizeUser


  const jwt = require('jsonwebtoken')
require('dotenv').config()

//auth, isSTudent, isAdmin


exports.auth = (req,res,next)=>{
    try {
        //extract JWT token
        const token = req.body.token || req.cookies.token
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode
            console.log(req.user)
        } catch (error) {
            return res.status(401).json({
                success:false,
                message: "invalid Token ⚠️"
            })
        }

        next()

    } catch (error) {
        return res.status(401).json({
            success:false,
            message: "Error Occured in Authentication ⚠️"
        })
    }
}

exports.isStudent = (req,res,next)=>{
    try {
        console.log(req.user)
        if(req.user.role !=="Student"){
            return res.status(401).json({
                success:false,
                message: "You are not authorized Student⚠️"
            })
        }

        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Something error occured⚠️: "+error
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    try {
        if(req.user.role !=="Admin"){
            return res.status(401).json({
                success:false,
                message: "You are not authorized Admin⚠️"
            })
        }

        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Something error occured⚠️: "+error
        })
    }
}