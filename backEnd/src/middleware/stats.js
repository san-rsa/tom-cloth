const Player = require("../models/competition/player");
const Stat = require("../models/competition/stats");



async function statsD (competition, year) {
              const existing = await Stat.findOne({competition, year})
                   if (existing) {
                      return existing 
                    } else {
                       return  await Stat.create({
                         competition,  year, 
                        })
                        }
                                                   
               }

function win(existing, groupName, teamId, ws, ls ) {
    
    const group = existing.group.findIndex(item => item.group == String(groupName));


    const team = existing.group[group].standing.findIndex(item => item.teams == teamId);


    console.log(group, team );

    const dif = ws - ls


    existing.group[group].standing[team].stats.played = existing.group[group].standing[team].stats.played + 1;
    existing.group[group].standing[team].stats.win = existing.group[group].standing[team].stats.win + 1;
    existing.group[group].standing[team].stats.points = existing.group[group].standing[team].stats.points + 3;
    existing.group[group].standing[team].stats.gd = existing.group[group].standing[team].stats.gd + dif
    existing.group[group].standing[team].stats.gs = existing.group[group].standing[team].stats.gs + Number(ws);
    existing.group[group].standing[team].stats.ga = existing.group[group].standing[team].stats.ga + Number(ls);

    existing.group[group].standing[team].stats.form.push('W')
    


  }



  function loss(existing,groupName, teamId, ws, ls) {

    const group = existing.group.findIndex(item => item.group == groupName);

    const team = existing.group[group].standing.findIndex(item => item.teams == teamId);


    const dif = ls - ws

    existing.group[group].standing[team].stats.played = existing.group[group].standing[team].stats.played + 1;
    existing.group[group].standing[team].stats.loss = existing.group[group].standing[team].stats.loss + 1;
    existing.group[group].standing[team].stats.gd = existing.group[group].standing[team].stats.gd + dif
    existing.group[group].standing[team].stats.gs = existing.group[group].standing[team].stats.gs + Number(ls);
    existing.group[group].standing[team].stats.ga = existing.group[group].standing[team].stats.ga + Number(ws);


    existing.group[group].standing[team].stats.form.push('L')


  }


  function draw(existing, groupName,teamId, ws, ls) {

    const group = existing.group.findIndex(item => item.group == groupName);

    const team = existing.group[group].standing.findIndex(item => item.teams == teamId);


    existing.group[group].standing[team].stats.played = existing.group[group].standing[team].stats.played + 1;
    existing.group[group].standing[team].stats.draw = existing.group[group].standing[team].stats.draw + 1;
    existing.group[group].standing[team].stats.points = existing.group[group].standing[team].stats.points + 1;
    existing.group[group].standing[team].stats.gs = existing.group[group].standing[team].stats.gs + Number(ws);
    existing.group[group].standing[team].stats.ga = existing.group[group].standing[team].stats.ga + Number(ls);

    existing.group[group].standing[team].stats.form.push('D')


  }





  async function update(table, group, h, hms, aws, a) {


    
    if (hms > aws) {

      win(table, group, h, hms, aws )
      loss(table, group, a, hms, aws)
                  

    } else if (hms < aws) {
      
      win(table, group, a, aws, hms )
      loss(table, group, h, aws, hms)



    } else if (hms == aws ) {
      draw(table, group, h, hms, aws )
      draw(table, group, a, hms, aws)
    }
      
  };

                                               async function updateStat (match, statsDb) {
                                                    // lineup
                                                if (match.lineup.starting.home.length !== 0) {


                                                    for (let i = 0; i < match.lineup.starting.home.length; i++) {
                                                        const element = match.lineup.starting.home[i];
    
                                                        const existingPlayer = await Player.findOne({_id: element})        
                                                        const stats = {player: element, team: existingPlayer.teamId, 
                                                          
                                                          played: 1, goal: 0, assist: 0, yellow: 0, red: 0, motm: 0, potm: 0, }
                                                
                                                      
                                                                            
                                                                          const Foundplayer = statsDb.stats.findIndex(item => item.player == element);
                                                                        
                                                                          console.log(Foundplayer);
                                                                          
                                                            
                                                                        if (Foundplayer == -1) {
                                                                            
                                                                           statsDb.stats.push(stats)
                                                                        }
                                                        
                                                                        if (Foundplayer !== -1) {
                                                                         
                                                                           statsDb.stats[Foundplayer].played = statsDb.stats[Foundplayer].played + 1;                           
                                                        
                                                                        }

                                                        
                                                    }         

                                                }

                                                if (match.lineup.starting.away.length !== 0) {
                                                    for (let i = 0; i < match.lineup.starting.away.length; i++) {
                                                        const element = match.lineup.starting.away[i];
    
                                                     // updatePlayerPlayed(statsDb, element)

                                                     
                                                             const existingPlayer = await Player.findOne({_id: element})        
                                                             const stats = {player: element, team: existingPlayer.teamId, 
                                                               
                                                               played: 1, goal: 0, assist: 0, yellow: 0, red: 0, motm: 0, potm: 0, }
                                                     
                                                           
                                                                                 
                                                                               const Foundplayer = statsDb.stats.findIndex(item => item.player == element);
                                                                             
                                                                               console.log(Foundplayer);
                                                                               
                                                                 
                                                                             if (Foundplayer == -1) {
                                                                                 
                                                                                statsDb.stats.push(stats)
                                                                             }
                                                             
                                                                             if (Foundplayer !== -1) {
                                                                              
                                                                                statsDb.stats[Foundplayer].played = statsDb.stats[Foundplayer].played + 1;                           
                                                             
                                                                             }
                                                                            
                                                     


                                                    }   

                                                }

                                                // .........................

                                                

                                                //  action stats




                                                for (let i = 0; i < match.timeline.length; i++) {
                                                    const element = match.timeline[i];

                                                    if (element.action == "goal") {
                                                       // updatePlayerGoal(statsDb, element.player.main)

                                                       const existingPlayer = await Player.findOne({_id: element.player.main})
                                                       const stats = {player: element.player.main, team: existingPlayer.teamId, 
                                                         
                                                         played: 0, goal: 1,   assist: 0,   yellow: 0,   red: 0,   motm: 0,   potm: 0,}
                                                      
                                                           
                                                                       //---- Check if index exists ---- 
                                                                           
                                                                         const Foundplayer = statsDb.stats.findIndex(item => item.player == element.player.main);
                                                                       
                                                           
                                                                       if (Foundplayer == -1) {
                                                                           
                                                                           statsDb.stats.push(stats)
                                                                       }
                                                       
                                                                       if (Foundplayer !== -1) {
                                                                        
                                                                         statsDb.stats[Foundplayer].goal = statsDb.stats[Foundplayer].goal + 1;
                                                                            
                                                       
                                                                       }
                                                        
                                                    if (element.player.assist) {
                                                       // updatePlayerAssist(statsDb, element.player.assist)

                                                       const existingPlayer = await Player.findOne({_id: element.player.assist})

                                                       const stats = {player: element.player.assist, team: existingPlayer.teamId, 
        
                                                        played: 0, goal: 0, assist: 1, yellow: 0, red: 0, motm: 0, potm: 0,  }
                                                   
                                                                      //---- Check if index exists ---- 
                                                                          
                                                                        const Foundplayer = statsDb.stats.findIndex(item => item.player == element.player.assist);
                                                                      
                                                          
                                                                      if (Foundplayer == -1) {
                                                                          
                                                                          statsDb.stats.push(stats)
                                                                      }
                                                      
                                                                      if (Foundplayer !== -1) {
                                                                       
                                                                        statsDb.stats[Foundplayer].assist = statsDb.stats[Foundplayer].assist + 1;                         
                                                      
                                                                      }
    
                                                    }
                                                    }
                                                     else if (element.action == "red") {
                                                       // updatePlayerRedCard(statsDb, element.player.main)

                                                       const existingPlayer = await Player.findOne({_id: element.player.main})
                                                       const stats = {player: element.player.main, team: existingPlayer.teamId, 
                                                           
                                                           played: 0,   goal: 0,   assist: 0,   yellow: 0,   red: 1,   motm: 0,   potm: 0,}
                                                      
                                                    
                                                                           const Foundplayer = statsDb.stats.findIndex(item => item.player == element.player.main);
                                                                         
                                                             
                                                                         if (Foundplayer == -1) {
                                                                             
                                                                             statsDb.stats.push(stats)
                                                                         }
                                                         
                                                                         if (Foundplayer !== -1) {
                                                                          
                                                                           statsDb.stats[Foundplayer].red = statsDb.stats[Foundplayer].red + 1;
                                                         
                                                                            
                                                         
                                                                         }

                                                    } 
                                                    else if (element.action == "yellow") {
                                                       // updatePlayerYellowCard(statsDb, element.player.main)

                                                       const existingPlayer = await Player.findOne({_id: element.player.main})
                                                       const stats = {player: element.player.main, team: existingPlayer.teamId, 
                                                           
                                                           played: 0,   goal: 0,   assist: 0,   yellow: 1,   red: 0,   motm: 0,   potm: 0,}
                                                      
                                                                         //---- Check if index exists ---- 
                                                                             
                                                                           const Foundplayer = statsDb.stats.findIndex(item => item.player == element.player.main);
                                                                         
                                                             
                                                                         if (Foundplayer == -1) {
                                                                             
                                                                             statsDb.stats.push(stats)
                                                                         }
                                                         
                                                                         if (Foundplayer !== -1) {
                                                                          
                                                                           statsDb.stats[Foundplayer].yellow = statsDb.stats[Foundplayer].yellow + 1;
                                                         
                                                                            
                                                         
                                                                         }

                                                    } 
                                                    else if (element.action == "substitution") {
                                                      //  updatePlayerPlayed(statsDb, element.player.main)

                                                          
                                                      const existingPlayer = await Player.findOne({_id: element.player.main})        
                                                      const stats = {player: element.player.main, team: existingPlayer.teamId, 
                                                        
                                                        played: 1, goal: 0, assist: 0, yellow: 0, red: 0, motm: 0, potm: 0, }
                                              
                                                    
                                                                          
                                                                        const Foundplayer = statsDb.stats.findIndex(item => item.player == element.player.main);
                                                                      
                                                                        console.log(Foundplayer);
                                                                        
                                                          
                                                                      if (Foundplayer == -1) {
                                                                          
                                                                         statsDb.stats.push(stats)
                                                                      }
                                                      
                                                                      if (Foundplayer !== -1) {
                                                                       
                                                                         statsDb.stats[Foundplayer].played = statsDb.stats[Foundplayer].played + 1;                           
                                                      
                                                                      }

                                                    }
                                                    else {return null}
                                                }


                                

                                
                                           //        deleteFixture(existing, Foundmatchday, Fixture, id)


                                           statsDb.save()

  

                                                }


