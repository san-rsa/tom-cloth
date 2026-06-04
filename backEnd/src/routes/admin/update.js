require('dotenv').config()
const User = require('../../models/user')
const Banner = require('../../models/news/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//const OTP = require('../../models/OTP')
// const Product = require('../models/product')
// const Product = require('../models/product')
 const {auth, role, uploadMiddleware, deleteFixture, updateStanding, updateCupStanding, secondHalf, extraTimeFirstHalf, extraTimeSecondHalf, firstHalf, hasDuplicatesInLineUp, hasDuplicatesInAllLineUp, checkLineUp} = require('../../middleware/mid')
 // const cloudinary = require("cloudinary");
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
const { updatePlayerPlayed, updatePlayerYellowCard, updatePlayerRedCard, updatePlayerGoal, updatePlayerAssist, statsD, updateStat } = require('../../middleware/stats')
const Stat = require('../../models/competition/stats')
const { io } = require('../../../server')









router.patch('/:competition/fixture/:id', auth, async (req, res)=> {



    const action = JSON.parse(req.body.action)
    const matchday = JSON.parse(req.body.matchday)
    const data = {}
    const found = {}






    

    try {
        // const {extraTime, start, end, main, assist, team, motm }= data
        const {id, competition, motm} = req.params
        const lineup = {}

		if (!id || !competition  ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


                const existing = await Fixture.findOne({competition}).sort({year: 'desc'})

            
                    if (existing) {
                        //---- Check if index exists ----
                        const userTeam = await Team.findOne({userId: req.userId}) 

                        const Foundmatchday = existing.fixture.findIndex(item => item.matchday == matchday);
                        const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == id);
                            

                            // const timeline = {
                            //     time: Foundtime, player: { main: main, assist: assist, },
                            //     action: action, team: team, 
                            // }





                        if (Foundmatchday == -1) {
                            
                            return  res.status(400).json({
                                success: false,
                                message: "matchday not found ",
          
                            })
                        }
        
                        if (Foundmatchday !== -1) {
                           if (Foundmatch == -1) {
                            return  res.status(400).json({
                                success: false,
                                message: "match not found ",
          
                            })  }


        
        
                        else if (Foundmatch !== -1 ) {

                            found.matchday = Foundmatchday
                            found.match = Foundmatch  
                                
    




                       const foundhome = existing.fixture[Foundmatchday].teams[Foundmatch].home
                        const foundaway = existing.fixture[Foundmatchday].teams[Foundmatch].away

                    if (action == "line-up") {

                        const starting =  Object.values(JSON.parse(req.body.starting)).flat();
                        const sub = Object.values(JSON.parse(req.body.sub)).flat();

                        if (!starting || !sub) {
                            return res.status(403).json({
                                success: false,
                                message: "All Fields are required in lineup",
                            }); 
                        } 

                        checkLineUp(starting, sub, res)

                  
                       const homeStart = existing.fixture[Foundmatchday].teams[Foundmatch].lineup.starting.home 
                       const homeSub = existing.fixture[Foundmatchday].teams[Foundmatch].lineup.sub.home 
                       const awayStart = existing.fixture[Foundmatchday].teams[Foundmatch].lineup.starting.away
                       const awaySub = existing.fixture[Foundmatchday].teams[Foundmatch].lineup.sub.away

                       console.log(!homeStart.length);
                       

                        if (foundhome == String(userTeam._id)) {

                            if (homeStart.length && homeSub.length) {
                                    return res.status(403).json({
                                        success: false,
                                        message: "lineup has been set",
                            }); 
                            } else {
                        existing.fixture[Foundmatchday].teams[Foundmatch].lineup.starting.home = starting
                        existing.fixture[Foundmatchday].teams[Foundmatch].lineup.sub.home = sub
                            }


                        } else if (foundaway == String(userTeam._id)) {

                            
                            if (awayStart.length && awaySub.length) {
                                return res.status(403).json({
                                    success: false,
                                    message: "lineup has been set",
                        }); 
                        } else {
                        existing.fixture[Foundmatchday].teams[Foundmatch].lineup.starting.away = starting
                        existing.fixture[Foundmatchday].teams[Foundmatch].lineup.sub.away = sub

                        }

                        }                            
                    }

                    // live for et with live update

                    // else if (action == "extra-time") {
                    //     const data = JSON.parse(req.body.data)
                    //     const extraTime  = Number(data.extraTime)
                        
                    //     existing.fixture[Foundmatchday].teams[Foundmatch].time.first = existing.fixture[Foundmatchday].teams[Foundmatch].time.first + extraTime
                    //     existing.fixture[Foundmatchday].teams[Foundmatch].time.second = existing.fixture[Foundmatchday].teams[Foundmatch].time.second + extraTime
                    //     existing.fixture[Foundmatchday].teams[Foundmatch].time.firstET = existing.fixture[Foundmatchday].teams[Foundmatch].time.firstET + extraTime
                    //     existing.fixture[Foundmatchday].teams[Foundmatch].time.secondET = existing.fixture[Foundmatchday].teams[Foundmatch].time.secondET + extraTime
                    // } 


                    else if (action == "start") {
                        const data = JSON.parse(req.body.data)
                        const start  = data.start

                        const time = existing.fixture[Foundmatchday].teams[Foundmatch].time.now
                        const live = existing.fixture[Foundmatchday].teams[Foundmatch].live
                        const starts = existing.fixture[Foundmatchday].teams[Foundmatch].start

                        const region = await Competition.findOne({name: competition})


                        
                        // half : {type: String,  enum: ['full time', 'half time', 'full time AET', 'half time AET', 'live', "upcoming" ],  },
                       
                        
                        
                        
                        

                            if (start == "start game") {
                             
                                if (!starts && !live && time == 0) {
                                     firstHalf(existing._id, id, matchday)
                                } else {
                                    return res.status(400).json({
                                    success: false,
                                    message: "first half has been played",
              
                                })
                                }
                            }

                        }


                            // start for live update for half
                            
                    //         else if (start == "second") {


                    //             if (starts && !live && time == region.min.ft  ) {
                    //                  secondHalf(existing._id, id, matchday)
                    //             } else {
                    //                 return res.status(400).json({
                    //                 success: false,
                    //                 message: "game has not start  ",
              
                    //             })
                    //             }



                    //         }

                    //         else if (start == "extra time") {

                    //             if (starts && !live && time == region.min.ft * 2) {
                    //                 extraTimeFirstHalf(existing._id, id, matchday)
                    //             } else {
                    //                 return  res.status(400).json({
                    //                 success: false,
                    //                 message: "second half hasn't not ended yet  ",
              
                    //             })
                    //             }

                    //         } else if (start == "extra time second half") {

                    //             if (starts && !live && time == region.min.et) {
                    //                 extraTimeSecondHalf(existing._id, id, matchday)
                    //             } else {
                    //                  return res.status(400).json({
                    //                 success: false,
                    //                 message: "first half extra time hasn't not ended yet  ",
              
                    //             })
                    //             }

                    //         }

                    // } 

                    else if (action == "end") {
                        // const result =  async (req, res)=> {
                        
                            const data = JSON.parse(req.body.data)
                        
                            try {

                        
                                const {time, home, away, group, stage, referee, stadium, lineup  } = existing.fixture[Foundmatchday].teams[Foundmatch]

                        
                                const {competition, type, year} = existing
                        
                        
                                                        
                                if (!existing || !year || !id ) {
                                    return res.status(403).json({
                                        success: false,
                                        message: "All Fields are required",
                                    });
                                }
                        
                        
                                    const existingRes = await Result.findOne({competition, year})
                        

                                                            
                                    const match = existing.fixture[Foundmatchday].teams[Foundmatch]
                        
                                            const result =  { matchday,
                                            teams: match    // teams: [{home, time: [{date, time,}], away } ]
                            
                            }
                        
                        
                        
                                            
                            // if (!match.start) {
                              
                            //         return res.status(403).json({
                            //             success: false,
                            //             message: "game hasn't start yet",
                            //         });
                                
                            // }
                                       
                                    
                                                const statsDb = await Stat.findOne({competition, year}) ? await Stat.findOne({competition, year}) :  await Stat.create({
                                                    competition,  year, 
                                                })
                                                
                                                
                                              //  const statsDb = await Stat.findOne({competition, year})  // await statsD(competition, year)
                                                
                                                
                                                // async function () {
                                                //      const existing = await Stat.findOne({competition, year})

                                                //      if (existing) {
                                                //         return existing 
                                                //      } else {
                                                //         return  await Stat.create({
                                                //             competition,  year, 
                                                //         })
                                                //      }
                                                    
                                                // }



                                            //     const stats = async function () {
                                            //         const existing = await Stat.findOne({competition, year})

                                            //         if (existing) {
                                            //            return existing 
                                            //         } else {
                                            //            return  await Stat.create({
                                            //                competition,  year, 
                                            //            })
                                            //         }
                                                   
                                            //    }

                                            //    const statsD = await stats


                                             //   const statsDb = await statsD



                                            if (existingRes) {
                        
                        
                                                //---- Check if index exists ----
                        
                                                const statsDb = await Stat.findOne({competition, year})  // await statsD(competition, year)


                                                const FoundmatchdayRes = existingRes.result.findIndex(item => item.matchday == matchday);
                                             
                                                if (FoundmatchdayRes == -1) {
                                                    
                                                    existingRes.result.push(result)
                                                                
                                                }
                                
                                                if (FoundmatchdayRes !== -1) {
                                                const FoundHome = existingRes.result[FoundmatchdayRes].teams.findIndex(item => item.home == String(home));
                                                const Foundaway = existingRes.result[FoundmatchdayRes].teams.findIndex(item => item.away == String(away));
                                
                                
                                                   if (FoundHome == -1 && Foundaway == -1) {
                                
                                                    existingRes.result[FoundmatchdayRes].teams.push(match ) 
                                                    }
                                
                                
                                                // else if (FoundHome !== -1 || Foundaway !== -1  ) {
                                                    
                                                //    return  res.status(400).json({
                                                //         type: "failed",
                                                //         mgs: "result added choose different fixtures ",
                                  
                                                //     })
                                                //    }
                                                   
                                
                                                }
                                                            
                                
    
                                                if (String(existingRes.type) == "league") {

                                
                                
                                                 // deleteFixture(existingFix, FoundmatchdayF, Fixture, matchId)
                                
                                
                                                    updateStanding(Standing, competition, year, match.home, Number(match.homeScore), match.away, Number(match.awayScore), res )
                                
                                
                                                  }
                                                                
                                                 else if (String(existingRes.type) == "cup") {
                        
                                                      if (String(match.stage) !== "knockout") {
                                                    updateCupStanding(CupStanding, competition, year, match.home, Number(match.homeScore), match.away, Number(match.awayScore), match.group, res )
                                                                         
                                                    console.log(  8088);

                                                 
                                                }



                                        //        async function updateStat (match, stats) {
                                                    
                                        //         if (match.lineup.starting.home.length !== 0) {


                                        //             for (let i = 0; i < match.lineup.starting.home.length; i++) {
                                        //                 const element = match.lineup.starting.home[i];
    
                                        //                 const existingPlayer = await Player.findOne({_id: element})        
                                        //                 const stats = {player: element, team: existingPlayer.teamId, 
                                                          
                                        //                   played: 1, goal: 0, assist: 0, yellow: 0, red: 0, motm: 0, potm: 0, }
                                                
                                                      
                                                                            
                                        //                                   const Foundplayer = statsDb.stats.findIndex(item => item.player == element);
                                                                        
                                        //                                   console.log(Foundplayer);
                                                                          
                                                            
                                        //                                 if (Foundplayer == -1) {
                                                                            
                                        //                                    statsDb.stats.push(stats)
                                        //                                 }
                                                        
                                        //                                 if (Foundplayer !== -1) {
                                                                         
                                        //                                    statsDb.stats[Foundplayer].played = statsDb.stats[Foundplayer].played + 1;                           
                                                        
                                        //                                 }

                                                        
                                        //             }         

                                        //         }

                                        //         if (match.lineup.starting.away.length !== 0) {
                                        //             for (let i = 0; i < match.lineup.starting.away.length; i++) {
                                        //                 const element = match.lineup.starting.away[i];
    
                                        //              // updatePlayerPlayed(statsDb, element)

                                                     
                                        //                      const existingPlayer = await Player.findOne({_id: element})        
                                        //                      const stats = {player: element, team: existingPlayer.teamId, 
                                                               
                                        //                        played: 1, goal: 0, assist: 0, yellow: 0, red: 0, motm: 0, potm: 0, }
                                                     
                                                           
                                                                                 
                                        //                                        const Foundplayer = statsDb.stats.findIndex(item => item.player == element);
                                                                             
                                        //                                        console.log(Foundplayer);
                                                                               
                                                                 
                                        //                                      if (Foundplayer == -1) {
                                                                                 
                                        //                                         statsDb.stats.push(stats)
                                        //                                      }
                                                             
                                        //                                      if (Foundplayer !== -1) {
                                                                              
                                        //                                         statsDb.stats[Foundplayer].played = statsDb.stats[Foundplayer].played + 1;                           
                                                             
                                        //                                      }
                                                                            
                                                     
                                        //               console.log( statsDb, 80);


                                        //             }   

                                        //         }

                                                
                                        //         // for (let i = 0; i < match.timeline.length; i++) {
                                        //         //     const element = match.timeline[i];

                                        //         //     if (element.action == "goal") {
                                        //         //         updatePlayerGoal(statsDb, element.player.main)
                                                        
                                        //         //     if (element.player.assist) {
                                        //         //         updatePlayerAssist(statsDb, element.player.assist)
    
                                        //         //     }
                                        //         //     } else if (element.action == "red") {
                                        //         //         updatePlayerRedCard(statsDb, element.player.main)

                                        //         //     } else if (element.action == "yellow") {
                                        //         //         updatePlayerYellowCard(statsDb, element.player.main)

                                        //         //     } else if (element.action == "substitution") {
                                        //         //         updatePlayerPlayed(statsDb, element.player.main)

                                        //         //     } else if (element) {
                                                        
                                        //         //     }  
                                                    
                                        //         // }


                                

                                
                                        //    //        deleteFixture(existing, Foundmatchday, Fixture, id)


                                        //    statsDb.save()

  

                                        //         }

                                                //  console.log( statsDb, 80);
                                                 

                                                    updateStat(match, statsDb)
      
                                                }
                                
                                                  // statsDb.save()
                                
                                                const save = await existingRes.save();
                        
                                
                                               return  res.status(200).json({
                                                    type: "success",
                                                    mgs: "Process successful",
                                                    data: save
                                                })
                                
                                
                                
                                            
                        
                                    }    else {
                                    
                                    
                                
                                        
                                                const save = await Result.create({
                                                    competition, year, result, type: String(type)
                                                })
                                                    // res.redirect("/login")
                                
                                                    
                                                    if (String(save.type) == "league") {
                                                        updateStanding(Standing, competition, year, match.home, Number(match.homeScore), match.away, Number(match.awayScore), res )
                         
                                                     }
                        
                                                     else if (String(save.type) == "cup") {
                        
                                                           if (String(stage) !== "knockout") {
                                                            updateCupStanding(CupStanding, competition, year, match.home, Number(match.homeScore), match.away, Number(match.awayScore), match.group, res )
                         
                                                     }
                                                     }
                        
                                                  
                        
                                                   
                                                //    deleteFixture(existing, Foundmatchday, Fixture, id)
                                
                                        
                                                return res.status(200).json({
                                                    success: true,
                                                    save,
                                                    message: "created successfully ✅"
                                                   
                                                })  
                                            
                                                
                                            }
                            } catch (error) {
                                console.error(error)
                                return res.status(500).json({
                                    success: false,
                                    message : "registration failed"
                                })
                               
                           }  
                        
                        // }



                       // result(req, res)
                    }

                    else {
                        const data = JSON.parse(req.body.data);
                        const {main, assist, minutes, et}  = data



                        
                        const time = { time: minutes, et: et }



                        // live update by time
                        // const time = existing.fixture[Foundmatchday].teams[Foundmatch].time.now
                        
                        if (foundhome == String(userTeam._id)) {

                        const timeline = {time, player: {main, assist}, action, team: 'home', }




                        if (action == "goal") {

                        existing.fixture[Foundmatchday].teams[Foundmatch].homeScore = existing.fixture[Foundmatchday].teams[Foundmatch].homeScore + 1

                        }

                            const timelines = existing.fixture[Foundmatchday].teams[Foundmatch].timeline
        
                                console.log(timelines);

                            existing.fixture[Foundmatchday].teams[Foundmatch].timeline = [...timelines, timeline ] //.push(timeline)
        
                        
                        } else if (foundaway == String(userTeam._id)) {

                            const timeline = {time, player: {main, assist}, action, team: 'away', }



                            
                        if (action == "goal") {
                            existing.fixture[Foundmatchday].teams[Foundmatch].awayScore = existing.fixture[Foundmatchday].teams[Foundmatch].awayScore + 1
    
                            }

                            const timelines = existing.fixture[Foundmatchday].teams[Foundmatch].timeline


                            existing.fixture[Foundmatchday].teams[Foundmatch].timeline = [...timelines, timeline ] //.push(timeline)

                        }     
                        
                       }



                           }}          
             
                    }      

                    const save = await existing.save();

                    if (save) {
                        const db = await Fixture.findOne({competition }).sort({year: 'desc'})
                         .populate("fixture.teams.home", "name logo").populate("fixture.teams.away", "name logo")
                         .populate("fixture.teams.lineup.starting.home", "name picture position" ).populate("fixture.teams.lineup.sub.home", "name picture position" )
                         .populate("fixture.teams.lineup.starting.away", "name picture position" ).populate("fixture.teams.lineup.sub.away", "name picture position" )
                         .populate("fixture.teams.motm", "name picture position" )
                         .populate("fixture.teams.timeline.player.main", "name" ).populate("fixture.teams.timeline.player.assist", "name" )
                

                        data.info = {competition: db.competition, year: db.year, matchday: db.fixture[found.matchday].matchday, type: db.type } 
                        data.match = db.fixture[found.matchday].teams[found.match]
                

                        // const timelines = existing.fixture[].teams[Foundmatch].timeline

                    }

                    io.emit('match updated' + id, data)

                       return  res.status(200).json({
                        success: true,
                            mgs: "Process successful",
                            data: save
                        })

    }    catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  

})









router.patch('/:competition/result/:id', auth, async (req, res)=> {



    const action = JSON.parse(req.body.action)
    const matchday = JSON.parse(req.body.matchday)
    const data = {}
    const found = {}






    

    try {
        // const {extraTime, start, end, main, assist, team, motm }= data
        const {id, competition, motm} = req.params
        const lineup = {}

		if (!id || !competition  ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


                const existing = await Result.findOne({competition}).sort({year: 'desc'})

            
                    if (existing) {
                        //---- Check if index exists ----
                        const userTeam = await Team.findOne({userId: req.userId}) 

                        const Foundmatchday = existing.result.findIndex(item => item.matchday == matchday);
                        const Foundmatch = existing.result[Foundmatchday].teams.findIndex(item => item._id == id);
                            

                            // const timeline = {
                            //     time: Foundtime, player: { main: main, assist: assist, },
                            //     action: action, team: team, 
                            // }





                        if (Foundmatchday == -1) {
                            
                            return  res.status(400).json({
                                success: false,
                                message: "matchday not found ",
          
                            })
                        }
        
                        if (Foundmatchday !== -1) {
                           if (Foundmatch == -1) {
                            return  res.status(400).json({
                                success: false,
                                message: "match not found ",
          
                            })  }


        
        
                        else if (Foundmatch !== -1 ) {

                            found.matchday = Foundmatchday
                            found.match = Foundmatch  
                                
    




                       const foundhome = existing.result[Foundmatchday].teams[Foundmatch].home
                        const foundaway = existing.result[Foundmatchday].teams[Foundmatch].away

                    if (action == "line-up") {

                        const starting =  Object.values(JSON.parse(req.body.starting)).flat();
                        const sub = Object.values(JSON.parse(req.body.sub)).flat();

                        if (!starting || !sub) {
                            return res.status(403).json({
                                success: false,
                                message: "All Fields are required in lineup",
                            }); 
                        } 

                        checkLineUp(starting, sub, res)

                  
                       const homeStart = existing.result[Foundmatchday].teams[Foundmatch].lineup.starting.home 
                       const homeSub = existing.result[Foundmatchday].teams[Foundmatch].lineup.sub.home 
                       const awayStart = existing.result[Foundmatchday].teams[Foundmatch].lineup.starting.away
                       const awaySub = existing.result[Foundmatchday].teams[Foundmatch].lineup.sub.away

                       console.log(!homeStart.length);
                       

                        if (foundhome == String(userTeam._id)) {

                            if (homeStart.length && homeSub.length) {
                                    return res.status(403).json({
                                        success: false,
                                        message: "lineup has been set",
                            }); 
                            } else {
                        existing.result[Foundmatchday].teams[Foundmatch].lineup.starting.home = starting
                        existing.result[Foundmatchday].teams[Foundmatch].lineup.sub.home = sub
                            }


                        } else if (foundaway == String(userTeam._id)) {

                            
                            if (awayStart.length && awaySub.length) {
                                return res.status(403).json({
                                    success: false,
                                    message: "lineup has been set",
                        }); 
                        } else {
                        existing.result[Foundmatchday].teams[Foundmatch].lineup.starting.away = starting
                        existing.result[Foundmatchday].teams[Foundmatch].lineup.sub.away = sub

                        }

                        }                            
                    }

                    // live for et with live update

                    // else if (action == "extra-time") {
                    //     const data = JSON.parse(req.body.data)
                    //     const extraTime  = Number(data.extraTime)
                        
                    //     existing.fixture[Foundmatchday].teams[Foundmatch].time.first = existing.fixture[Foundmatchday].teams[Foundmatch].time.first + extraTime
                    //     existing.fixture[Foundmatchday].teams[Foundmatch].time.second = existing.fixture[Foundmatchday].teams[Foundmatch].time.second + extraTime
                    //     existing.fixture[Foundmatchday].teams[Foundmatch].time.firstET = existing.fixture[Foundmatchday].teams[Foundmatch].time.firstET + extraTime
                    //     existing.fixture[Foundmatchday].teams[Foundmatch].time.secondET = existing.fixture[Foundmatchday].teams[Foundmatch].time.secondET + extraTime
                    // } 


                    else if (action == "start") {
                        const data = JSON.parse(req.body.data)
                        const start  = data.start

                        const time = existing.result[Foundmatchday].teams[Foundmatch].time.now
                        const live = existing.result[Foundmatchday].teams[Foundmatch].live
                        const starts = existing.result[Foundmatchday].teams[Foundmatch].start

                        const region = await Competition.findOne({name: competition})


                        
                        // half : {type: String,  enum: ['full time', 'half time', 'full time AET', 'half time AET', 'live', "upcoming" ],  },
                       
                        
                        
                        
                        

                            if (start == "start game") {
                             
                                if (!starts && !live && time == 0) {
                                     firstHalf(existing._id, id, matchday)
                                } else {
                                    return res.status(400).json({
                                    success: false,
                                    message: "first half has been played",
              
                                })
                                }
                            }

                        }


                            // start for live update for half
                            
                    //         else if (start == "second") {


                    //             if (starts && !live && time == region.min.ft  ) {
                    //                  secondHalf(existing._id, id, matchday)
                    //             } else {
                    //                 return res.status(400).json({
                    //                 success: false,
                    //                 message: "game has not start  ",
              
                    //             })
                    //             }



                    //         }

                    //         else if (start == "extra time") {

                    //             if (starts && !live && time == region.min.ft * 2) {
                    //                 extraTimeFirstHalf(existing._id, id, matchday)
                    //             } else {
                    //                 return  res.status(400).json({
                    //                 success: false,
                    //                 message: "second half hasn't not ended yet  ",
              
                    //             })
                    //             }

                    //         } else if (start == "extra time second half") {

                    //             if (starts && !live && time == region.min.et) {
                    //                 extraTimeSecondHalf(existing._id, id, matchday)
                    //             } else {
                    //                  return res.status(400).json({
                    //                 success: false,
                    //                 message: "first half extra time hasn't not ended yet  ",
              
                    //             })
                    //             }

                    //         }

                    // } 

                    else if (action == "end") {
                        // const result =  async (req, res)=> {
                        
                            const data = JSON.parse(req.body.data)
                        
                            try {

                        
                                const {time, home, away, group, stage, referee, stadium, lineup  } = existing.result[Foundmatchday].teams[Foundmatch]

                        
                                const {competition, type, year} = existing
                        
                        
                                                        
                                if (!existing || !year || !id ) {
                                    return res.status(403).json({
                                        success: false,
                                        message: "All Fields are required",
                                    });
                                }
                        
                        
                                    const existingRes = await Result.findOne({competition, year})
                        

                                                            
                                    const match = existing.result[Foundmatchday].teams[Foundmatch]
                        
                                            const result =  { matchday,
                                            teams: match    // teams: [{home, time: [{date, time,}], away } ]
                            
                            }
                        
                        
                        
                                            
                            // if (!match.start) {
                              
                            //         return res.status(403).json({
                            //             success: false,
                            //             message: "game hasn't start yet",
                            //         });
                                
                            // }
                                       
                                    
                                                const statsDb = await Stat.findOne({competition, year}) ? await Stat.findOne({competition, year}) :  await Stat.create({
                                                    competition,  year, 
                                                })
                                                
                                                
                                              //  const statsDb = await Stat.findOne({competition, year})  // await statsD(competition, year)
                                                
                                                
                                                // async function () {
                                                //      const existing = await Stat.findOne({competition, year})

                                                //      if (existing) {
                                                //         return existing 
                                                //      } else {
                                                //         return  await Stat.create({
                                                //             competition,  year, 
                                                //         })
                                                //      }
                                                    
                                                // }



                                            //     const stats = async function () {
                                            //         const existing = await Stat.findOne({competition, year})

                                            //         if (existing) {
                                            //            return existing 
                                            //         } else {
                                            //            return  await Stat.create({
                                            //                competition,  year, 
                                            //            })
                                            //         }
                                                   
                                            //    }

                                            //    const statsD = await stats


                                             //   const statsDb = await statsD



                                            if (existingRes) {
                        
                        
                                                //---- Check if index exists ----
                        
                                                const statsDb = await Stat.findOne({competition, year})  // await statsD(competition, year)


                                                const FoundmatchdayRes = existingRes.result.findIndex(item => item.matchday == matchday);
                                             
                                                if (FoundmatchdayRes == -1) {
                                                    
                                                    existingRes.result.push(result)
                                                                
                                                }
                                
                                                if (FoundmatchdayRes !== -1) {
                                                const FoundHome = existingRes.result[FoundmatchdayRes].teams.findIndex(item => item.home == String(home));
                                                const Foundaway = existingRes.result[FoundmatchdayRes].teams.findIndex(item => item.away == String(away));
                                
                                
                                                   if (FoundHome == -1 && Foundaway == -1) {
                                
                                                    existingRes.result[FoundmatchdayRes].teams.push(match ) 
                                                    }
                                
                                
                                                // else if (FoundHome !== -1 || Foundaway !== -1  ) {
                                                    
                                                //    return  res.status(400).json({
                                                //         type: "failed",
                                                //         mgs: "result added choose different fixtures ",
                                  
                                                //     })
                                                //    }
                                                   
                                
                                                }
                                                            
                                
    
                                                if (String(existingRes.type) == "league") {

                                
                                
                                                 // deleteFixture(existingFix, FoundmatchdayF, Fixture, matchId)
                                
                                
                                                    updateStanding(Standing, competition, year, match.home, Number(match.homeScore), match.away, Number(match.awayScore), res )
                                
                                
                                                  }
                                                                
                                                 else if (String(existingRes.type) == "cup") {
                        
                                                      if (String(match.stage) !== "knockout") {
                                                    updateCupStanding(CupStanding, competition, year, match.home, Number(match.homeScore), match.away, Number(match.awayScore), match.group, res )
                                                                         
                                                    console.log(  8088);

                                                 
                                                }



                                        //        async function updateStat (match, stats) {
                                                    
                                        //         if (match.lineup.starting.home.length !== 0) {


                                        //             for (let i = 0; i < match.lineup.starting.home.length; i++) {
                                        //                 const element = match.lineup.starting.home[i];
    
                                        //                 const existingPlayer = await Player.findOne({_id: element})        
                                        //                 const stats = {player: element, team: existingPlayer.teamId, 
                                                          
                                        //                   played: 1, goal: 0, assist: 0, yellow: 0, red: 0, motm: 0, potm: 0, }
                                                
                                                      
                                                                            
                                        //                                   const Foundplayer = statsDb.stats.findIndex(item => item.player == element);
                                                                        
                                        //                                   console.log(Foundplayer);
                                                                          
                                                            
                                        //                                 if (Foundplayer == -1) {
                                                                            
                                        //                                    statsDb.stats.push(stats)
                                        //                                 }
                                                        
                                        //                                 if (Foundplayer !== -1) {
                                                                         
                                        //                                    statsDb.stats[Foundplayer].played = statsDb.stats[Foundplayer].played + 1;                           
                                                        
                                        //                                 }

                                                        
                                        //             }         

                                        //         }

                                        //         if (match.lineup.starting.away.length !== 0) {
                                        //             for (let i = 0; i < match.lineup.starting.away.length; i++) {
                                        //                 const element = match.lineup.starting.away[i];
    
                                        //              // updatePlayerPlayed(statsDb, element)

                                                     
                                        //                      const existingPlayer = await Player.findOne({_id: element})        
                                        //                      const stats = {player: element, team: existingPlayer.teamId, 
                                                               
                                        //                        played: 1, goal: 0, assist: 0, yellow: 0, red: 0, motm: 0, potm: 0, }
                                                     
                                                           
                                                                                 
                                        //                                        const Foundplayer = statsDb.stats.findIndex(item => item.player == element);
                                                                             
                                        //                                        console.log(Foundplayer);
                                                                               
                                                                 
                                        //                                      if (Foundplayer == -1) {
                                                                                 
                                        //                                         statsDb.stats.push(stats)
                                        //                                      }
                                                             
                                        //                                      if (Foundplayer !== -1) {
                                                                              
                                        //                                         statsDb.stats[Foundplayer].played = statsDb.stats[Foundplayer].played + 1;                           
                                                             
                                        //                                      }
                                                                            
                                                     
                                        //               console.log( statsDb, 80);


                                        //             }   

                                        //         }

                                                
                                        //         // for (let i = 0; i < match.timeline.length; i++) {
                                        //         //     const element = match.timeline[i];

                                        //         //     if (element.action == "goal") {
                                        //         //         updatePlayerGoal(statsDb, element.player.main)
                                                        
                                        //         //     if (element.player.assist) {
                                        //         //         updatePlayerAssist(statsDb, element.player.assist)
    
                                        //         //     }
                                        //         //     } else if (element.action == "red") {
                                        //         //         updatePlayerRedCard(statsDb, element.player.main)

                                        //         //     } else if (element.action == "yellow") {
                                        //         //         updatePlayerYellowCard(statsDb, element.player.main)

                                        //         //     } else if (element.action == "substitution") {
                                        //         //         updatePlayerPlayed(statsDb, element.player.main)

                                        //         //     } else if (element) {
                                                        
                                        //         //     }  
                                                    
                                        //         // }


                                

                                
                                        //    //        deleteFixture(existing, Foundmatchday, Fixture, id)


                                        //    statsDb.save()

  

                                        //         }

                                                //  console.log( statsDb, 80);
                                                 

                                                    updateStat(match, statsDb)
      
                                                }
                                
                                                  // statsDb.save()
                                
                                                const save = await existingRes.save();
                        
                                
                                               return  res.status(200).json({
                                                    type: "success",
                                                    mgs: "Process successful",
                                                    data: save
                                                })
                                
                                
                                
                                            
                        
                                    }    else {
                                    
                                    
                                
                                        
                                                const save = await Result.create({
                                                    competition, year, result, type: String(type)
                                                })
                                                    // res.redirect("/login")
                                
                                                    
                                                    if (String(save.type) == "league") {
                                                        updateStanding(Standing, competition, year, match.home, Number(match.homeScore), match.away, Number(match.awayScore), res )
                         
                                                     }
                        
                                                     else if (String(save.type) == "cup") {
                        
                                                           if (String(stage) !== "knockout") {
                                                            updateCupStanding(CupStanding, competition, year, match.home, Number(match.homeScore), match.away, Number(match.awayScore), match.group, res )
                         
                                                     }
                                                     }
                        
                                                  
                        
                                                   
                                                //    deleteFixture(existing, Foundmatchday, Fixture, id)
                                
                                        
                                                return res.status(200).json({
                                                    success: true,
                                                    save,
                                                    message: "created successfully ✅"
                                                   
                                                })  
                                            
                                                
                                            }
                            } catch (error) {
                                console.error(error)
                                return res.status(500).json({
                                    success: false,
                                    message : "registration failed"
                                })
                               
                           }  
                        
                        // }



                       // result(req, res)
                    }

                    else {
                        const data = JSON.parse(req.body.data);
                        const {main, assist, minutes, et}  = data



                        
                        const time = { time: minutes, et: et }



                        // live update by time
                        // const time = existing.fixture[Foundmatchday].teams[Foundmatch].time.now
                        
                        if (foundhome == String(userTeam._id)) {

                        const timeline = {time, player: {main, assist}, action, team: 'home', }




                        if (action == "goal") {

                        existing.result[Foundmatchday].teams[Foundmatch].homeScore = existing.result[Foundmatchday].teams[Foundmatch].homeScore + 1

                        }

                            const timelines = existing.result[Foundmatchday].teams[Foundmatch].timeline
        
                                console.log(timelines);

                            existing.result[Foundmatchday].teams[Foundmatch].timeline = [...timelines, timeline ] //.push(timeline)
        
                        
                        } else if (foundaway == String(userTeam._id)) {

                            const timeline = {time, player: {main, assist}, action, team: 'away', }



                            
                        if (action == "goal") {
                            existing.result[Foundmatchday].teams[Foundmatch].awayScore = existing.result[Foundmatchday].teams[Foundmatch].awayScore + 1
    
                            }

                            const timelines = existing.result[Foundmatchday].teams[Foundmatch].timeline


                            existing.result[Foundmatchday].teams[Foundmatch].timeline = [...timelines, timeline ] //.push(timeline)

                        }     
                        
                       }



                           }}          
             
                    }      

                    const save = await existing.save();

                       return  res.status(200).json({
                        success: true,
                            mgs: "Process successful",
                            data: save
                        })

    }    catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  

})


































module.exports = router;
