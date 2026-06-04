import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Team.module.css"
import Nav from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Topic } from "../components/sub component/list/Newsviewlist";
import { Overview, TeamAdmin, TeamFixtures, TeamNews, TeamPlayerStats, TeamResults, TeamSquad } from "../components/sub component/Teamview";
import Footer from "../components/sub component/Footer";




const Team = ({}) => {
    const [mode, setInputs] = useState({overview: true, stats: false, news: false, fixtures: false, results: false, squad: false, transfer: false, official: false, admin: false });

    const [data, setData] = useState({})

    const [user, setUser] = useState({admin: false, team: false, })
    

    
    const title = useParams().id

    const link =title.replaceAll('-',' ')




        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + link)
            .then((res) =>  res.json())
            .then((data) => setData(data));


            fetch(process.env.REACT_APP_API_LINK + 'getaccess/team', {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'},
                 }).then((res) => {
                if (res.status === 200) {
                    setUser({team: true})
    
                } 


            })

        }, [link]);






        const handleChange = (event) => {
            const name = event.target.innerHTML.toLowerCase();
    
            setInputs({overview: false, stats: false, news: false, fixtures: false, results: false, squad: false, admin: false, transfer: false, official: false });

            
            setInputs(values => ({...values, [name]: true}))
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



    return (
        <div>
         <Nav />
            <div className={Style.app}>





  



                         <div className={Style.top}>

                            <div className={Style.head} >

                            <div className={Style.img}>
                                    {/* <img src={info?.imgUrl} alt=""/> */}
                                {data.logo && <img src={data.logo[0]?.url}/>       }
                            </div>
                                    

                                
                            <div className={Style.name}>
                                <h1 > <span > {data.name} </span> </h1>
                            </div>    
                                     
                  
                             </div>  
         
         
                       <div className={Style.list}>
    
                    <ul >
                        <li onClick={handleChange} >Overview</li>
                        <li onClick={handleChange}  >News</li>
                        <li onClick={handleChange} >Fixtures</li>
                        <li onClick={handleChange}  >Results</li>
                        <li onClick={handleChange}  >Squad</li>
                        <li onClick={handleChange}  >Stats</li>
                        {/* <li onClick={handleChange}  >Official</li> */}
                        { (user.admin || user.team ) ? <li onClick={handleChange}  >Admin</li> : null }

    
                    </ul>
    
    
    
                    
              
                 {/* { mode.fixtures && <Fixtures />}
    
                 { mode.results &&  <Results />} */}
    
                 </div>

                         </div>

         <div className={Style.section} >

            { mode.overview && <Overview id={link} />}

            { mode.news && <TeamNews id={link} />}

            { mode.fixtures && <TeamFixtures id={link} />}

            { mode.results && <TeamResults id={link} />}

            { mode.squad && <TeamSquad id={link} />}

            { mode.stats && <TeamPlayerStats id={link} />}


            { mode.admin ? user.team ? <TeamAdmin  /> : null : null }
            



         </div>






     </div>

     <Footer />
        </div>

    )
}





export default Team