import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Description.module.css"
import Nav from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Topic } from "../components/sub component/list/Newsviewlist";
import Footer from "../components/sub component/Footer";




const News = ({}) => {

    const [data, setData] = useState({})
    const [wishlist, setwish] = useState()
        const [othernews, setotherNews] = useState([])
    
    const [set, setset] = useState('')
    const [priced, setpriced] = useState(Number())






    let link = useParams().id?.replaceAll('-',' ')





        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/news/"+ link)
            .then((res) =>  res.json())
            .then((data) => setData(data));

            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setotherNews(data.data));
        }, [link]);


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


                
        <div className={Style.head} >

            
        <div className={Style.headline}>
            <h1 > <span > {data.head} </span> </h1>
        </div>    
        
        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={data?.imgUrl ? data.imgUrl[0]?.url : null}/>

        </div>

        </div>







        <div className={Style.news} >




        <div className={Style.article}>
            {/* <p>{info?.description}.</p> */}
            <p> {data.body}</p>
        </div>



        <div className={Style.relatedNews}>
            <h3 > OTHER NEWS</h3>

                        {othernews.filter(item => !link.includes(item.head))?.slice(1, 5)?.map((project) => (


                            <Topic head={project.head} key={project.head}
                                />    


                        )   )   }

        </div>


        </div>




     </div>

     <Footer />
        </div>

    )
}





export default News