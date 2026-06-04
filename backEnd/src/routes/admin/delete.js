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
const Sub_Region = require('../../models/competition/competition-location')






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





router.patch('/add-team-to-competition', async (req, res)=> {

    const data = JSON.parse(req.body.data)
     

    try {
        const {competitionId, team, }= data



		if (!team || !competitionId ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

 
      
        //check if use already exists?
        const existingItem = await Competition.findOne({name: competitionId})
        const existingTeam = await Team.findOne({name: team})



        if(!existingItem || !existingTeam){
            return res.status(400).json({
                success: false,
                message: "region or team not found"
            })
        }




        existingItem.teams.pull(existingTeam.name)
        existingTeam.regionId.pull(existingItem.name)





        existingItem.save()
        existingTeam.save()


        console.log(existingItem, existingTeam);
        









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






router.patch('/add-user-to-team', async (req, res)=> {

    const data = JSON.parse(req.body.data)
     

    try {
        const {user, teamId, }= data



        if (!teamId || !user ) {
            return res.status(403).json({
                success: false,
                message: "All Fields are required",
            });
        }

 
      
        //check if use already exists?
        const existingUser = await User.findOne({_id: user})
        const existingTeam = await Team.findOne({name: teamId})



        if(!existingUser || !existingTeam){
            return res.status(400).json({
                success: false,
                message: "region or team not found"
            })
        }


        if(!existingUser.teamId ){
            return res.status(400).json({
                success: false,
                message: "user has no team"
            })
        }


        if(existingTeam.userId.length < 0){
            return res.status(400).json({
                success: false,
                message: "team has no user"
            })
        }
        




        existingUser.teamId = null
        existingUser.role = "user"
        
        existingTeam.userId.pull(existingUser._id)





        existingUser.save()
        existingTeam.save()


        console.log(existingUser, existingTeam);
        









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




