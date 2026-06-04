import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Matchupdate.module.css"
import { CardList4 } from "./Generallist";
import Nav from "../Nav";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { AdminAddAdmin, AdminAddTeamToRegion, AdminAddUserToTeam } from "../Profileadminview";
import { AddMatchResultGoal, AddMatchResultLineup, AddMatchResultRed, AddMatchResultSub, AddMatchResultYellow } from "../Resultupdate";
import { AddMatchEnd, AddMatchGoal, AddMatchLineup, AddMatchRed, AddMatchStart, AddMatchSub, AddMatchYellow } from "../Matchupdate";





const MatchUpdateList = () => {



    return (
        <div className={Style.app}>

            <Nav />


            <h1 > Update Match</h1>



            <div className={Style.list}  >  

                        
            <CardList4
                name={"lineups"} logo={ require("../../../img/match/tactics1.png")} category={"line-up"} link={"lineup" } />  

            <CardList4
                name={"start"} logo={require("../../../img/match/whistle.png")} category={"begin"} link={"start" } /> 

            {/* <CardList4
                name={"extra time"} logo={require("../../../img/match/extra time1.png")} category={"injury time"} link={"extra-time" } />   */}

           {/* <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />  

             <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />  

            <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />  

            <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />   */}



            <CardList4
               name={"goal"} logo={require("../../../img/match/goal1.png")} category={"goal"} link={"goal" } />  


            <CardList4
               name={"yellow card"} logo={require("../../../img/match/yellow card.png")} category={"foul"} link={"yellow" } /> 

            <CardList4
               name={"red card"} logo={require("../../../img/match/red card.png")} category={"foul"} link={"red" } /> 

            <CardList4
               name={"substitution"} logo={require("../../../img/match/substitution1.png")} category={"sub"} link={"substitution" } />  

            <CardList4
               name={"end"} logo={require("../../../img/match/whistle1.png")} category={"end match"} link={"end" } />  


                      

  </div>
         <Footer />


  </div>

                
 

    )
}



const MatchUpdate = ({}) => {

    const [data, setData] = useState([])
    const [mode2, setType] = useState({start: false, end: false, "extra-time": false, lineup: false, yellow: false, red: false, substitution: false, goal: false,   });
    const [user, setUser] = useState({team: false, })    
    const [match, setMatch] = useState({})

    const [competition, setRegion] = useState({})
    


    const {id, matchId, matchday, type} = useParams()
    const region =id?.replaceAll('-',' ');





            useEffect(() => {                         
                setType(values => ({...values, [type]: true}))

                fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + region)
                .then((res) =>  res.json())
                .then((data) =>  setRegion(data))
 


            fetch(process.env.REACT_APP_API_LINK + 'getaccess/team', {
            method: 'GET',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
             }).then((res) => {
            if (res.status === 200) {
                setUser({team: true})

            } 
        })


        fetch(process.env.REACT_APP_API_LINK + "getone/" + region + "/fixture/" + matchId)
        .then((res) =>  res.json())
        .then((data) => setMatch(data));

            }, []);






    




    return (
        <div className={Style.app}>

            <Nav />
                      
            { mode2.lineup &&  <AddMatchLineup competition={competition} match={match} matchId={matchId}  matchday={matchday} /> } 

            { mode2.start &&  <AddMatchStart competition={competition} match={match}matchId={matchId}  matchday={matchday}  /> } 
{/* 
            { mode2["extra-time"] &&  <AddMatchExtraTime competition={competition} match={match} matchId={matchId}  matchday={matchday} /> }  */}

            { mode2.red &&  <AddMatchRed competition={competition} match={match} matchId={matchId} matchday={matchday}  /> } 

            { mode2.yellow &&  <AddMatchYellow competition={competition} match={match} matchId={matchId}  matchday={matchday} /> } 

            { mode2.substitution &&  <AddMatchSub competition={competition} match={match} matchId={matchId} matchday={matchday}  /> } 

            { mode2.goal &&  <AddMatchGoal competition={competition} match={match} matchId={matchId} matchday={matchday}  /> } 

            { mode2.end &&  <AddMatchEnd competition={competition} match={match} matchId={matchId} matchday={matchday}  /> } 







            <Footer />

                    </div>

 

    )
}
















