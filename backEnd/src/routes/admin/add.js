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




const Cloth = require('../../models/clothes')
const Category = require('../../models/category')













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





 



router.post('/banner',  async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {head, body}= data
        const imgUrl = []

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Banner' },

      );


      imgUrl.push({url: image.secure_url,  imgId: image.public_id})

 
      


        console.log(data)

		if (!head || !imgUrl ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await Banner.findOne({head})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "banner already exists"
            })
        }

        const banner = await Banner.create({
            head, body, imgUrl: imgUrl[0]
        })
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            banner,
            message: "banner created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "banner registration failed"
        })
       
   }  
})




router.post('/cloth', async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const color = JSON.parse(req.body.color)
    const size = JSON.parse(req.body.size)
    const specs = JSON.parse(req.body.specs)


    const file = req.files?.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }      
    

    try {
        const {name, description, gender, age, type,  categoryId, available, } = data
        const imgUrl = []





        console.log(data, color, size, file, specs, )

		if (!name || !type, !description || !gender || !age || !categoryId || !available ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


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
            console.log(imgUrl, )


 



        console.log(data, imgUrl, size, color, )


        const colors = []


         color.forEach(element => {
                // Object.values(updatecolor)

                colors.push(element.color)

            });
        //check if use already exists?
        const existingItem = await Cloth.findOne({name})

        if(existingItem){
            return res.status(400).json({
                success: false,
                message: " already exists"
            })
        }

        const db = await Cloth.create({
           name, description, type, available, categoryId, img: imgUrl, gender, age, type, color: colors, size, specs
        })
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            db,
            message: " created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : " registration failed"
        })
       
   }  
})


router.post('/category',  async (req, res)=> {

     const data = JSON.parse(req.body.data)
        const file = req.files.img 

    console.log(file);
            
        if (!req.files) {
            // No file was uploaded
            return res.status(400).json({ error: "No file uploaded" });
          }
         

    try {
            const {name}= data
            const imgUrl = []
    
            const image = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'Category' },
          );
    
    
          imgUrl.push({url: image.secure_url,  imgId: image.public_id})
    
                          console.log(image)
    
    
        
        // Check if All Details are there or not

        if (!name || !imgUrl) {
            return res.status(403).json({
                success: false,
                message: "All Fields are required",
            });
        }

        //check if use already exists?
        const existingItem = await Category.findOne({name})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "category  already exists"
            })
        }

        console.log(imgUrl);
        



        const cat = await Category.create({
            name, slug: name, imgUrl: imgUrl[0]
        })
        

        return res.status(200).json({
            success: true,
            cat,
            message: "category  created successfully ✅"
           
        })  
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "category  registration failed"
        })
       
   }  
})




router.post('/add-user-to-admin', async (req, res)=> {

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
        

        existingUser.role = process.env.ADMIN


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


router.post('/sub-competition', async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files?.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {name, bio,  type, region}= data
        const logo = []




        console.log(data)

		if (!name || !region ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


        const image = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: 'Banner' },
    
          );


      logo.push({url: image.secure_url,  imgId: image.public_id})

 
      
        //check if use already exists?
        const existingItem = await Sub_Region.findOne({name})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "already exists"
            })
        }

        const save = await Sub_Region.create({
           name, regionId: region, bio, pictures: logo[0]
        })
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



