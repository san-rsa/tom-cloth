let middlewareObject = {};
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());


const jwt = require('jsonwebtoken')
const User = require('../models/user')
//a middleware to check if a user is logged in or not

const cloudinary = require("../connection/cloudinary");
const Standing = require("../models/competition/standing/standing");

const {update} = require("./stats");
const Fixture = require("../models/competition/fixture");
const Competition = require("../models/competition/competition");
const { io } = require("../../server");



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



  
   async function deleteFixture(fix, day, delAll, fixtureId) {
    const deleteFix = fix.fixture[day].teams.length
    const deleteAllFix = fix.fixture.length



    


    
    fix.fixture[day]?.teams.pull(fixtureId)



        console.log(deleteFix, deleteAllFix, 'kkl',);


        if (deleteFix === undefined || deleteFix == 0 || !deleteFix) {
            const id = fix.fixture[day]?._id
                fix.fixture.pull(id)

                console.log(id);


        }



        
         if (deleteAllFix === undefined || deleteAllFix == 0  || !deleteAllFix) {
                const id = fix._id

           await delAll.findByIdAndDelete(id)

        }
            console.log( fix);

       fix.save()

}





async function updateCupStanding(table, competition, year, h, hms, a, aws, group, res, next ) {



  
  try {


  // if (!competition || !h || !hms || !aws || !a) {
  //   return res.status(403).json({
  //     success: false,
  //     message: "All Fields are required",
  //   });
  // }





      const existing = await table.findOne({competition, year})


      const stats = {win: 0, loss: 0, draw: 0, gd: 0, point: 0, play: 0,  }

  
          
     
  
          if (existing) {
              //---- Check if index exists ----

              const FoundGroup = existing?.group.findIndex(item => item.group == group );

              const FoundHome = existing.group[FoundGroup]?.standing.findIndex(item => item.teams == h);
              const Foundaway = existing.group[FoundGroup]?.standing.findIndex(item => item.teams == a);


  
  
              

              if (FoundGroup !== -1) {
                if (FoundHome == -1 || Foundaway == -1) {
                
                  if (FoundHome == -1 ) {
                        existing.group[FoundGroup].standing.push({teams: h, stats }) 
                    }
  
                  if ( Foundaway == -1) {
                      existing.group[FoundGroup].standing.push({teams: a, stats }) 
                    }
  
  
                   // update(existing, group, h, hms, aws,a)
  
                }
              }

              else if ( FoundGroup == -1)  {
                existing.group.push({
                  group: group, standing: [{teams: h, stats: stats}, {teams: a, stats: stats}]
                })

               // update(existing, group, h, hms, aws,a)
              }



              else if (FoundHome !== -1 && Foundaway !== -1  ) {
        

              }
                 

                update(existing, group, h, hms, aws,a)


            
               await existing.save();

              


           
             
             
          }
          //------------ This creates a new cart and then adds the item to the cart that has been created------------
          else {
  
              const save = await table.create({
                  competition, year, group: [{group: group, standing: [{teams: h, stats: stats}, {teams: a, stats: stats}]}]

              })

            
                    update(save, group, h, hms, aws,a)


                          
            

                          
                             
            
                         await save.save();

                        
                  // res.redirect("/login")

                       
             // return save
              
          }


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  



}





async function updateStanding(table, competition, year, h, hms, a, aws, res, next ) {

  try {


  if (!competition || !h || !hms || !aws || !a) {
    return res.status(403).json({
      success: false,
      message: "All Fields are required",
    });
  }





      const existing = await table.findOne({competition, year})


   const stats = {win: 0, loss: 0, draw: 0, gd: 0, point: 0, play: 0,  }




  
          
     
  
          if (existing) {
              //---- Check if index exists ----

              const FoundHome = existing.standing.findIndex(item => item.teams == h);
              const Foundaway = existing.standing.findIndex(item => item.teams == a);


  
  
              console.log(FoundHome, Foundaway);
              

              if (FoundHome == -1 || Foundaway == -1) {
                
                if (FoundHome == -1 ) {
                      existing.standing.push({teams: h, stats }) 
                  }

                if ( Foundaway == -1) {
                    existing.standing.push({teams: a, stats }) 
                  }

              }

                 
                update(existing, group, h, hms, aws,a)

            
              const save = await existing.save();


             return  save
             
             
          }
          //------------ This creates a new cart and then adds the item to the cart that has been created------------
          else {
  
  

      
              const save = await table.create({
                  competition, year, standing: [{teams: h, stats: stats}, {teams: a, stats: stats}]
              })

              
              
            
                              update(save, group, h, hms, aws,a)

            
                         await save.save();

                        
                  // res.redirect("/login")

                       
              return save
              
          }


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  



}


// time

async function updateMinutes (matchId, existing, Foundmatchday, Foundmatch) {
  const data = {}
  if (existing) {
     
    data.info = {competition: existing.competition, year: existing.year, matchday: existing.fixture[Foundmatchday].matchday, type: existing.type } 
    data.match = existing.fixture[Foundmatchday].teams[Foundmatch]
                       console.log('rrrrt', data.match.time);

              }

              
  
                 await   io.emit('match updated' + matchId, data)
}




  const firstHalf = async (id, matchId, day, ) => {

   const timer = async () => {

    const existing = await Fixture.findById(id)
    .populate("fixture.teams.home", "name logo").populate("fixture.teams.away", "name logo")
    .populate("fixture.teams.lineup.starting.home", "name picture position" ).populate("fixture.teams.lineup.sub.home", "name picture position" )
    .populate("fixture.teams.lineup.starting.away", "name picture position" ).populate("fixture.teams.lineup.sub.away", "name picture position" )
    .populate("fixture.teams.motm", "name picture position" )
    .populate("fixture.teams.timeline.player.main", "name" ).populate("fixture.teams.timeline.player.assist", "name" )
      


    const Foundmatchday = existing.fixture.findIndex(item => item.matchday == day);
    const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == String(matchId));

    const time = existing.fixture[Foundmatchday].teams[Foundmatch].time

  //  console.log(id, existing, time);

    existing.fixture[Foundmatchday].teams[Foundmatch].live = true
    existing.fixture[Foundmatchday].teams[Foundmatch].start = true
    existing.fixture[Foundmatchday].teams[Foundmatch].half = "live"



            if (time.now <= time.first) {
        // Models.post.Post.findOneAndUpdate({ _id: res._id }, { $inc: { 'time.now': 1 } }, {new: true })
         
        time.now = time.now + 1;      
        

               console.log(time);
               
       setTimeout(timer, 60000);

               existing.save()


       
            //  updateMinutes (matchId, existing, Foundmatchday, Foundmatch) 

       
                     
         

 
 
     } else {

  

         existing.fixture[Foundmatchday].teams[Foundmatch].half = "half time"

         existing.fixture[Foundmatchday].teams[Foundmatch].live = false

         
      //  existing.fixture[Foundmatchday].teams[Foundmatch].start = false // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

         const min = await Competition.findOne({name: existing.competition})


         time.now =  Number(min.min.ft ) 
         time.first = Number(min.min.ft ) 
         time.second = Number(min.min.ft ) + Number(min.min.ft)
         time.firstET = Number(min.min.et ) 
         time.secondET = Number(min.min.et ) + Number(min.min.et)

         console.log(time);



         updateMinutes (matchId, existing, Foundmatchday, Foundmatch) 


         existing.save()

          
          clearTimeout(timer)

   



     }    




     
    } 

    timer()

    



  };





  const secondHalf = async (id, matchId, day, ) => {
    // do something

    const timer = async () => {

      const existing = await Fixture.findById(id)
      .populate("fixture.teams.home", "name logo").populate("fixture.teams.away", "name logo")
      .populate("fixture.teams.lineup.starting.home", "name picture position" ).populate("fixture.teams.lineup.sub.home", "name picture position" )
      .populate("fixture.teams.lineup.starting.away", "name picture position" ).populate("fixture.teams.lineup.sub.away", "name picture position" )
      .populate("fixture.teams.motm", "name picture position" )
      .populate("fixture.teams.timeline.player.main", "name" ).populate("fixture.teams.timeline.player.assist", "name" )
        
  
  
      const Foundmatchday = existing.fixture.findIndex(item => item.matchday == day);
      const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == String(matchId));
  
      const time = existing.fixture[Foundmatchday].teams[Foundmatch].time
  
    //  console.log(id, existing, time);
  
      existing.fixture[Foundmatchday].teams[Foundmatch].live = true
      existing.fixture[Foundmatchday].teams[Foundmatch].start = true
      existing.fixture[Foundmatchday].teams[Foundmatch].half = "live"
  
  

      if (time.now <= time.second) {
   
  time.now = time.now + 1; 
  
  console.log("rrrrrr", time);
  
  
  updateMinutes (matchId, existing, Foundmatchday, Foundmatch) 

  
 setTimeout(timer, 60000);



} else {


   existing.fixture[Foundmatchday].teams[Foundmatch].live = false

   existing.fixture[Foundmatchday].teams[Foundmatch].half = "full time"

   const min = await Competition.findOne({name: existing.competition})


   time.now = Number(min.min.ft ) + Number(min.min.ft)
   time.first = Number(min.min.ft ) 
   time.second = Number(min.min.ft ) + Number(min.min.ft)
   time.firstET = Number(min.min.ft ) + Number(min.min.ft) + Number(min.min.et ) 
   time.secondET = Number(min.min.ft ) + Number(min.min.ft) + Number(min.min.et ) + Number(min.min.et)

   updateMinutes ( matchId, existing, Foundmatchday, Foundmatch) 

   clearTimeout(timer)


}    


existing.save()
} 

timer()


  };


  const extraTimeFirstHalf = async (id, matchId, day, ) => {
    // do something

    const timer = async () => {

      const existing = await Fixture.findById(id)
      .populate("fixture.teams.home", "name logo").populate("fixture.teams.away", "name logo")
      .populate("fixture.teams.lineup.starting.home", "name picture position" ).populate("fixture.teams.lineup.sub.home", "name picture position" )
      .populate("fixture.teams.lineup.starting.away", "name picture position" ).populate("fixture.teams.lineup.sub.away", "name picture position" )
      .populate("fixture.teams.motm", "name picture position" )
      .populate("fixture.teams.timeline.player.main", "name" ).populate("fixture.teams.timeline.player.assist", "name" )
        
  
  
      const Foundmatchday = existing.fixture.findIndex(item => item.matchday == day);
      const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == String(matchId));
  
      const time = existing.fixture[Foundmatchday].teams[Foundmatch].time
  
    //  console.log(id, existing, time);
  
      existing.fixture[Foundmatchday].teams[Foundmatch].live = true
      existing.fixture[Foundmatchday].teams[Foundmatch].start = true
      existing.fixture[Foundmatchday].teams[Foundmatch].half = "live"
  
  
      if (time.now <= time.firstET) {
  // Models.post.Post.findOneAndUpdate({ _id: res._id }, { $inc: { 'time.now': 1 } }, {new: true })
   
  time.now = time.now + 1; 
  
  console.log("rrrrrr", time);
  
  
  updateMinutes (matchId, existing, Foundmatchday, Foundmatch) 

  
 setTimeout(timer, 60000);



} else {

  existing.fixture[Foundmatchday].teams[Foundmatch].live = false

  existing.fixture[Foundmatchday].teams[Foundmatch].half = "half time AET"

        const min = await Competition.findOne({name: existing.competition})


         time.now = Number(min.min.ft ) + Number(min.min.ft) + Number(min.min.et )
         time.first = Number(min.min.ft ) 
         time.second = Number(min.min.ft ) + Number(min.min.ft)
         time.firstET = Number(min.min.ft ) + Number(min.min.ft) + Number(min.min.et ) 
         time.secondET = Number(min.min.ft ) + Number(min.min.ft) + Number(min.min.et ) + Number(min.min.et)


         console.log("rruuuuuuu", time);
   clearTimeout(timer)
        await updateMinutes ( matchId, existing, Foundmatchday, Foundmatch) 


}    
existing.save()



} 

