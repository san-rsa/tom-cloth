import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Player.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';










const PlayerBio = ({answer, topic,}) => {

    return (
        <div className={Style.biostat} >

    
            <h1 > {answer} </h1>

            <h3 >  {topic}  </h3>
        


        </div>


        

    )
}









export {PlayerBio, }