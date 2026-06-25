require('dotenv').config()
const Banner = require('../../models/news/banner')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//const OTP = require('../../models/OTP')
const otpGenerator = require("otp-generator");
const User = require('../../models/user')
 const cloudinary = require('../../connection/cloudinary')
 const {auth, role, uploadMiddleware, deleteFixture, updateStanding, updateCupStanding} = require('../../middleware/mid')
const News = require('../../models/news/news')
const Competition = require('../../models/competition/competition')
const Team = require('../../models/competition/team')
const Player = require('../../models/competition/player')
const Fixture = require('../../models/competition/fixture')
const Result = require('../../models/competition/result')
const Standing = require('../../models/competition/standing/standing')
const Codeofconduct = require('../../models/news/codesofconduct')
const CupStanding = require('../../models/competition/standing/cup')
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
    


router.patch('/code-of-conduct/:id', async (req, res)=> {

    const data = JSON.parse(req.body.data)

    try {
        const {title, body}= data

        const id = req.params.id

		if (!title || !body ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        console.log(data)



        const save = await Codeofconduct.findOneAndUpdate({title: id}, {
            $set: data,
        }, { new: true });
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            save,
            message: " successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : " registration failed"
        })
       
   }  
})





router.patch('/competition/:id', async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files?.img  
     

    try {
        const {name, description, type, starting, sub, ft, et }= data
        const substitute = {starting, sub }
        const min = {ft, et}


        const logo = []

        if (req.files) {
            // No file was uploaded

            const image = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'Banner' },
    
          );              
          
          logo.push({url: image.secure_url,  imgId: image.public_id})

        }



 
      


        console.log(data)

		if (!name || !type ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?





        const save = await Competition.findOneAndUpdate({name: req.params.id}, {
            $set: data, logo: logo[0], type: type, substitute: substitute, min
        }, { new: true });
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            save,
            message: "created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  
})



router.patch('/sub-competition/:id', async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files?.img  
     

    try {
        const {name, description, region}= data
        const logo = []

        if (req.files) {
            // No file was uploaded

            const image = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'Banner' },
    
          );              
          
          logo.push({url: image.secure_url,  imgId: image.public_id})

        }



 
      


        console.log(data)

		if (!name || !region ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?





        const save = await Sub_Region.findOneAndUpdate({name: req.params.id}, {
            $set: data, pictures: logo[0], 
        }, { new: true });
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            save,
            message: " successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  
})



