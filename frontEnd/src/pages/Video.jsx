import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Description.module.css"
import Nav from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Topic } from "../components/sub component/list/Newsviewlist";




const News = ({}) => {

    const [data, setData] = useState({})
    const [wishlist, setwish] = useState()
    const [set, setset] = useState('')
    const [priced, setpriced] = useState(Number())




    
    const title = useParams().id


    const link =title.replaceAll('-',' ')





        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/news/"+ link)
            .then((res) =>  res.json())
            .then((data) => setData(data));
        }, []);


        console.log(data);
        

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


                
        <div className={Style.vhead} >

        <div className={Style.vid}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={data.imgUrl?.url}/>

        </div>

        <div className={Style.vidHeadline}>
            <h1 > <span > {data.head} </span> </h1>
        </div>    
        


        </div>







        <div className={Style.news} >



        <div className={Style.relatedNews}>
            <h3 > RELATED NEWS</h3>

  
                <Topic 
                    head={data.head}
                    link={data.head} 
                />

        </div>


        </div>




     </div>
        </div>

    )
}





export default News