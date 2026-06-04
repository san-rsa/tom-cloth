import React from "react";
import { Link } from "react-router-dom";


const Banner = ({ text, img, link }) => {

    return (

    <div className="banner">
        <img src={img} alt="tea banner"/>
        <h2>{text}</h2>
    </div>
    )
}



const SBanner = ({ body, img, head, link }) => {

    return (
    <div className="sbanner">
        <img src={img} alt="tea banner"/>

        <div className="text">
        <p>  {body} </p>
        </div>

        
       <Link to={link}> <div className="text2">
             <h2>CODE OF CONDUCT {head} </h2>
        </div> </Link>

 
    </div>
    )
}




export default Banner

export {SBanner}