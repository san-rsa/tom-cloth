import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Team.module.css"
import Nav from "../../../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Footer from "../../../components/sub component/Footer";
import { TeamAdminNews, TeamAdminPlayer } from "../../../components/sub component/TeamAdminview";




const Add = ({}) => {
    const [mode1, setEvent] = useState({add: false, edit: false, });

    const [mode2, setType] = useState({player: false, news: false, });

    const [data, setData] = useState({})

    
    const {id, event, type, typeId } = useParams()

    const teamid =id?.replaceAll('-',' ')




        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + teamid)
            .then((res) =>  res.json())
            .then((data) => setData(data));
        }, []);


        useEffect(() => {            
                
                setEvent(values => ({...values, [event]: true}))

                setType(values => ({...values, [type]: true}))

              


        }, []);



        console.log(mode1, mode2, id, event, type, typeId);
        






        // const handleChange = (event) => {
        //     const name = event.target.innerHTML.toLowerCase();
    
        //     setInputs({overview: false, news: false, fixtures: false, results: false, squad: false, admin: false, transfer: false, official: false });

            
        //     setInputs(values => ({...values, [name]: true}))
        //   }
        
        //   console.log(mode);
    
    
    

         
        

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



    return (
        <div>
         <Nav />
            <div className={Style.app}>




         <div className={Style.section} >

            { mode2.player && <TeamAdminPlayer teamid={teamid} event={mode1} typeId={typeId} />}

            { mode2.news && <TeamAdminNews teamid={teamid} event={mode1} typeId={typeId} />}


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





export default Add