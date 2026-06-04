import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../..//styles/Player.module.css"
import Styles from "../..//styles/News.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, Result, Table, Tablehead } from "./list/Tournamentlist";
import News, { Mininews } from "./list/Newslist";
import { Standing } from "./Hometournament";
import { PlayerBio, } from "./list/Playerviewlist";
import { CardList } from "./list/Generallist";




const Info = ({info}) => {
    
    const [news, setnews] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [team, setData] = useState({})


    



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + info.teamId)
            .then((res) =>  res.json())
            .then((data) => setData(data));
        }, [info.teamId]);







    return (
        <div className={Style.info}>





                    <div className={Style.teams} >

                        <h2 > Team</h2>

                    
                        <CardList 
                            name={team.name} to={"team"} category={"Team"}
                            logo={team.logo ? team.logo[0]?.url : null}

                        />

                        </div>




                        <div className={Style.stats}> 

                            <h2 > KEY STATS</h2>

                            <div className={Style.bio}>

                                <PlayerBio
                                    topic={"Age"}
                                    answer={ new Date().getFullYear() - info?.dob?.slice(0, 4) + " years"}
                                />

                                {/* <PlayerBio
                                    topic={"Country"}
                                    answer={"22"}
                                /> */}

                                <PlayerBio
                                    topic={"Position"}
                                    answer={info.position}
                                />
{/* 
                                <PlayerBio
                                    topic={"Height"}
                                    answer={"22"}
                                />

                                <PlayerBio
                                    topic={"Weight"}
                                    answer={"22"}
                                />

                                <PlayerBio
                                    topic={"Jersey number"}
                                    answer={"22"}
                                /> */}





                            </div>
                            
                         </div>
                    
                    

                        </div>


    )
}


const Season = ({info}) => {
    
    const [news, setnews] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState({})



        const [years, setYears] = useState([])
    
        const [query, setQuery] = useState({type: "goal", }) // new Date(2022).getFullYear()
    
        const [regions, setRegions] = useState([]) // new Date(2022).getFullYear()
    
    
    
    
        // useEffect(() => {
        //     fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/standing/" + year)
        //     .then((res) =>  res.json())
        //     .then((data) => setData(data.data));
        // }, []);
    
        
    
        useEffect(() => {
            if (query.region && query.year) {
                        fetch(process.env.REACT_APP_API_LINK + "getone/" + query.region + "/stats/player/"+ info._id + "/" + query.year)
                        .then((res) =>  res.json())
                        .then((data) => setData(data.data));
            }
        }, [query.region, query.year,]);
    
    
        
        useEffect(() => {
            if (query.region) {
                fetch(process.env.REACT_APP_API_LINK + "getyear/" + query.region + "/stats/years")
                .then((res) =>  res.json())
                .then((data) => { return (setYears(data.data), setQuery(values => ({...values, year: data.data? data.data[0]: null}))
            )}     );
            }
        }, [query.region]);
    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getyear/getregions/player/" + info._id )
            .then((res) =>  res.json())
            .then((data) =>  { return ( setRegions(data.data), setQuery(values => ({...values, region: data?.data ? data?.data[0] : null}))
        )}     );
        }, []);
    
    
        const handleChange = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setQuery(values => ({...values, [name]: value}))
    
          }
    
    
    
    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setnews(data.data));
        }, []);


    




    return (
        <div className={Style.season}>

            <div className={Style.stats}>
                               

            
                        <div className={Style.select} >
                        <label rel="select" htmlFor="select" > region </label>
            
                      <select id="region" name={"region"} onChange={handleChange} value={query.region} > 
                      { query.region ?  null : <option value={0} > select region  </option> }
            
                      {regions?.map((props) => (             
                         <option key={props} value={props} > {props}  </option>
                       )   )   }
            
                      </select>
            
                    </div>
            
            
                        <div className={Style.select} >
                        <label rel="select" htmlFor="select" > year </label>
            
                      <select id="region" name={"year"} onChange={handleChange}value={query.year} > 
                      { query.year ?  null : <option value={0} > select year  </option> }
            
                      {years?.map((props) => (             
                         <option key={props} value={props} > {props}  </option>
                       )   )   }
            
                      </select>
            
                    </div>
                               
           
            <h2 > KEY STATS</h2>

            { (  years !== undefined &&  query.region !== undefined && data?.length !== 0 ) ? 
 

            <div className={Style.stat}>


                    <PlayerBio topic={"Appearances"} answer={data.played }  />

                    <PlayerBio topic={"Goals"} answer={data.goal } />

                    <PlayerBio topic={"Assists"} answer={data.assist} />

                    <PlayerBio topic={"Yellow cards"} answer={data.yellow } />

                    <PlayerBio topic={"Red cards"} answer={data.red } />

                    {/* <PlayerBio topic={"Jersey number"} answer={data.motm   potm} /> */}





            </div>


                : <h1 > no stats availabe</h1>}




            </div>








                    </div>

 

    )
}





export {Info, Season,  }