timer()


  };


  
  const extraTimeSecondHalf = async (id, matchId, day, ) => {
    // do something


    const timer = async () => {

      const existing = await Fixture.findById(id)
      .populate("fixture.teams.home", "name logo").populate("fixture.teams.away", "name logo")
      .populate("fixture.teams.lineup.starting.home", "name picture position" ).populate("fixture.teams.lineup.sub.home", "name picture position" )
      .populate("fixture.teams.lineup.starting.away", "name picture position" ).populate("fixture.teams.lineup.sub.away", "name picture position" )
      .populate("fixture.teams.motm", "name picture position" )
      .populate("fixture.teams.timeline.player.main", "name" ).populate("fixture.teams.timeline.player.assist", "name" )
        
  
  
      const Foundmatchday = existing.fixture.findIndex(item => item.matchday == day);
      const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == String(matchId));
  
      const time = existing.fixture[Foundmatchday].teams[Foundmatch].time
  
    //  console.log(id, existing, time);
  
      existing.fixture[Foundmatchday].teams[Foundmatch].live = true
      existing.fixture[Foundmatchday].teams[Foundmatch].start = true
      existing.fixture[Foundmatchday].teams[Foundmatch].half = "live"
  
  
      if (time.now <= time.second) {
  // Models.post.Post.findOneAndUpdate({ _id: res._id }, { $inc: { 'time.now': 1 } }, {new: true })
   
  time.now = time.now + 1; 
  
  console.log("rrrrrr", time);
  
  updateMinutes (matchId, existing, Foundmatchday, Foundmatch) 

  
 setTimeout(timer, 60000);



} else {

  existing.fixture[Foundmatchday].teams[Foundmatch].live = false

  existing.fixture[Foundmatchday].teams[Foundmatch].half = "full time AET"


   clearTimeout(timer)


   const min = await Competition.findOne({name: existing.competition})


   time.now = Number(min.min.ft ) + Number(min.min.ft) +  Number(min.min.et ) +  Number(min.min.et )
   time.first = Number(min.min.ft ) 
   time.second = Number(min.min.ft ) + Number(min.min.ft)
   time.firstET = Number(min.min.et ) 
   time.secondET = Number(min.min.et ) + Number(min.min.et)

   updateMinutes (matchId, existing, Foundmatchday, Foundmatch) 



}    
existing.save()
} 

timer()


  };



  function hasDuplicatesInLineUp(array) {
    return array.some((element, index) => array.indexOf(element) !== index);
  }

  function hasDuplicatesInAllLineUp(arr1, arr2) {
    for (let i = 0; i <= arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            return true;
        }
    }    return false;

}



const checkLineUp = async (starting, sub, res ) => {
  // do something

  const checkStarting = hasDuplicatesInLineUp(starting)
  const checkSub = hasDuplicatesInLineUp(sub)
  const checkAllLineUp = hasDuplicatesInAllLineUp(starting, sub) 

  console.log(checkAllLineUp);
  

  if (checkStarting) {
    return res.status(400).json({
        success: false,
        message: "starting lineup has the same player",
    })
  } else if (checkSub) {
    return res.status(400).json({
        success: false,
        message: "sub lineup has the same player",
    })
  } else if (checkAllLineUp) {
    return res.status(400).json({
        success: false,
        message: "starting lineup has the same player in sub lineup",
    })
  }
  
  

};





module.exports = {  auth, role, checkLineUp, hasDuplicatesInAllLineUp, hasDuplicatesInLineUp, deleteFixture, updateStanding, updateCupStanding, firstHalf, secondHalf, extraTimeFirstHalf, extraTimeSecondHalf};