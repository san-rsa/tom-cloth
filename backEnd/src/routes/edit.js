const express = require("express");
const router = new express.Router();
const Wishlist = require("../models/wishlist");
const User = require("../models/user");

const {auth} = require("../middleware/mid")






router.patch('/user', auth, async (req, res)=> {

    const user = req.userId
    try {

        const update = {};
        for (const key of Object.keys(req.body)){
            if (req.body[key] !== '') {
                update[key] = req.body[key];
            }
        }
        User.findOneAndUpdate({_id: user}, {$set: update}, {new: true}).then( async (data) => {
                console.log("success");
         
                        return res.status(200).json({
            success: true,
            data: data,
            message: "user edited successfully ✅"
           
        }) 
        })


 
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "User edit failed"
        })
       
   }  
})
























module.exports = router;