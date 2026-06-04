import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Tournament.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixtures, Results, Standing } from "./sub component/Hometournament";




const App = () => {

    
    const [mode, setInputs] = useState({table: true, fixtures: false, results: false, players: false});




    const handleChange = (event) => {
        const name = event.target.innerHTML.toLowerCase();

        setInputs({table: false, fixtures: false, results: false, players: false})

        
        setInputs(values => ({...values, [name]: true}))
      }
    
      console.log(mode);



    return (
        <div className={Style.news}>
            <div className={Style.Nav}>

                <ul >
                    <li onClick={handleChange} id={'h'}>Table</li>
                    <li onClick={handleChange} >Fixtures</li>
                    <li onClick={handleChange}  >Results</li>
                    <li onClick={handleChange}  >Players</li>

                </ul>



                
             { mode.table && <Standing />}
          
             { mode.fixtures && <Fixtures />}

             { mode.results &&  <Results />}

     
     


              
      
             
     




     </div>
        </div>

    )
}



export default App