router.patch('/:competition/fixture/:id',  async (req, res)=> {

    const data = JSON.parse(req.body.data)

    try {
        const { year, matchday, home, time, date, away, group, referee, stadium, stage, }= data
        const {id, competition} = req.params

        
        console.log(data, req.params)




		if (!id || !competition ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


     
                const existing = await Fixture.findOne({competition}).sort({year: 'desc'})

                    
               
            
                    if (existing) {
                        //---- Check if index exists ----                            
                            const Foundmatchday = existing.fixture.findIndex(item => item.matchday == matchday);
                            const Foundmatch = existing.fixture[Foundmatchday].teams.findIndex(item => item._id == id);
        
                           
                            
                            const existingmatchday = existing.fixture[Foundmatchday].matchday;

            
                        if (Foundmatchday == -1) {
                            
                            return  res.status(400).json({
                                type: "failed",
                                mgs: "matchday not found ",
          
                            })
                        }
        
                        if (Foundmatchday !== -1) {
                           if (Foundmatch == -1) {
                            return  res.status(400).json({
                                type: "failed",
                                mgs: "match not found ",
          
                            })  }
        
        
                        else if (Foundmatch !== -1 ) {

                            const teams = {home, day: {date, time}, away, referee, stadium, group, stage }
        
                            const fixture =  { matchday,
                            teams: teams   // teams: [{home, time: [{date, time,}], away } ]
            
            }

                     let dd =       await Fixture.findOneAndUpdate({competition, year: existing.year}, 
                                { 
                                  $set: {"fixture.$[day].teams.$[match]": {$set: data, 
                                    day: {date, time}, year, matchday, home, away, group, referee, stadium, stage }} 
                                },
                                { 
                                  "arrayFilters": [
                                    { "day.matchday": existingmatchday },
                                    {"match._id": id}

                                  ]
                                })                   
console.log(dd.teams, 440);
                           }}
        
        
                   //     const save = await existing.save();

                   
                       return  res.status(200).json({
                            type: "success",
                            mgs: "Process successful",
                            data: 'l' //save
                        })
        
    }
            


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
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



router.patch('/player/:id',  async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files?.img  
    const id = {first: req.params.id.split(" ")[0], last: req.params.id.split(" ")[1]}

      

     

    try {
        const {fname, lname, description, teamid, position, number}= data
        const  picture = []

        if (req.files) {

            const image = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'News' },
    
          );
    
    
          picture.push({url: image.secure_url,  imgId: image.public_id})
    
     
          }
      


        console.log(data)


        const fullname = {first: fname, last: lname}



		if (!fullname || !teamid ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


        
        // const db = await Player.findOne({name: req.params.id})

        // const  ex = []


        // if (db.teamId !== teamId) {
        //     ex.push(db.teamId)
        // };

        const save = await Player.findOneAndUpdate({name: id},  {
           $set: data, name: fullname,  picture: picture[0], // exTeamId: ex
        }, { new: true })
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            save,
            message: " successfull ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
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







router.post('/results',  async (req, res)=> {

    const data = req.body  //JSON.parse(req.body.data)

    try {
        const {fixtureId, matchId, matchday, homeScore, awayScore}= data



        const existingFix = await Fixture.findById(fixtureId)

        

        const FoundmatchdayF = existingFix.fixture.findIndex(item => item.matchday == matchday);
       const Foundtime = existingFix.fixture[FoundmatchdayF].teams.findIndex(item => item._id == matchId);



        const {time, home, away, group, stage, referee, stadium, lineup  } = existingFix.fixture[FoundmatchdayF].teams[Foundtime]

        const {competition, type, year} = existingFix

        
        console.log(data, time, home+'z', 'y'+away)

		if (!competition || !fixtureId || !matchId || !homeScore || !awayScore) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


            const existing = await Result.findOne({competition, year})

            const teams =     {
                home: String(home), homeScore: Number(homeScore), 
                time: {date: String(time.date), time: String(time.time)}, 
                awayScore: Number(awayScore), away: String(away), 
                type: String(type), group: String(group), refree: String(referee), stadium: String(stadium), lineup: String(lineup), stage: String(stage), 
            }

                    const result =  [{ matchday,
                    teams: teams    // teams: [{home, time: [{date, time,}], away } ]
    
    }]



                    
               
            
                    if (existing) {


                        //---- Check if index exists ----
                    if (String(existing.type) == "league") {


            //     const teams =     {
            //             home: String(home), homeScore: Number(homeScore), 
            //             time: {date: String(time.date), time: String(time.time)}, 
            //             awayScore: Number(awayScore), away: String(away), 
            //             type: String(type), referee: String(referee), stadium: String(stadium), lineup: String(lineup)
            //         }
        
            //                 const result =  [{ matchday,
            //                 teams: teams    // teams: [{home, time: [{date, time,}], away } ]
            
            // }]
                        const Foundmatchday = existing.result.findIndex(item => item.matchday == matchday);
                        const FoundHome = existing.result[Foundmatchday].teams.findIndex(item => item.home == String(home));
                        const Foundaway = existing.result[Foundmatchday].teams.findIndex(item => item.away == String(away));
        
        
            
            
                        console.log(FoundHome, Foundaway, Foundmatchday);
                        
            
                        if (Foundmatchday == -1) {
                            
                            existing.result.push(result)
        
        
                           //  updateStanding(Standing, competition, year, home, homeScore, away, awayScore, res )
        
                        }
        
                        if (Foundmatchday !== -1) {
        
        
                           if (FoundHome == -1 && Foundaway == -1) {
        
                            console.log(FoundHome, teams );
                            
                                existing.result[Foundmatchday].teams.push(teams ) 
        
        
        
                                //  updateStanding(Standing, competition, year, home, homeScore, away, awayScore, res)
        
        
           
                            }
        
        
                        else if (FoundHome !== -1 || Foundaway !== -1  ) {
                            
                           return  res.status(400).json({
                                type: "failed",
                                mgs: "result added choose different fixtures ",
          
                            })
                           }
                           console.log(existing.result[Foundmatchday].teams, 'tt', );
                           
        
                        }
                                    
        
        
        
        
        
                        const save = await existing.save();
        
        
                            deleteFixture(existingFix, FoundmatchdayF, Fixture, matchId)
        
        
                            updateStanding(Standing, competition, year, home, homeScore, away, awayScore, res )
        
        
        
        
        
        
                       return  res.status(200).json({
                            type: "success",
                            mgs: "Process successful",
                            data: save
                        })
        
        
        
                        
                    }
                    //------------ This creates a new cart and then adds the item to the cart that has been created------------
                    // else {
            
            
        
                
                    //     const save = await Result.create({
                    //         competition, year, result
                    //     })
                    //         // res.redirect("/login")
        
                           
                    //         deleteFixture(existingFix, FoundmatchdayF, Fixture, matchId)
                    //         updateStanding(Standing, competition, year, home, homeScore, away, awayScore, res )
        
                
                    //     return res.status(200).json({
                    //         success: true,
                    //         save,
                    //         message: "created successfully ✅"
                           
                    //     })  
                    
                        
                    // }
        
             else if (String(existing.type) == "cup") {


            //     const teams =     {
            //             home: String(home), homeScore: Number(homeScore), 
            //             time: {date: String(time.date), time: String(time.time)}, 
            //             awayScore: Number(awayScore), away: String(away), 
            //             type: String(type), group: String(group), refree: String(referee), stadium: String(stadium), lineup: String(lineup), stage: String(stage), 
            //         }
        
            //                 const result =  [{ matchday,
            //                 teams: teams    // teams: [{home, time: [{date, time,}], away } ]
            
            // }]
        
        
        
        
                        const Foundmatchday = existing.result.findIndex(item => item.matchday == matchday);
                        const FoundHome = existing.result[Foundmatchday].teams.findIndex(item => item.home == String(home));
                        const Foundaway = existing.result[Foundmatchday].teams.findIndex(item => item.away == String(away));
        
        
            
            
                        console.log(FoundHome, Foundaway, Foundmatchday);
                        
            
                        if (Foundmatchday == -1) {
                            
                            existing.result.push(result)
       
        
        
                        }
        
                        if (Foundmatchday !== -1) {
        
        
                           if (FoundHome == -1 && Foundaway == -1) {
        
                            console.log(FoundHome, teams );
                            
                                existing.result[Foundmatchday].teams.push(teams ) 
        
        
        
                                //  updateStanding(Standing, competition, year, home, homeScore, away, awayScore, res)
        
        
           
                            }
        
        
                        else if (FoundHome !== -1 || Foundaway !== -1  ) {
                            updateCupStanding(CupStanding, competition, year, home, homeScore, away, awayScore, group, res )

                           return  res.status(400).json({
                                type: "failed",
                                mgs: "result added choose different fixtures ",
          
                            })
                           }
                           console.log(existing.result[Foundmatchday].teams, 'tt', );
                           
        
                        }
                                    
        
        
        
        
        

                        
                        if (String(stage) !== "knockout") {
                            updateCupStanding(CupStanding, competition, year, home, homeScore, away, awayScore, group, res )

                         }
        
        
                          //  deleteFixture(existingFix, FoundmatchdayF, Fixture, fixtureId)
        
        
        
        
        
        
                                const save = await existing.save();

        
                       return  res.status(200).json({
                            type: "success",
                            mgs: "Process successful",
                            data: save
                        })
        
        
        
                        
                    
                    //------------ This creates a new cart and then adds the item to the cart that has been created------------

        
            }


            }    else {
            
            
        
                
                        const save = await Result.create({
                            competition, year, result, type: String(type)
                        })
                            // res.redirect("/login")
        
                            
                            if (String(save.type) == "league") {
                                updateStanding(Standing, competition, year, home, homeScore, away, awayScore, group, res )
 
                             }

                             else if (String(save.type) == "cup") {

                                   if (String(stage) !== "knockout") {
                                updateCupStanding(CupStanding, competition, year, home, homeScore, away, awayScore, group, res )
 
                             }
                             }

                          

                           
                            // deleteFixture(existingFix, FoundmatchdayF, Fixture, fixtureId)
        
                
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

})





router.patch('/team/:id', async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files?.img  
      
     

    try {
        const {name, description}= data
        const logo = []

        if (req.files) {

            const image = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'News' },
    
          );
    
    
          picture.push({url: image.secure_url,  imgId: image.public_id})
    
     
          }
 
      

		if (!name  ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


        const save = await Team.findOneAndUpdate({name: req.params.id}, {
            $set: data, logo: logo[0]
        }, { new: true });
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            save,
            message: "successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  
})
































module.exports = router;
