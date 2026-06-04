require('dotenv').config()
const Banner = require('../models/news/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const {auth, role} = require('../middleware/mid')

//const OTP = require('../models/OTP')
const otpGenerator = require("otp-generator");
const User = require('../models/user')
const Wishlist = require('../models/wishlist')
const News = require('../models/news/news')
const Team = require('../models/competition/team')
const Fixture = require('../models/competition/fixture')
const _ = require('lodash')
const Standing = require('../models/competition/standing/standing')
const Result = require('../models/competition/result')
const Codeofconduct = require('../models/news/codesofconduct')
const Live = require('../models/competition/live')
const CupStanding = require('../models/competition/standing/cup')
const Competition = require('../models/competition/competition')
const Stat = require('../models/competition/stats')
const Player = require('../models/competition/player')
const Sub_Region = require('../models/competition/competition-location')

// const Product = require('../models/product')
// const Auth = require('../middleware/mid')




router.get('/banner', async(req, res)=> {

const data = await Banner.find().sort([['updatedAt', 'desc']]);
  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})


router.get('/code-of-conduct', async(req, res)=> {

  const data = await Codeofconduct.find({}) //.sort("title")
  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})




router.get('/competition', async(req, res)=> {

    const data = await Competition.find().sort("name")
    
    if (data.length !== 0) {

      return  res.status(200).json({
       success: true,
      data: data
     })
    }
  
    else {
      return  res.status(404).json({
      success: false,
      data: "not found"
      })
    }
})


router.get('/sub-competition', async(req, res)=> {  // all

      const data = await Sub_Region.find().sort("name")
      
      if (data.length !== 0) {

        return  res.status(200).json({
         success: true,
        data: data
       })
      }
    
      else {
        return  res.status(404).json({
        success: false,
        data: "not found"
        })
      }
})


router.get(':link/sub-competition', async(req, res)=> {  // all in d region

  const data = await Sub_Region.find({regionId: req.params.link}).sort("name")
  

  if (data) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})




router.get('/:link/fixtures/', async(req, res)=> { // all in d region


 const {link, } = req.params

 
  const data = await Fixture.findOne({competition: link,}).sort({year: 'desc'}).populate("fixture.teams.home", "name logo").populate("fixture.teams.away", "name logo")

   if (data) {
       const sort = _.sortBy(data.fixture, ['matchday']);
   data.fixture = sort
   
         return  res.status(200).json({
          success: true,
         data: data
        })
  }

  else {
    return  res.status(404).json({
      success: false,
     data: "not found"
    })
  }
   


})



router.get('/team/:id/fixtures', async(req, res)=> { // all in d region  team


  const { id} = req.params
 
  const data = []
  
   const year = await Fixture.findOne().sort({year: 'desc'})
   console.log(year);
   

   if (year) {
    const team = await  Team.findOne({name: id})
    
     const db = await Fixture.find({year: year.year}).sort('name').populate("fixture.teams.home", "name logo" ).populate("fixture.teams.away", "name logo")
    


         for (let x = 0; x < db.length; x++) {
   
           for (let i = 0; i < db[x].fixture.length; i++) {
   
             const Foundmatch = db[x].fixture[i].teams.findIndex(item => item.home._id == String(team._id) || item.away._id == String(team._id));
       
             if (Foundmatch !== -1 ) {
       
               data.push({
                 regionId: db[x].competition,
                 matchday: i + 1,
                 match: db[x].fixture[i].teams[Foundmatch]
               })
             }
       
           }
   
         }

   } 

        if (data) {

                const latest = _.orderBy(data, [item =>  item.match.day.date, item =>  item.match.day.time, ],);



          return  res.status(200).json({
           success: true,
          data: latest
         })
        }

        else {
          return  res.status(404).json({
          success: false,
          data: "not found"
          })
        }
   
        
})



router.get('/:link/stats/team/:id/:type/:year', async(req, res)=> {


      const {link, year, type, id } = req.params
    
        const db = await Stat.findOne({competition: link, year}) ? await Stat.findOne({competition: link, year}).populate("stats.player") :  await Stat.findOne({ competition: link, }).sort({year: 'desc'}).populate("stats.player")
        const data = []


        for (let i = 0; i < db.stats.length; i++) {
          const element = db.stats[i];

          if (element.team == id) {
            data.push(element)
          }
          
        }

           if (!data ) {
                    
           return  res.status(404).json({
            success: false,
           data: "no stat found"
          })
           } else if (data) {


            const sort = _.orderBy(data, [item =>  item[type], ], ['desc', ]);

            db.stats = sort
            
                    
           return  res.status(200).json({
            success: true,
           data: db
          })
           }

      

     
    })


router.get('/:link/stats/:type/:year', async(req, res)=> {


  const {link, year, type } = req.params

    const data = await Stat.findOne({competition: link, year}) ? await Stat.findOne({competition: link, year}).populate("stats.player") :  await Stat.findOne({ competition: link, }).sort({year: 'desc'}).populate("stats.player")
 
 
    if (data) {
        const sort = _.orderBy(data.stats, [item =>  item[type], ], ['desc', ]);


       data.stats = sort
      return  res.status(200).json({
       success: true,
      data: data
     })
    }
  
    else {
      return  res.status(404).json({
      success: false,
      data: "not found"
      })
    }
 
})






router.get('/players', async(req, res)=> {

        const data = await Player.find({}) //.sort("title")
        if (data.length !== 0) {

          return  res.status(200).json({
           success: true,
          data: data
         })
        }
      
        else {
          return  res.status(404).json({
          success: false,
          data: "not found"
          })
        }
})



router.get('/players/:team', async(req, res)=> {

          const team = await Team.findOne({name: req.params.team}) 



          const data = await Player.find({teamId: team.name}).sort("name.first")

          if (data.length !== 0) {

            return  res.status(200).json({
             success: true,
            data: data
           })
          }
        
          else {
            return  res.status(404).json({
            success: false,
            data: "not found"
            })
          }
})





router.get('/news', async(req, res)=> {

    const data = await News.find({}).sort([['updatedAt', 'desc']]);
    
    if (data.length !== 0) {

      return  res.status(200).json({
       success: true,
      data: data
     })
    }
  
    else {
      return  res.status(404).json({
      success: false,
      data: "not found"
      })
    }
})





router.get('/news/team/:id', async(req, res)=> {

      const data = await News.find({ref_Team: req.params.id}).sort([['updatedAt', 'desc']]);
      
      if (data.length !== 0) {

        return  res.status(200).json({
         success: true,
        data: data
       })
      }
    
      else {
        return  res.status(404).json({
        success: false,
        data: "not found"
        })
      }
})


router.get('/news/region/:id', async(req, res)=> {

        const data = await News.find({ref_Region: req.params.id}).sort([['updatedAt', 'desc']]);
        
        if (data.length !== 0) {

          return  res.status(200).json({
           success: true,
          data: data
         })
        }
      
        else {
          return  res.status(404).json({
          success: false,
          data: "not found"
          })
        }
})















router.get('/:link/results/:year', async(req, res)=> {


  const {link, } = req.params

  const year = req.params.year

  console.log(year);
  
    const data = await Result.findOne({competition: link, year: year, })
    ? await Result.findOne({competition: link, year: year, }).populate("result.teams.home", "name logo").populate("result.teams.away", "name logo")
    :    await Result.findOne({competition: link, }).sort({year: 'desc'}).populate("result.teams.home", "name logo").populate("result.teams.away", "name logo")

  
   // const data = await Result.findOne({competition: link, year: year, }).populate("result.teams.home", "name logo").populate("result.teams.away", "name logo")
 
    if (data) {

        const sort = _.sortBy(data.result, ['matchday'], ['desc', ]);
       data.result = sort

    return  res.status(200).json({
      success: true,
     data: data
    })
  
   }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
    

 
 })

 

router.get('/team/:id/results/:year', async(req, res)=> { // all in d region  team


  const {year, id} = req.params
 
  const data = []
  
   const yearDb = await Result.findOne().sort({year: 'desc'})
   


    const team = await  Team.findOne({name: id})
    
     const db = await( (await Result.find({year: year})).length !== 0) ? await Result.find({year: year}).populate("result.teams.home", "name logo" ).populate("result.teams.away", "name logo") : await Result.find({year: yearDb.year}).populate("result.teams.home", "name logo" ).populate("result.teams.away", "name logo")



       console.log(db, year, yearDb.year);



         for (let x = 0; x < db.length; x++) {
   
           for (let i = 0; i < db[x].result.length; i++) {
   
             const Foundmatch = db[x].result[i].teams.findIndex(item => item.home._id == String(team._id) || item.away._id == String(team._id));
       

             if (Foundmatch !== -1 ) {
       
               data.push({
                 regionId: db[x].competition,
                 matchday: i + 1,
                 match: db[x].result[i].teams[Foundmatch]
               })
             }
       
           }
   
         }

   

        if (data) {

                const latest = _.orderBy(data, [item =>  item.match.day.date, item =>  item.match.day.time, ],);



          return  res.status(200).json({
           success: true,
          data: latest
         })
        }

        else {
          return  res.status(404).json({
          success: false,
          data: "not found"
          })
        }
   
        
})




router.get('/:link/standing/:year', async(req, res)=> {

  const {year, link} = req.params

  const region = await Competition.findOne({name: link,})

  if (region.type == "league") {
   const data = await Standing.findOne({competition: link, year}) ? await Standing.findOne({competition: link, year}).populate("standing.teams") : await Standing.findOne({competition: link,}).sort({year: 'desc'}).populate("standing.teams")
  
    if (data) {

      const sort = _.orderBy(data.standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);

      data.standing = sort
      data.type = region.type

   
          res.status(200).json({
             success: true,
            data: data
           })


      
    } else {
   
          return  res.status(404).json({
          success: false,
          data: "not found"
          })
        
    }

    
  } 
  
  else if (region.type == "cup") {
    const data = await CupStanding.findOne({competition: link, year}) ? await CupStanding.findOne({competition: link, year}).populate("group.standing.teams") : await CupStanding.findOne({competition: link, }).sort({year: 'desc'}).populate("group.standing.teams")


    const groups = []
    
   
     if (data) {
  
       const sort = _.orderBy(data.group, [item =>  item.group, ], ['asc'], );
 
 
       for (let i = 0; i < sort.length; i++) {
           
         const {group, standing} = sort[i]
      
        const stand =  _.orderBy(standing, [item =>  item.stats.points, item =>  item.stats.gd, item =>  item.stats.gs, item =>  item.stats.ga], ['desc', 'desc', 'desc', 'asc']);

         groups.push({group, standing: stand})

       }
    
           data.group =  groups
      
           res.status(200).json({
              success: true,
             data: data
            })
 
 
       
     } else {

      return  res.status(404).json({
      success: false,
      data: "not found"
      })
    
     }
  }
  

 

})



router.get('/teams', async(req, res)=> {

  const data = await Team.find().sort("name")
  
  if (data.length !== 0) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
  })






  router.get('/teams/:id', async(req, res)=> {

    const data = await Team.find({regionId: req.params.id}).sort("name")
    if (data.length !== 0) {

      return  res.status(200).json({
       success: true,
      data: data
     })
    }
  
    else {
      return  res.status(404).json({
      success: false,
      data: "not found"
      })
    }
    })









// user

router.get('/admin', auth,  async(req, res)=> {

  const data = await User.find({role: "admin"})
  
  if (data) {

    return  res.status(200).json({
     success: true,
    data: data
   })
  }

  else {
    return  res.status(404).json({
    success: false,
    data: "not found"
    })
  }
})

router.get('/user', auth, async(req, res)=> {

  const user = await User.find({role: "user"})
  if (user) {
       return  res.status(200).json({
          success: true,
         data: user
        })
} else {
  return  res.status(400).json({
    success: false,
   message: "please try again can't find user"
  })
}

})



router.get('/user/team/:id', auth, async(req, res)=> {

  const user = await User.find({teamId: req.params.id})
  if (user) {
       return  res.status(200).json({
          success: true,
         data: user
        })
} else {
  return  res.status(400).json({
    success: false,
   message: "please try again can't find user"
  })
}

})





















module.exports = router;
