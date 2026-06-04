import React, { useState, useEffect } from "react";
import Style from "../../styles/Competition.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from "../../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Topic } from "../../components/sub component/list/Newsviewlist";
import { Overview, TeamFixtures, TeamNews, TeamResults, TeamSquad } from "../../components/sub component/Teamview";
import Footer from "../../components/sub component/Footer";
import { CompetitionFixtures, CompetitionNews, CompetitionResults, CompetitionStats, CompetitionTable } from "../../components/sub component/Competitionview";




const Competition = ({})  => {
    const [mode, setInputs] = useState({news: true, fixtures: false, stats: false, results: false, table: false, transfer: false, official: false });

    const [data, setData] = useState({})
  


    
    const title = useParams().id

    const link = title?.replaceAll('-',' ');


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + link)
            .then((res) =>  res.json())
            .then((data) => setData(data));
        }, []);


        

        const handleChange = (event) => {
            const name = event.target.innerHTML.toLowerCase();
    
            setInputs({news: false, fixtures: false, results: false, table: false, transfer: false, official: false });

            
            setInputs(values => ({...values, [name]: true}))
          }



    return (
        <div>
         <Nav />
            <div className={Style.app}>





                         <div className={Style.top}>
         
                                <div className={Style.head} >

                                <div className={Style.img}>
                                        {/* <img src={info?.imgUrl} alt=""/> */}

                                    {data.logo &&  <img src={ data.logo[0]?.url }/>    }
                                </div>
                                        

                                    
                                <div className={Style.name}>
                                    <h1 > <span > {data.name} </span> </h1>
                                </div>    
                                
                                </div>

    
         
                            <div className={Style.list}>
        
                        <ul >
                            <li onClick={handleChange}  >News</li>
                            <li onClick={handleChange} >Fixtures</li>
                            <li onClick={handleChange}  >Results</li>
                            <li onClick={handleChange}  >Table</li>
                            <li onClick={handleChange}  >Stats</li>
                            {/* <li onClick={handleChange}  >Official</li> */}
        
                        </ul>
        
        
        
                        
                
                    {/* { mode.fixtures && <Fixtures />}
        
                    { mode.results &&  <Results />} */}
        
            </div>
         
      
  
                         </div>

         <div className={Style.section} >

            { mode.news && <CompetitionNews regionId={link}/>}

            { mode.fixtures && <CompetitionFixtures regionId={link}/>}

            { mode.results && <CompetitionResults regionId={link}/>}

            { mode.table && <CompetitionTable regionId={link}/>}

            { mode.stats && <CompetitionStats regionId={link}/>}




         </div>






     </div>

     <Footer />
        </div>

    )
}




export default Competition