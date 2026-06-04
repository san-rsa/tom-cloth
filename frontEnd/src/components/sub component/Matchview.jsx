import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../..//styles/Match.module.css"
import Styles from "../..//styles/News.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, Result, Table, Tablehead } from "./list/Tournamentlist";
import News, { Mininews } from "./list/Newslist";
import { Standing } from "./Hometournament";
import { TeamList, TeamSquadList } from "./list/Teamviewlist";




const LineUp = ({data, type, team}) => {
    

    return (
                        <div className={Style.starting_lineup} >
                         <h3 > <span > {team} </span> {type} </h3>


                        {data?.map((project) => (


                        <TeamSquadList
                            name={project.name?.first + " " + project.name?.last}
                            img={project.picture?.url}
                            pos={project?.position}
                           // number={7}
                            />    


                        )   )   }
                        
                        </div>

    )
}



export {LineUp,  }