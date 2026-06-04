import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Team.module.css"
import { useParams,  Link, useNavigate,  } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';




const TeamList = ({logo, name,}) => {


    const link = name.replaceAll(' ','-')

    return (
        <Link to={"/team/" + link} className={Style.listT}>


        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={logo} />

        </div>
                

            
        <div className={Style.name}>
            <h4 >  {name}  </h4>
        </div>    
        

        </Link>
        

    )
}



const TeamSquadList = ({img, name, number, pos,}) => {

    const link = name.replaceAll(' ','-')

    return (
        <Link to={"/player/" + link} className={Style.listS}>




        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={img} />

        </div>

              <div className={Style.number} >
                        <h1 > {number} </h1>
                </div>
                    
                
  


                <div className={Style.info} >
            
            <div className={Style.pos} >
                    <p > {pos}  </p>
                </div>  
                <div className={Style.name}>
                    
                    <h3 >  {name}  </h3>
                </div>
            </div>
        


        </Link>
        

    )
}






const TeamSquadListEdit = ({img, name, number, pos,}) => {

    const link = name?.replaceAll(' ','-')



    return (
        <Link to={"./../" + link} className={Style.listS}  >




        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={img} />

        </div>

              <div className={Style.number} >
                        <h1 > {number} </h1>
                </div>
                    
                
  


                <div className={Style.info} >
            
            <div className={Style.pos} >
                    <p > {pos}  </p>
                </div>  
                <div className={Style.name}>
                    
                    <h3 >  {name}  </h3>
                </div>
            </div>
        


        </Link>
        

    )
}


const TeamSquadListWithPosition =  ({data, pos, number,})  => {
    

    console.log(data);
    

    return (
        <div className={Style.teamFix}>


            <div className={Style.pos} >


                <h2> {pos} </h2>

                    <div className={Style.squads} >

                        {


                    data?.map((props) => (

                     props.position == pos.toLowerCase() && 
                     
                     <TeamSquadList
                     name={props.name?.first + ' ' + props.name?.last}
                     img={props.picture?.url}
                    //  number={props.number}
                    // number={0}
                     pos={props.position}
                     /> 


   


                    )   )   
                         } 
                    </div>
                    
                </div>









                    </div>

        

    )
}


const TeamSquadListWithPositionEdit =  ({data, pos, number,})  => {
    

    console.log(data);
    

    return (
        <div className={Style.teamFix}>


            <div className={Style.pos} >


                <h2> {pos} </h2>

                    <div className={Style.squads} >

                        {


                    data?.map((props) => (

                     props.position == pos.toLowerCase() && 
                     
                     <TeamSquadListEdit
                     name={props.name?.first + ' ' + props.name?.last}
                     img={props.picture?.url}
                    //  number={props.number}
                    number={0}
                     pos={props.position}
                     /> 


   


                    )   )   
                         } 
                    </div>
                    
                </div>









                    </div>

        

    )
}




export {TeamList, TeamSquadList, TeamSquadListWithPosition, TeamSquadListEdit, TeamSquadListWithPositionEdit}