import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Profile.module.css"
import Nav from "../../components/sub component/Nav"
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Overview, ProfileAdmin, ProfileNews, } from "../../components/sub component/profileview";
import Footer from "../../components/sub component/Footer";
import { TeamAdmin, TeamNews} from "../../components/sub component/Teamview";




const Profile = ({}) => {
    const [mode, setInputs] = useState({overview: true, news: false, fixtures: false, results: false, squad: false, transfer: false, official: false, admin: false });

    const [user, setUser] = useState({admin: false, team: false, })


    const [data, setData] = useState({})

    
  let navigate = useNavigate()





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



          fetch(process.env.REACT_APP_API_LINK + 'getone/user/', {
            method: 'GET',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
             }).then((res) =>  res.json())
             .then((data) => setData(data));
                 
            
              
         },   []);






        const handleChange = (event) => {
            const name = event.target.innerHTML.toLowerCase();
    
            setInputs({overview: false, news: false, account: false, admin: false, transfer: false, official: false });

            
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
                        <div className={Style.player}>
                        <h3 > USER </h3>


                    <div className={Style.head} >


                        <div className={Style.img}>
                            {/* <img src={info?.imgUrl} alt=""/> */}
                            <img src={data.imgUrl?.url}/>

                        </div>
                            


                        <div className={Style.name}>
                        <h1 > <span > {data.name?.first + ' ' + data.name?.last} </span> </h1>
                        </div>    



                        </div>
                    </div>  



                        <div className={Style.list}>
            
                    <ul >
                        <li onClick={handleChange} >Overview</li>
                        <li onClick={handleChange}  >News</li>
                        { (user.admin || user.team ) ? <li onClick={handleChange}  >Admin</li> : null }

    
                    </ul>
    
            
                </div>
                </div>

         <div className={Style.section} >

            { mode.overview && <Overview info={data}  user={user } />}

            { mode.news ? user.admin ? <ProfileNews />  : user.team ? data.teamId ? <TeamNews id={data.teamId}  /> : null : null : null }

            { mode.admin ? user.admin ? <ProfileAdmin  /> : user.team ? <TeamAdmin  /> : null : null }



         </div>






     </div>

     <Footer />
        </div>

    )
}





export default Profile