const ResultUpdateList = () => {



    return (
        <div className={Style.app}>

            <Nav />


            <h1 > Update Match Result </h1>



            <div className={Style.list}  >  

                        
            <CardList4
                name={"lineups"} logo={ require("../../../img/match/tactics1.png")} category={"line-up"} link={"lineup" } />  

            {/* <CardList4
                name={"start"} logo={require("../../../img/match/whistle.png")} category={"begin"} link={"start" } />  */}

            {/* <CardList4
                name={"extra time"} logo={require("../../../img/match/extra time1.png")} category={"injury time"} link={"extra-time" } />   */}

           {/* <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />  

             <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />  

            <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />  

            <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />   */}



            <CardList4
               name={"goal"} logo={require("../../../img/match/goal1.png")} category={"goal"} link={"goal" } />  


            <CardList4
               name={"yellow card"} logo={require("../../../img/match/yellow card.png")} category={"foul"} link={"yellow" } /> 

            <CardList4
               name={"red card"} logo={require("../../../img/match/red card.png")} category={"foul"} link={"red" } /> 

            <CardList4
               name={"substitution"} logo={require("../../../img/match/substitution1.png")} category={"sub"} link={"substitution" } />  

            <CardList4
               name={"end"} logo={require("../../../img/match/whistle1.png")} category={"end match"} link={"end" } />  


                      

  </div>
         <Footer />


  </div>

                
 

    )
}



const ResultUpdate = ({}) => {

    const [data, setData] = useState([])
    const [mode2, setType] = useState({start: false, end: false, "extra-time": false, lineup: false, yellow: false, red: false, substitution: false, goal: false,   });
    const [user, setUser] = useState({team: false, })    
    const [match, setMatch] = useState({})

    const [competition, setRegion] = useState({})
    


    const {id, matchId, matchday, type} = useParams()
    const region =id?.replaceAll('-',' ');





            useEffect(() => {                         
                setType(values => ({...values, [type]: true}))

                fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + region)
                .then((res) =>  res.json())
                .then((data) =>  setRegion(data))
 


            fetch(process.env.REACT_APP_API_LINK + 'getaccess/team', {
            method: 'GET',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
             }).then((res) => {
            if (res.status === 200) {
                setUser({team: true})

            } 
        })


        fetch(process.env.REACT_APP_API_LINK + "getone/" + region + "/result/" + matchId)
        .then((res) =>  res.json())
        .then((data) => setMatch(data));

            }, []);






    




    return (
        <div className={Style.app}>

            <Nav />
                      
            { mode2.lineup &&  <AddMatchResultLineup competition={competition} match={match} matchId={matchId}  matchday={matchday} /> } 

            {/* { mode2.start &&  <AddMatchResultStart competition={competition} match={match}matchId={matchId}  matchday={matchday}  /> }  */}
{/* 
            { mode2["extra-time"] &&  <AddMatchExtraTime competition={competition} match={match} matchId={matchId}  matchday={matchday} /> }  */}

            { mode2.red &&  <AddMatchResultRed competition={competition} match={match} matchId={matchId} matchday={matchday}  /> } 

            { mode2.yellow &&  <AddMatchResultYellow competition={competition} match={match} matchId={matchId}  matchday={matchday} /> } 

            { mode2.substitution &&  <AddMatchResultSub competition={competition} match={match} matchId={matchId} matchday={matchday}  /> } 

            { mode2.goal &&  <AddMatchResultGoal competition={competition} match={match} matchId={matchId} matchday={matchday}  /> } 
{/* 
            { mode2.end &&  <AddMatchEnd competition={competition} match={match} matchId={matchId} matchday={matchday}  /> }  */}







            <Footer />

                    </div>

 

    )
}


const AdminTeamList = () => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <CardList4
                name={project.name}
                logo={project.logo[0]?.url}
                category={"team"}
                link={"./../" + project.name}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}











const AdminAdminList = ({event}) => {

    const [data, setData] = useState([])
   


    useEffect(() => {
     
      if (event.add ) {
        fetch(process.env.REACT_APP_API_LINK  + 'getall/user/', {
          method: "GET",
          credentials: "include",
          headers: {'Content-Type': 'application/json'},
        }  )
        .then((res) =>  res.json())
        .then((data) =>  setData(data.data))

    } else if (event.delete) {

      fetch(process.env.REACT_APP_API_LINK  + 'getall/admin/', {
        method: "GET",
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) =>  res.json())
      .then((data) =>  setData(data.data))

    }

      
      }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <CardList4
                name={project.name.first + " " + project.name.last}
                logo={project.imgUrl?.url}
                category={event.add ? "user" : event.delete ? "admin" : "error no category"}
                link={"./../" + project._id}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}
export {MatchUpdateList, MatchUpdate, ResultUpdate, ResultUpdateList } 