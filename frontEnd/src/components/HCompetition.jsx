import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Competition.module.css"
import News, {Minivideo} from "./sub component/list/Newslist"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixtures, Results, Standing } from "./sub component/Hometournament";
import  {HorizontalScroll, CardList } from "./sub component/list/Generallist";






const Competition = () => {


    const [data, setdata] = useState([])

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/competition")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);





    return (
        <div className={Style.competion}>

            <h1 >POPULAR REGION</h1>


                <HorizontalScroll >
            <div className={Style.regions} > 


                    
            {data.slice(0, 5).map((p) => (



                        <CardList 
                            name={p.name}
                            to={"region"}
                            category={"Region"}
                            logo={p.logo[0]?.url}

                        />  


            )   )   }

            
            </div>

                </HorizontalScroll>





        </div>

    )
}











const Team = () => {


    const [data, setdata] = useState([])

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);





    return (
        <div className={Style.competion}>

            <h1 >POPULAR TEAM</h1>


                <HorizontalScroll >
            <div className={Style.regions} > 


                    
            {data.slice(0, 5).map((p) => (



                        <CardList 
                            name={p.name}
                            to={"team"}
                            category={"team"}
                            logo={p.logo[0]?.url}

                        />  


            )   )   }

            
            </div>

                </HorizontalScroll>





        </div>

    )
}



export {Competition, Team}
