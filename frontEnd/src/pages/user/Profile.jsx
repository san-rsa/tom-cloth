import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Profile.module.css"
import Nav from "../../components/sub component/Nav"
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Overview, ProfileAdmin, ProfileNews, ProfileOrder, ProfileWishlist, } from "../../components/sub component/profileview";
import Footer from "../../components/sub component/Footer";
import { TeamAdmin, TeamNews} from "../../components/sub component/Teamview";




const Profile = ({}) => {
    const [mode, setInputs] = useState({overview: true, wishlist: false, orders: false, results: false, squad: false, transfer: false, official: false, admin: false });

    const [user, setUser] = useState({admin: false, team: false, })
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state


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




          fetch(process.env.REACT_APP_API_LINK + 'getone/user/', {
            method: 'GET',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
             }).then((res) =>  res.json())
             .then((data) => setData(data));
                 
            
              
         },   []);



                               useEffect(() => {
            
              
                              fetch(process.env.REACT_APP_API_LINK + 'getone/user/isloggedin', {
                                  method: 'GET',
                                  credentials: "include",
                                  headers: {'Content-Type': 'application/json'},
                                   }).then((res) => {
                                  if (res.status === 200) {
                                      setIsLoggedIn( true)
                  
                                  } else  if (res.status === 403) {
                                      setIsLoggedIn( false)
                  
                                  } 
                       })    
                                
                       },   []);






        const handleChange = (event) => {
            const name = event.target.innerHTML.toLowerCase();
    
            setInputs({overview: false, wishlist: false, orders: false, admin: false, transfer: false, official: false });

            
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
         <Nav loggedin={isLoggedIn} />
            <div className={Style.app}>





  

                <div className={Style.top}>
                        <div className={Style.player}>

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
                        <li onClick={handleChange}  >Wishlist</li>
                        <li onClick={handleChange}  >Orders</li>
                        { (user.admin || user.team ) ? <li onClick={handleChange}  >Admin</li> : null }

    
                    </ul>
    
            
                </div>
                </div>

         <div className={Style.section} >

            { mode.overview && <Overview info={data}  user={user } />}

            { mode.wishlist ? <ProfileWishlist />  : null }

            { mode.orders ? <ProfileOrder />  : null }

            { mode.admin ? user.admin ? <ProfileAdmin  /> : user.team ? <TeamAdmin  /> : null : null }



         </div>






     </div>

     <Footer />
        </div>

    )
}





export default Profile