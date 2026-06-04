import React, { useState, useEffect } from "react";
import Style from "../../../styles/Team.module.css"
import Nav from "../../../components/sub component/Nav"
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/sub component/Footer";
import { AdminAddAdmin, AdminAddTeamToRegion, AdminAddUserToTeam, AdminBanner, AdminCodeOfConduct, AdminFixture, AdminNews, AdminRegion, AdminSubRegion, AdminTeam } from "../../../components/sub component/Profileadminview";
import { TeamAdminNews, TeamAdminPlayer } from "../../../components/sub component/TeamAdminview";




const Add = ({}) => {
    const [mode1, setEvent] = useState({add: false, edit: false, delete: false });

    const [mode2, setType] = useState({banner: false, player: false, news: false, region: false, user: false, admin: false, "add-team-to-region": false, "sub-region": false,   });
    
    const [user, setUser] = useState({admin: false, team: false, })

    const [team, setTeam] = useState()

    
    const { event, type, matchId } = useParams()

    const typeId = useParams().typeId?.replaceAll('-',' ')


      let navigate = useNavigate()
    
        useEffect(() => {            
                
                setEvent(values => ({...values, [event]: true}))

                setType(values => ({...values, [type]: true}))

              


        }, []);



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + 'auth/autoLogin/', {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'},
                 })
                         
            .then((res) => {
                if (res.status !== 200) {
                    navigate("/login")

 
                } } )

                fetch(process.env.REACT_APP_API_LINK + 'getaccess/admin/', {
                    method: 'GET',
                    credentials: "include",
                    headers: {'Content-Type': 'application/json'},
                     }).then((res) => {
                    if (res.status === 200) {
                        setUser({admin: true})
    
                    } 
         })    


         fetch(process.env.REACT_APP_API_LINK + 'getaccess/team/', {
            method: 'GET',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
             }).then((res) => {
            if (res.status === 200) {
                setUser({team: true})

            } 

 })  


            
              
         },   []);





         if (user.team) {
            fetch(process.env.REACT_APP_API_LINK + 'getaccess/user/team/', {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'},
                 }).then((res) =>  res.json())
                 .then((data) => setTeam(data.data.name));
         }


        console.log(mode1, mode2, event, type, typeId);
        




    return (
        <div>
         <Nav />
            <div className={Style.app}>




         <div className={Style.section} >

            { mode2.banner && <AdminBanner event={mode1} typeId={typeId} />}


            { mode2["code-of-conduct"] && <AdminCodeOfConduct event={mode1} typeId={typeId} />}


            { mode2.news ? user.admin ? <AdminNews  event={mode1} typeId={typeId} /> : user.team ?  team ? <TeamAdminNews teamid={team} event={mode1} typeId={typeId} /> : null : null : null}

            { mode2.player ? user.admin ? <AdminNews  event={mode1} typeId={typeId} /> : user.team ? team ?  <TeamAdminPlayer teamid={team} event={mode1} typeId={typeId} /> : null : null : null}


            { mode2.region && <AdminRegion event={mode1} typeId={typeId} />}

            { mode2["sub-region"] && <AdminSubRegion event={mode1} typeId={typeId} />}

           { mode2.fixture &&  <AdminFixture event={mode1} regionId={typeId} typeId={matchId}/> } 

           { mode2["add-team-to-region"] &&  <AdminAddTeamToRegion event={mode1} regionId={typeId} /> } 



            { mode2.results && <AdminNews  event={mode1} typeId={typeId} />}

            { mode2.team &&  <AdminTeam event={mode1} regionId={typeId} typeId={typeId}/> } 

            { mode2.user &&  <AdminAddUserToTeam event={mode1} regionId={typeId} /> } 

            { mode2.admin &&  <AdminAddAdmin event={mode1} regionId={typeId} /> } 



  {/* 
            { mode.squad && <TeamSquad />}

            { mode.admin && <TeamAdmin />} */}



         </div>






     </div>

     <Footer />
        </div>

    )
}





export default Add