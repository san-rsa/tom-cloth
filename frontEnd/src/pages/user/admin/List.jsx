
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/admin/Profile.module.css"
import Nav from "../../../components/sub component/Nav"
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/sub component/Footer";
import { AdminAdminList, AdminBannerList, AdminCodeOfConductList, AdminMatchFixtureList, AdminMatchRegionList, AdminNewsList, AdminRegionList, AdminSubRegionList, AdminTeamList } from "../../../components/sub component/list/Profileadminviewlist";
import { TeamAdminNewsList, TeamAdminPlayerList } from "../../../components/sub component/list/Teamadminviewlist";








const List = ({}) => {
    const [mode1, setEvent] = useState({add: false, edit: false, });

    const [mode2, setType] = useState({banner: false, team: false, player: false, admin: false, fixture: false, news: false, region: false, user: false, "sub-region": false, user: false  });
    
    const [user, setUser] = useState({admin: false, team: false, })

    const [team, setTeam] = useState()
    


    
    const {event, type, typeId } = useParams()

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
                 .then((data) =>  setTeam(data.data.name));         
                 
                 

         }



         

    return (
        <div>
         <Nav />
            <div className={Style.app}>

            <h1 > {mode1.add ? "add" :  mode1.edit ? "edit" : null }  list </h1>



         <div className={Style.section} >

            { mode2.banner && <AdminBannerList  />}

            { mode2.news && <AdminNewsList  />}

            { mode2["code-of-conduct"] && <AdminCodeOfConductList />}
       
            { mode2.news ? user.admin ? <AdminNewsList  /> : user.team ? team ? <TeamAdminNewsList teamid={team} /> : null : null : null}
            
            { mode2.player ? user.admin ? null : user.team ? team ? <TeamAdminPlayerList teamid={team} /> : null : null :  null}

            { mode2.region && <AdminRegionList   />}
            
            { mode2["sub-region"] && <AdminSubRegionList   />}

           { mode2.fixture ? mode1.add  ?  <AdminRegionList  />  : mode1.edit ? !typeId ?  <AdminMatchRegionList />  :  <AdminMatchFixtureList regionid={typeId}/> : null : null}
          
           { mode2["add-team-to-region"] &&  <AdminRegionList  /> } 

           { mode2.user &&  <AdminTeamList  /> } 

           { mode2.admin &&  <AdminAdminList event={mode1}  /> } 



           { mode2.team &&  <AdminTeamList /> } 



                    {/*  { mode.news && <TeamNews />}

            { mode.fixtures && <TeamFixtures />}

            { mode.results && <TeamResults />}

            { mode.squad && <TeamSquad />}

            { mode.admin && <TeamAdmin />} */}



         </div>






     </div>

     <Footer />
        </div>

    )
}





export default List