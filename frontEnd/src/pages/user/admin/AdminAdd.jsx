import React, { useState, useEffect } from "react";
import Style from "../../../styles/Team.module.css"
import Nav from "../../../components/sub component/Nav"
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/sub component/Footer";
import { AdminAddAdmin, AdminBanner, AdminCategory, AdminNews, AdminProduct,  } from "../../../components/sub component/Profileadminview";




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


            
              
         },   []);


        console.log(mode1, mode2, event, type, typeId);
        




    return (
        <div>
         <Nav />
            <div className={Style.app}>




         <div className={Style.section} >

            { mode2.banner && <AdminBanner event={mode1} typeId={typeId} />}


            {/* { mode2.region && <AdminRegion event={mode1} typeId={typeId} />} */}

            { mode2["product"] && <AdminProduct event={mode1} typeId={typeId} />}

           { mode2.category &&  <AdminCategory event={mode1} typeId={typeId} /> } 



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