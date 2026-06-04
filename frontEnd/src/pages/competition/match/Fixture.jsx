import React, { useState, useEffect } from "react";
import Style from "../../../styles/Match.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from "../../../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Footer from "../../../components/sub component/Footer";
import { CompetitionFixtures, CompetitionNews, CompetitionResults, CompetitionTable } from "../../../components/sub component/Competitionview";
import { MatchCompetition, MatchEventAway, MatchEventHome, MatchScore, MatchTeam, MatchTime } from "../../../components/sub component/list/Matchlist";
import { TeamSquadList } from "../../../components/sub component/list/Teamviewlist";
import { LineUp } from "../../../components/sub component/Matchview";
import { io } from 'socket.io-client'




const Fixture  =  ({})  =>  {
    const [mode, setInputs] = useState({home: true, away: true, });
    const [user, setUser] = useState({admin: false, team: false, })
    

    const [competition, setRegion] = useState({})
    const [data2, setData2] = useState([])
    const [match, setMatch] = useState({})

    const [set, setset] = useState('')
    const [screenSize, setScreenSize] = useState({width: window.innerWidth, height: window.innerHeight,});

    var width = window.innerWidth
    
    const {id, matchId, matchday} = useParams()

    const region =id?.replaceAll('-',' ');


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + region)
            .then((res) =>  res.json())
            .then((data) => setRegion(data));

            fetch(process.env.REACT_APP_API_LINK  + "getall/news/" )
            .then((res) =>  res.json())
            .then((data) => setData2(data.data));
  
            fetch(process.env.REACT_APP_API_LINK + "getone/" + region + "/fixture/" + matchId)
            .then((res) =>  res.json())
            .then((data) => setMatch(data));
        }, []);



        useEffect(() => {
            const socket = io(process.env.REACT_APP_API_LINK)
          //( "ws://football-api-alpha.vercel.app" ) //"ws://"+  process.env.REACT_APP_API_LINK_SOCKET)
        
            socket.on('connnection', () => {
              console.log('connected to server');
            })
        
            socket.on('match updated' + matchId, (update) => {
              setMatch(update )
              console.log(update);
              
            })
        
            socket.on('message', (message) => {
              console.log(message);
            })
        
            socket.on('disconnect', () => {
              console.log('Socket disconnecting');
            })
        
          }, [])


        
                useEffect(() => {
        
                        fetch(process.env.REACT_APP_API_LINK + 'getaccess/admin', {
                            method: 'GET',
                            credentials: "include",
                            headers: {'Content-Type': 'application/json'},
                             }).then((res) => {
                            if (res.status === 200) {
                                setUser({admin: true})
            
                            } 
                 })    
        
        
                 fetch(process.env.REACT_APP_API_LINK + 'getaccess/team', {
                    method: 'GET',
                    credentials: "include",
                    headers: {'Content-Type': 'application/json'},
                     }).then((res) => {
                    if (res.status === 200) {
                        setUser({team: true})
        
                    } 
        
         })  
        
                         
                    
                      
                 },   []);
  





                 console.log(match);
                 





        const handleChange = (event) => {
            const name = event.target.innerHTML.toLowerCase();
    
            setInputs({home: false, away: false, });
            setInputs(values => ({...values, [name]: true}))
          }
            




            
              useEffect(() => {
                const handleResize = () => {
                  setScreenSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                  });
          
                  widths()
                };
          
          
                widths()
          
            
                window.addEventListener('resize', handleResize);
          
            
            
                // Clean up the event listener when the component unmounts
                return () => {
                  window.removeEventListener('resize', handleResize);
                };
              }, [width]);






          
              function widths() {
                if (screenSize.width <= 650) {


                    setInputs({home: true, away: false, });


                } else {
                    setInputs({home: true, away: true, });

                }


              }
            
          
    
    

         
        

        // useEffect(() => {
        //     fetch(process.env.REACT_APP_API_LINK  + "getall/product")
        //     .then((res) =>  res.json())
        //     .then((data) => setproduct(data.data));
        // }, []);
    
 

    //  useEffect(() => {
    //     fetch(process.env.REACT_APP_API_LINK  + "getone/wishlist/" + link, {
    //         credentials: "include",
    //         headers: { "Content-type": "application/json; charset=UTF-8", },
    //     }).then((res) =>  res.json())
    //     .then((data) =>  {
    //         if (data.data == "true") {
    //             setwish(faX)
    //             setset("active")
    //         } else {
    //             setwish(faHeart)
    //             setset("false")
    //         }
    //     } );
    // }, []);
    //      function wish(e) {
    //         e.preventDefault()
    //         const  mood = wishlist.iconName


    //         if (mood == "heart") {
    //             fetch(process.env.REACT_APP_API_LINK + "add/wishlist", {
    //             method: "POST",
    //             credentials: "include",
    //             headers: {
    //               "Content-type": "application/json",
    //             },
    //             body: JSON.stringify({productId: data._id }),
    //          }).then((res) =>  res.json())
    //          .then( ()=> setwish(faX))



    //         } else {
    //             fetch(process.env.REACT_APP_API_LINK + "del/wishlist", {
    //                 method: "DELETE",
    //                 credentials: "include",
    //                 headers: {
    //                   "Content-type": "application/json",
    //                 },
    //                 body: JSON.stringify({productId: data._id }),
    //              }).then((res) =>  res.json())
    //              .then( ()=> setwish(faHeart))
    //         }



    //    }


    function timeline (props) {
        if (props == 'goal'  ) {
            return require("../../../img/match/goal.png") 
        } else if (props ==   'red' ) {
            return require("../../../img/match/red card.png") 

        } else if (props == "yellow" ) {
            return require("../../../img/match/yellow card.png") 

        } else if (props ==  "substitution") {
            return require("../../../img/match/substitution.png") 

        }

    

    }

    return (
        <div>
         <Nav />
            <div className={Style.app}>











                         <div className={Style.top}>

                                <MatchCompetition name={competition.name} logo={competition.logo && competition.logo[0].url} />

                                <div className={Style.head} >


                            
                                <MatchTeam name={match.match?.home.name} logo={match.match?.home.logo[0].url} />


                                { match.match?.start ? <MatchScore home={match.match?.homeScore} away={match.match?.awayScore} 
                                
                                    time={ match.match?.live ? match.match?.time.now : null} half={match.match?.half} />
                                 : <MatchTime day={match.match?.day?.date.slice(0, 10).replaceAll('-','/')} time={match.match?.day?.time} />
                                }
                                <MatchTeam name={match.match?.away.name} logo={match.match?.away.logo[0].url} />


                                <hr />

                                
                { user.team ?   <button className={Style.update} > <Link to={"update"} > Update </Link> </button> : null
                }
                                

                                    
                               
                                
                                </div>

    
         
         
      
  
                         </div>

         <div className={Style.section} >


            <div className={Style.events} >

                <h2 > Timeline</h2>

                { (match.match?.timeline?.length !== 0) ?
                                    <div className={Style.timeline}>

                    
                    

                                    {match.match?.timeline?.slice()?.reverse()?.map((props) => (
                                    
                                    (props.team == "home") ? <MatchEventHome time={props.time.time + ((props.time?.et !== 0) ? '+' + props.time?.et : null)} img={timeline(props.action) } name={ props.player?.main.name?.last?.slice(0,1) + ". "+ props.player?.main.name?.first } assist={props.player?.assist ? props.player?.assist?.name?.last?.slice(0,1) + ". "+ props.player?.assist?.name?.first : null} />  :
                                    (props.team == "away") ? <MatchEventAway time={props.time.time + ((props.time?.et !== 0) ? '+' + props.time?.et : null)} img={timeline(props.action) } name={ props.player?.main.name?.last?.slice(0,1) + ". "+ props.player?.main.name?.first } assist={props.player?.assist ? props.player?.assist?.name?.last?.slice(0,1) + ". "+ props.player?.assist?.name?.first : null} /> :
                                    null
                                                        
                                    
                                    )   )   }    
                
                                </div> :   <h1 > no timeline availabe</h1>
                }


            </div>

            <div className={Style.lineups} >
                <h2> Line-ups </h2>


                    <div className={Style.list}>
               
                               <ul >
                                   <li onClick={handleChange}  >Home</li>
                                   <li onClick={handleChange} >Away</li>
               
                               </ul>
            
               
                   </div>


                   <div className={Style.lineup} >




                    { mode.home ?                  
                      (match.match?.lineup?.starting?.home?.length !== 0 && match.match?.lineup?.sub?.home?.length !== 0) ?
                        <div className={Style.home} >

                        <LineUp data={match.match?.lineup?.starting?.home} type={"Starting"} team={"Home"} />

                        <LineUp data={match.match?.lineup?.sub?.home} type={"Sub"} team={"Home"} />


                    </div> 
                          :   <h1 > no lineup availabe</h1> : null
                }



                    




                    { mode.away ?                  
                      (match.match?.lineup?.starting?.away?.length !== 0 && match.match?.lineup?.sub?.away?.length !== 0) ?
                       <div className={Style.away} >

                        <LineUp data={match.match?.lineup?.starting?.away} type={"Starting"} team={"Away"}/>

                        <LineUp data={match.match?.lineup?.sub?.away} type={"Sub"} team={"Away"} />


                        </div>
                          :   <h1 > no lineup availabe</h1> : null
                }


                   </div>



            </div>

     
     



         </div>






     </div>

     <Footer />
        </div>

    )
}




export default Fixture
