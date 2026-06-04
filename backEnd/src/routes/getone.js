require('dotenv').config()
const Banner = require('../models/news/banner')
const express = require('express')
const router = express.Router()
const jwt= require('jsonwebtoken')
const otpGenerator = require("otp-generator");
const User = require('../models/user')
const {auth} = require('../middleware/mid')
const Fixture = require('../models/competition/fixture')
const Result = require('../models/competition/result')
const _ = require('lodash')
const CupStanding = require('../models/competition/standing/cup')
const Competition = require('../models/competition/competition')
const Codeofconduct = require('../models/news/codesofconduct')
const News = require('../models/news/news')
const Live = require('../models/competition/live')
const Player = require('../models/competition/player')
const Team = require('../models/competition/team')
const Sub_Region = require('../models/competition/competition-location')
const Stat = require('../models/competition/stats')





router.get('/banner/:id',  async (req, res, next) => {
  console.log(req.params.id +2);
  


        try {
            const data = await Banner.findOne({head: req.params.id})

            if (data) {
                
              res.status(200).json(data);

            } else {
              res.status(404).json("not found");

            }

        } catch (error) {
            res.status(500).json(error);
        }
})


router.get('/code-of-conduct/:id', async (req, res, next) => {


      try {
          const data = await Codeofconduct.findOne({title: req.params.id})


          if (data) {
                
            res.status(200).json(data);

          } else {
            res.status(404).json("not found");

          }

      } catch (error) {
          res.status(500).json(error);
      }
})







router.get('/competition/:id', async (req, res) => {


      try {
          const data = await Competition.findOne({name: req.params.id})

          if (data) {
                
            res.status(200).json(data);

          } else {
            res.status(404).json("not found");

          }
      } catch (error) {
          res.status(500).json(error);
      }
})

router.get('/sub-competition/:id', async (req, res) => {


  try {
      const data = await Sub_Region.findOne({name: req.params.id})

      if (data) {
            
        res.status(200).json(data);

      } else {
        res.status(404).json("not found");

      }
  } catch (error) {
      res.status(500).json(error);
  }
})






  

router.get('/:link/fixture/:id/', async(req, res)=> {


        const { link, id, } = req.params
           
        const data = {}
        
         const db = await Fixture.findOne({competition: link }).sort({year: 'desc'})
         .populate("fixture.teams.home", "name logo").populate("fixture.teams.away", "name logo")
         .populate("fixture.teams.lineup.starting.home", "name picture position" ).populate("fixture.teams.lineup.sub.home", "name picture position" )
         .populate("fixture.teams.lineup.starting.away", "name picture position" ).populate("fixture.teams.lineup.sub.away", "name picture position" )
         .populate("fixture.teams.motm", "name picture position" )
         .populate("fixture.teams.timeline.player.main", "name" ).populate("fixture.teams.timeline.player.assist", "name" )

         
    
          
        for (let i = 0; i < db.fixture.length; i++) {
    
            const Foundmatch = db.fixture[i].teams.findIndex(item => item._id == id);
    
          if (Foundmatch !== -1 ) {
            
        data.info = {competition: db.competition, year: db.year, matchday: db.fixture[i].matchday, type: db.type } 
        data.match = db.fixture[i].teams[Foundmatch]



          }
        }
    
    
              res.status(200).json(data)
})




router.get('/:link/result/:id/', async(req, res)=> {


  const { link, id, } = req.params
     
  const data = {}
  
   const db = await Result.findOne({competition: link }).sort({year: 'desc'})
   .populate("result.teams.home", "name logo").populate("result.teams.away", "name logo")
   .populate("result.teams.lineup.starting.home", "name picture position" ).populate("result.teams.lineup.sub.home", "name picture position" )
   .populate("result.teams.lineup.starting.away", "name picture position" ).populate("result.teams.lineup.sub.away", "name picture position" )
   .populate("result.teams.motm", "name picture position" )
   .populate("result.teams.timeline.player.main", "name" ).populate("result.teams.timeline.player.assist", "name" )

   

    
  for (let i = 0; i < db.result.length; i++) {

      const Foundmatch = db.result[i].teams.findIndex(item => item._id == id);

    if (Foundmatch !== -1 ) {
      
  data.info = {competition: db.competition, year: db.year, matchday: db.result[i].matchday, type: db.type } 
  data.match = db.result[i].teams[Foundmatch]



    }
  }


        res.status(200).json(data)
})




router.get('/news/:id', async (req, res, next) => {


          try {
              const data = await News.findOne({head: req.params.id})
  
              if (data) {
                
                res.status(200).json(data);
  
              } else {
                res.status(404).json("not found");
  
              }
             } catch (error) {
              res.status(500).json(error);
          }
})


router.get('/player/:id', async(req, res)=> {


      

        try {



        const name = req.params.id.split(" ");

        const fullname = {first: name[0], last: name[1] }


         const data = await Player.findOne({name: fullname}) //.sort("title")

        if (data) {
                
          res.status(200).json(data);

        } else {
          res.status(404).json("not found");

        }
        } catch (error) {

            res.status(500).json(error);

          }
        
})


router.get('/:link/stats/player/:id/:year', async(req, res)=> {


  const {link, year, id } = req.params

    const data = await Stat.findOne({competition: link, year}) ? await Stat.findOne({competition: link, year}) :  await Stat.findOne({ competition: link, }).sort({year: 'desc'})
 
       const found = data.stats.findIndex(item => item.player == String(id) );

       if (found == -1) {
                
       return  res.status(404).json({
        success: false,
       data: "no stat found"
      })
       } else if (found !== -1) {
        
                
       return  res.status(200).json({
        success: true,
       data: data.stats[found]
      })
       }

 
})



router.get('/team/:id', async(req, res)=> {

                  

                  try {
                    const data = await Team.findOne({name: req.params.id})//.populate("playerId") //.sort("title")


                    
                    if (data) {
                
                      res.status(200).json(data);
        
                    } else {
                      res.status(404).json("not found");
        
                    }
                  } catch (error) {
                      res.status(500).json(error )
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



router.get('/user/:id', auth,  async(req, res)=> {


  const data = await User.findOne({_id: req.params.id})
  
   res.status(200).json(data)
})







module.exports = router;
