import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/admin/Team.module.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { TeamSquadListWithPositionEdit } from "./Teamviewlist";
import { Mininews, MininewsEdit } from "./Newslist";




const TeamAdminPlayerList = ({teamid}) => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/players/" + teamid)
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>





         



                    <TeamSquadListWithPositionEdit pos={"Goalkeeper"} data={data} />
                    <TeamSquadListWithPositionEdit pos={"Defender"} data={data} />
                    <TeamSquadListWithPositionEdit pos={"Midfielder"} data={data} />
                    <TeamSquadListWithPositionEdit pos={"Foward"} data={data} />                       


                    








                    </div>

 

    )
}






const TeamAdminNewsList = ({teamid}) => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news/team/"  + teamid)
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>





         
                    <div className={Style.newsgrid} >



                {data.map((project) => (

                        
            <MininewsEdit
                head={project.head}
                img={project.imgUrl[0].url}
                link={"./../" + project.head}
                />  


            )   )   }
                    

                    </div>







                    </div>

 

    )
}


export {TeamAdminPlayerList, TeamAdminNewsList} 