router.post('/fixture',  async (req, res)=> {

    const data = JSON.parse(req.body.data)

    try {
        const {competition, year, matchday, home, time, date, away, group, referee, stadium, stage}= data

        
        console.log(data)




		if (!year || !competition ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        if (home == away ) {
            return res.status(403).json({
				success: false,
				message: "team is the same ",
			});
        }


        const existingCompetition = await Competition.findOne({name: competition})

        


     
                const existing = await Fixture.findOne({competition, year})

                const min = { 
                    first: existingCompetition.min.ft, 
                    second: existingCompetition.min.ft + existingCompetition.min.ft,  
                    firstET: existingCompetition.min.et,  
                    secondET: existingCompetition.min.et + existingCompetition.min.et
                }


                const teams = {home, day: {date, time}, time: min, away, referee, stadium, group, stage }
        
                            const fixture =  { matchday,
                            teams: teams   // teams: [{home, time: [{date, time,}], away } ]
            
            }
        
        
                    
               
            
                    if (existing) {
                        //---- Check if index exists ----
        
                            
                            const Foundmatchday = existing.fixture.findIndex(item => item.matchday == matchday);
        
        
                        
            
                        if (Foundmatchday == -1) {
                            console.log(Foundmatchday, fixture,  'd', );

                            
                            existing.fixture.push(fixture)
                        }
        
                        if (Foundmatchday !== -1) {
                         const FoundHome = existing.fixture[Foundmatchday].teams.findIndex(item => item.home == home);
                         const Foundaway = existing.fixture[Foundmatchday].teams.findIndex(item => item.away == away);
        
                           if (FoundHome == -1 && Foundaway == -1) {

                            console.log(FoundHome, Foundaway, 'd2', );

                                existing.fixture[Foundmatchday].teams.push(teams) 
        
           
                            }
        
        
                        else if (FoundHome !== -1 || Foundaway !== -1  ) {
                            
                           return  res.status(400).json({
                                success: false,
                                message: "team added choose different team",
          
                            })
                           }
                           console.log(existing, 'tt', );
                           
        
                        }
                                    

        
                        const save = await existing.save();
                       return  res.status(200).json({
                            success: true,
                            message: "Process successful",
                            data: save
                        })
        
        
        
                        
                    } else {
            
            
        
                
                        const save = await Fixture.create({
                            competition,  year, fixture, type:  String(existingCompetition.type)
                        })
                            // res.redirect("/login")
                
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



router.post('/news', async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {head, body, teamid, region}= data
        const imgUrl = []


 
      


        console.log(data)

		if (!head || !body || !req.files ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await News.findOne({head})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: " already exists"
            })
        }



        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'News' },

      );

      imgUrl.push({url: image.secure_url,  imgId: image.public_id})




        const banner = await News.create({
            head, body, imgUrl: imgUrl[0], ref_Region: region, ref_Team: teamid
        })
            // res.redirect("/login")

        return res.status(200).json({
            success: true,
            banner,
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





router.post('/player',   async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files.img  

      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {fname, lname, dob,  teamid, position, number}= data
        const  picture = []







		if (!fname || !lname || !picture ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}


        const fullname = {first: fname, last: lname}





        //check if use already exists?
        const existingItem = await Player.findOne({name: fullname})

        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "already exists"
            })
        }

        const existingTeam = await Team.findOne({name: teamid})



        if(!existingTeam){
            return res.status(400).json({
                success: false,
                message: "team not found"
            })
        }


        console.log(data)

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Banner' },

      );


      picture.push({url: image.secure_url,  imgId: image.public_id})

 



        const save = await Player.create({
           name: fullname , teamId: existingTeam.name, dob, position, number, picture: picture[0]
        })




        existingTeam.playerId.push(save._id)


        existingTeam.save()
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






router.post('/team', async (req, res)=> {

    const data = JSON.parse(req.body.data)
    const file = req.files.img  
      
    
    if (!req.files) {
        // No file was uploaded
        return res.status(400).json({ error: "No file uploaded" });
      }
     

    try {
        const {name, description, regionId}= data
        const logo = []

        const image = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: 'Banner' },

      );


      logo.push({url: image.secure_url,  imgId: image.public_id})

 
      


        console.log(data)

		if (!name || !logo ) {
			return res.status(403).json({
				success: false,
				message: "All Fields are required",
			});
		}

        //check if use already exists?
        const existingItem = await Team.findOne({name})
        if(existingItem){
            return res.status(400).json({
                success: false,
                message: "already exists"
            })
        }

        const save = await Team.create({
           name, description, regionId , logo: logo[0]
        })
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







module.exports = router;