async function updatePlayerPlayed(existing, playerId) {  //vvvvvvv
  
    try {

        const existingPlayer = await Player.findOne({_id: playerId})        
        const stats = {player: playerId, team: existingPlayer.teamId, 
          
          played: 1, goal: 0, assist: 0, yellow: 0, red: 0, motm: 0, potm: 0, }

      
     
                    if (existing) {
                        //---- Check if index exists ---- 
                            
                          const Foundplayer = existing.stats.findIndex(item => item.player == playerId);
                        
                          console.log(Foundplayer);
                          
            
                        if (Foundplayer == -1) {
                            
                            existing.stats.push(stats)
                        }
        
                        if (Foundplayer !== -1) {
                         
                          existing.stats[Foundplayer].played = existing.stats[Foundplayer].played + 1;                           
        
                        }


                        return existing 
                                       
        }
            


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "registration failed"
        })
       
   }  




}


async function updatePlayerGoal(existing, playerId) {
  
  try {


      const existingPlayer = await Player.findOne({_id: playerId})
      const stats = {player: playerId, team: existingPlayer.teamId, 
        
        played: 0, goal: 1,   assist: 0,   yellow: 0,   red: 0,   motm: 0,   potm: 0,}
     
          
                      //---- Check if index exists ---- 
                          
                        const Foundplayer = existing.stats.findIndex(item => item.player == playerId);
                      
          
                      if (Foundplayer == -1) {
                          
                          existing.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        existing.stats[Foundplayer].goal = existing.stats[Foundplayer].goal + 1;
                           
      
                      }
                                   
          


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}


async function updatePlayerAssist(existing, playerId) {
  
  try {



      const existingPlayer = await Player.findOne({_id: element})
      const stats = {player: element, team: existingPlayer.teamId, 
        
        played: 0, goal: 0, assist: 1, yellow: 0, red: 0, motm: 0, potm: 0,  }
   
                      //---- Check if index exists ---- 
                          
                        const Foundplayer = statsDb.stats.findIndex(item => item.player == element);
                      
          
                      if (Foundplayer == -1) {
                          
                          statsDb.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        statsDb.stats[Foundplayer].assist = statsDb.stats[Foundplayer].assist + 1;                         
      
                      }
                                   
      
          


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}


async function updatePlayerYellowCard(existing, playerId) {
  
  try {

    const existingPlayer = await Player.findOne({_id: element.player.main})
    const stats = {player: element.player.main, team: existingPlayer.teamId, 
        
        played: 0,   goal: 0,   assist: 0,   yellow: 1,   red: 0,   motm: 0,   potm: 0,}
   
                      //---- Check if index exists ---- 
                          
                        const Foundplayer = statsDb.stats.findIndex(item => item.player == element.player.main);
                      
          
                      if (Foundplayer == -1) {
                          
                          statsDb.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        statsDb.stats[Foundplayer].yellow = statsDb.stats[Foundplayer].yellow + 1;
      
                         
      
                      }
                                   
      


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}


async function updatePlayerRedCard(existing, playerId) {
  
  try {

    const existingPlayer = await Player.findOne({_id: element.Player.main})
    const stats = {player: element.Player.main, team: existingPlayer.teamId, 
        
        played: 0,   goal: 0,   assist: 0,   yellow: 0,   red: 1,   motm: 0,   potm: 0,}
   
 
                        const Foundplayer = existing.stats.findIndex(item => item.player == element.Player.main);
                      
          
                      if (Foundplayer == -1) {
                          
                          statsDb.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        statsDb.stats[Foundplayer].red = statsDb.stats[Foundplayer].red + 1;
      
                         
      
                      }
 
          


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}


async function updatePlayerManOfTheMatch(existing, playerId) {
  
  try {
    const existingPlayer = await Player.findOne({_id: playerId})
    const stats = {player: playerId, team: existingPlayer.teamId, 
        
        played: 0,
        goal: 0,
        assist: 0,
        yellow: 0,
        red: 0,
        motm: 1,
        potm: 0, 
    }
   
   
                  
             
          
                  if (existing) {
                      //---- Check if index exists ---- 
                          
                        const Foundplayer = existing.stats.findIndex(item => item.player == playerId);
                      
          
                      if (Foundplayer == -1) {
                          
                          existing.stats.push(stats)
                      }
      
                      if (Foundplayer !== -1) {
                       
                        existing.stats[Foundplayer].motm = existing.stats[Foundplayer].motm + 1;
      
                         console.log(existing, 'tt,' );
                         
      
                      }
                                   
      }
          


  } catch (error) {
      console.error(error)
      return res.status(500).json({
          success: false,
          message : "registration failed"
      })
     
 }  




}








  module.exports = { update, statsD, updatePlayerPlayed, updatePlayerGoal, updatePlayerAssist, updateStat,
    updatePlayerYellowCard, updatePlayerRedCard, updatePlayerManOfTheMatch, // updatePlayerPlayerOfTheMatch, 
  
  };