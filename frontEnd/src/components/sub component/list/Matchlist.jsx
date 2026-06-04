import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Match.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';



const MatchTeam = ({logo, name, }) => {


    const link = name?.replaceAll(' ','-')


    return (
           <Link to={"/team/" + link} className={Style.team}>

 
                    <div className={Style.logo} >
                        <img src={logo} />
                    </div>

                    
                        
                        <div className={Style.name}>
                            <h1 >  {name} </h1>
                        </div>

        


              </Link>
   

    )
}




const MatchCompetition = ({logo, name,}) => {

    const link = name?.replaceAll(' ','-')

    return (

        <Link to={"/region/" + link} className={Style.competition}>


 
            <div className={Style.logo} >
                <img src={ logo} />
            </div>

            
            <div className={Style.name} >
            
                    <h2 > {name} </h2>

            </div>


          
        </Link>

    )
}



const MatchTime = ({day, time, }) => {

    return (
        <div className={Style.matchday}>


 
            <div className={Style.img3} >
                <h1 > {day} </h1>

            </div>

            
            <div className={Style.text3} >
                
                <div className={Style.head3}>
                    <h4 > {time} </h4>
                </div>

            </div>


            </div>
  

    )
}



const MatchScore = ({home, away, time, half }) => {

    return (
        <div className={Style.matchday}>


 
            <div className={Style.score} >
                <h1 > {home} : {away} </h1>

            </div>

            
            <div className={Style.text3} >
                
                <div className={Style.head3}>
                    <h4 > {time} </h4>
                    <h5 > {half} </h5>

                </div>

            </div>


            </div>
  

    )
}







const MatchEventHome = ({img, name, assist, time,}) => {

    return (


        <div className={Style.eventH} >


        <div className={Style.listS}>


            <div className={Style.player}>
                <p className={Style.main}> {name} </p>

                <p className={Style.assist} > {assist} </p>
            </div>




        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={img} />

        </div>
                

            
        <div className={Style.stime} >
                <h3 > {time}  </h3>
            </div>
        </div>            
        
        <div className={Style.time} >
                <h3 > {time}  </h3>
            </div>

            {/* <h1 className={Style.time} > {time} 2 </h1> */}

            
        </div>

        

    )
}



const MatchEventAway = ({img, name, assist, time,}) => {

    return (


        <div className={Style.eventA} >

        <div className={Style.time} >
                <h3 > {time} </h3>
            </div>


        <div className={Style.listS}>



        <div className={Style.stime} >
                <h3 > {time}  </h3>
            </div>


        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={img} />

        </div>

            <div className={Style.player}>
                <p className={Style.main}> {name} </p>

                <p className={Style.assist} > {assist} </p>
            </div>





                

            

        </div>            
            
        </div>

        

    )
}


export {MatchCompetition, MatchTeam, MatchTime, MatchScore, MatchEventHome, MatchEventAway}