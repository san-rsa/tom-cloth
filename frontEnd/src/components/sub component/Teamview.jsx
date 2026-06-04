import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../..//styles/Team.module.css"
import Styles from "../..//styles/News.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart, faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, PlayerStats, PlayerStatsHead, Result, Table, Tablehead } from "./list/Tournamentlist";
import News, { Mininews } from "./list/Newslist";
import { Standing } from "./Hometournament";
import { TeamList, TeamSquadList, TeamSquadListWithPosition } from "./list/Teamviewlist";
import { CardList2, CardList3, CardList3Edit } from "./list/Generallist";




const Overview = ({id}) => {
    
    const [news, setnews] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState({})
    const [fixture, setfixture] = useState({})
    const [result, setResult] = useState({})
    const [standing, setStanding] = useState({})
    // const [data, setData] = useState({})
    // const [data, setData] = useState({})
    


    // useEffect(() => {
    //     fetch(process.env.REACT_APP_API_LINK + "getall/672a24205fa419f32c581933/standing/" + year)
    //     .then((res) =>  res.json())
    //     .then((data) => setStand(data.data));
    // }, []);




        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news/team/" + id)
            .then((res) =>  res.json())
            .then((data) => setnews(data.data));

            fetch(process.env.REACT_APP_API_LINK + "getaccess/latest/result/team/" + id)
            .then((res) =>  res.json())
            .then((data) => setResult(data.data));


            fetch(process.env.REACT_APP_API_LINK + "getaccess/latest/fixture/team/" + id)
            .then((res) =>  res.json())
            .then((data) => setfixture(data.data));

            fetch(process.env.REACT_APP_API_LINK + "getall/teams")
            .then((res) =>  res.json())
            .then((data) => setotherTeams(data.data));





        }, [id]);
    



        // useEffect(() => {
        //     fetch(process.env.REACT_APP_API_LINK  + "getone/news/" + link)
        //     .then((res) =>  res.json())
        //     .then((data) => setData(data));
        // }, []);







    return (
        <div className={Style.overview}>


        <div className={Style.layout} >

                    <div className={Style.left} >

                    <div className={Style.matches}>



                    
        {result?.match &&         <div className={Style.result}>
                
        
            <h2 > Latest Results </h2>


            <div className={Style.tres} >
                            <Result
                Hname={result?.match?.home?.name}
                Hlogo={result?.match?.home?.logo[0]?.url}
                Hscore={result?.match?.homeScore}

                date={result?.match?.day?.date?.slice(0, 10).replaceAll('-','/')} time={result?.match?.day?.time}

                matchday={result?.matchday}

                Ascore={result?.match?.awayScore}
                Alogo={result?.match?.away?.logo[0]?.url}
                Aname={result?.match?.away?.name}

               live={result?.match?.live} start={result?.match?.start} 
               half={result?.match?.half} minutes={result?.match?.time.now}


               _id={result?.match?._id}
               regionId={result?.regionId}

                        
                        
                        /> 
            </div>
    
        
        
        
        
                </div> }
                

            
            
            {fixture?.match &&         <div className={Style.fixture}>

            <h2 > Next Match </h2>


            <div className={Style.tfix} >

            <Fixture 

                 
                Hname={fixture.match?.home?.name}
                Hlogo={fixture.match?.home?.logo[0]?.url}
                Hscore={fixture.match?.homeScore}

                date={fixture.match?.day?.date?.slice(0, 10).replaceAll('-','/')} time={fixture.match?.day?.time}

                matchday={fixture.matchday}

                Ascore={fixture.match?.awayScore}
                Alogo={fixture.match.away?.logo[0]?.url}
                Aname={fixture.match.away?.name}

               live={fixture.match?.live} start={fixture.match?.start} 
               half={fixture.match?.half} minutes={fixture.match?.time.now}


               _id={fixture.match._id}
               regionId={fixture.regionId}

            />  
        </div >





        </div> }


        </div>



                {/* <div className={Style.standing} >
                    <h2 > Standing</h2>


           <Tablehead />
   
              {stand.standing?.slice(0, 5).map((props, pos) => (



                <Table
                    pos={pos + 1}
                    name={props.teams.name}
                    logo={props.teams.logo[0].url}
                    w={props.stats.win} 
                    d={props.stats.draw} 
                    l={props.stats.loss} 
                    pts={props.stats.points} 
                    pl={props.stats.played} 
                    gd={props.stats.gd} 
                    ga={props.stats.ga} 
                    gs={props.stats.gs}
                    />    



                )   )   }

                </div> */}


                {/* <div className={Style.form} >
                    <h2 > Form Guide</h2>


                </div> */}



                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}



                {(news !== "not found") &&     <div className={Style.latestN} >
                    <h2 > Latest News</h2>


                    <div className={Style.news} >
                        {news?.slice(0, 5)?.map((project) => (

                        <div className={Styles.perone} key={project._id}> 

                        <Mininews
                            head={project.head}
                            img={project.imgUrl[0].url}
                            link={project.head}
                            />    
                            </div>


                        )   )   }
                    </div>
                    



                </div>}




                    </div>

                    <div className={Style.right} >
                        <div className={Style.otherTeams} >
                        <h2 > Other teams</h2>

                        {otherTeams.filter(item => !id.includes(item.name))?.slice(1, 5)?.map((project) => (

                            <div className={Style.perone} key={project._id}> 

                            <TeamList
                                name={project.name}
                                logo={project.logo[0].url}
                                link={project.name}
                                />    
                                </div>


                        )   )   }

                        </div>

                    </div>
        </div>
        </div>

    )
}


const TeamNews = ({id}) => {
    
    const [news, setnews] = useState([])

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news/team/" + id)
            .then((res) =>  res.json())
            .then((data) => setnews(data.data));
        }, []);


    




    return (
        <div className={Style.teamNews}>





            {(news !== "not found") ?                     
            
            <div >    
            
            
            <div className={Style.top} >
                    {news?.slice(0, 1).map((project) => (

                    <div className='' key={project._id}> 

                    <News
                        head={project.head}
                        img={project.imgUrl[0].url}
                        link={project.head}
                        />    
                        </div>


                    )   )   }
                    </div>


                        {news?.slice(1, 10).map((project) => (

                        <div className={Styles.perone} key={project._id}> 

                        <Mininews
                            head={project.head}
                            img={project.imgUrl[0].url}
                            link={project.head}
                            />    
                            </div>


                        )   )   }
                        
                        
                        </div>
                : <h1 > no news availabe</h1>  }


                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}



const TeamFixtures = ({id}) => {
    
    const [fixture, setfixtures] = useState([])
  


    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/team/" + id + "/fixtures")
            .then((res) =>  res.json())
            .then((data) => setfixtures(data.data));
        }, []);


    




    return (
        <div className={Style.teamFix}>

            <h2 > Next Fixtures </h2>


            {(fixture.length !== 0) ?         
            
            <div >
                                <div className={Style.fix} >

                    {fixture?.map((props) => (

                                        
        <div className={Style.fixture}>

                        <div className={Style.tfix} >


                            <Fixture 
                             Hname={props.match?.home?.name}
                             Hlogo={props.match?.home?.logo[0].url}
                             Hscore={props.match?.homeScore}

                             date={props.match?.day?.date.slice(0, 10).replaceAll('-','/')} time={props.match?.day?.time}
                             matchday={props.matchday}

                             Ascore={props.match?.awayScore}
                             Alogo={props.match?.away?.logo[0].url}
                             Aname={props.match?.away?.name}

                            live={props.match?.live} start={props.match?.start} 
                            half={props.match?.half} minutes={props.match?.time?.now}


                            _id={props.match?._id}
                            regionId={props.regionId}





                            />  

                        </div >








                        </div>


                    )   )   }
                    </div>
              </div> : <h1 > no fixtures availabe</h1> 
            }



                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}



const TeamResults = ({id}) => {
    
    const [results, setResults] = useState([])
    const [year, setYear] = useState(0) // new Date(2022).getFullYear()
    const [years, setYears] = useState([])

    

    


    
    useEffect(() => {
        if (year) {
            fetch(process.env.REACT_APP_API_LINK + "getall/team/" + id + "/results/" + year)
            .then((res) =>  res.json())
            .then((data) => setResults(data.data));
        }
    }, [year]);


    
            useEffect(() => {
                fetch(process.env.REACT_APP_API_LINK + "getyear/result/years")
                .then((res) =>  res.json())
                .then((data) => { return (setYears(data.data), setYear(data.data[0])
        )}     );
            }, []);


            const handleChange = (event) => {
                const value = event.target.value;
                setYear( value)
        
              }


    return (
        <div className={Style.teamRes}>

            <h2 > Results </h2>


       <div className={Style.select} >


        <label rel="select" htmlFor="select" > year </label>

          <select id="region" name={"year"} onChange={handleChange} value={year} > 
          { year ?  null : <option value={0} > select year  </option> }

          {years?.map((props) => (             
             <option key={props._id} value={props} > {props}  </option>
           )   )   }

          </select>

        </div>


        



                {(results.length !== 0 ) ?    
                
                <div >  
            
                                <div className={Style.res} >

                    {results?.map((props) => (

                                        
        <div className={Style.rresult}>


                        <div className={Style.tres} >



                            <Result 
                             Hname={props.match?.home?.name}
                             Hlogo={props.match?.home?.logo[0].url}
                             Hscore={props.match?.homeScore}

                             date={props.match?.day?.date.slice(0, 10).replaceAll('-','/')} time={props.match?.day?.time}
                             matchday={props.matchday}

                             Ascore={props.match?.awayScore}
                             Alogo={props.match?.away?.logo[0].url}
                             Aname={props.match?.away?.name}

                            live={props.match?.live} start={props.match?.start} 
                            half={props.match?.half} minutes={props.match?.time?.now}


                            _id={props.match?._id}
                            regionId={props.regionId}





                            /> 

                </div >
 







                        </div>


                    )   )   }
                    
             </div>
                </div> : <h1 > no results availabe</h1>}

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}



const TeamSquad = ({id}) => {
    
    const [fixtures, setfixtures] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState([])

    const year = 2022 // new Date(2022).getFullYear()

    

    console.log(data);
    
    


    
    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/players/" + id)
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);


    




    return (
        <div className={Style.teamFix}>


            {/* <div className={Style.pos} >


                <h2>   </h2>

                    <div className={Style.squads} >

                    {data.map((project) => (




                    <TeamSquadList
                        name={project.head}
                        img={project.imgUrl.url}
                        link={project.head}
                        />    


                    )   )   }
                    </div>
                    
                </div> */}




            { (data !== "not found" ) ?

                <div> 
                    
                    <TeamSquadListWithPosition pos={"Goalkeeper"} data={data} />
                    <TeamSquadListWithPosition pos={"Defender"} data={data} />
                    <TeamSquadListWithPosition pos={"Midfielder"} data={data} />
                    <TeamSquadListWithPosition pos={"Foward"} data={data} />

                </div>
                : <h1 > no player availabe</h1>}
                               
                               
            








                    </div>

 

    )
}





const TeamAdmin = ({}) => {
    
    const [fixtures, setfixtures] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState({})

    const year = 2022 // new Date(2022).getFullYear()

    

    

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setfixtures(data.data));
        }, []);


    




    return (
        <div className={Style.teamAdmin}>





        <div className={Style.teamadminmenu} >

            <h2 > Players</h2>

            <div className={Style.teamadminmenulist} >
                <CardList3 name={"Players"} to={"add"} category={"add"} link={"player"} logo={faPlus} />  
                <CardList3Edit name={"Players"} to={"edit"} category={"edit"} link={"player"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>


        </div>

        
        <div className={Style.teamadminmenu} >


            <h2 > News</h2>

            <div className={Style.teamadminmenulist} >
                <CardList3 name={"News"} to={"add"} category={"add"} link={"news"} logo={faPlus} />  
                <CardList3Edit name={"News"} to={"edit"} category={"edit"} link={"news"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
            
        </div>



                    



         




                    </div>

 

    )
}













const TeamPlayerStats = ({id}) => {
    
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
                    fetch(process.env.REACT_APP_API_LINK + "getall/" + query.region + "/stats/team/"+ id +"/" + query.type + "/" + query.year)
                    .then((res) =>  res.json())
                    .then((data) => setData(data.data));
        }
    }, [query.region, query.year, query.type]);


    
    useEffect(() => {
        if (query.region) {
            fetch(process.env.REACT_APP_API_LINK + "getyear/" + query.region + "/stats/years")
            .then((res) =>  res.json())
            .then((data) => { return (setYears(data.data), setQuery(values => ({...values, year: data.data? data.data[0]: null}))
        )}     );
        }
    }, [query.region]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getyear/getregions/team/" + id )
        .then((res) =>  res.json())
        .then((data) =>  { return ( setRegions(data.data), setQuery(values => ({...values, region: data.data[0]}))
    )}     );
    }, []);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setQuery(values => ({...values, [name]: value}))

      }





    return (
        <div className={Style.standing}>

            <h2 > Stats</h2>


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



  { (  years !== undefined &&  query.region !== undefined && data.stats?.length !== 0 ) ? 
            <div> 

        <div className={Style.select} >
            <label rel="select" htmlFor="select" > type </label>

          <select id="region" name={"type"} onChange={handleChange} defaultValue={"goal"} > 
          { query.year ?  null : <option value={0} > select stats type  </option> }
         
             <option value={"played"} > played </option>
             <option value={"goal"} > goal  </option>
             <option value={"assist"} >  assist   </option>
             <option value={"yellow"} > yellow  </option>
             <option value={"red"} > red  </option>

             <option value={"played goal assist yellow red"} > played goal assist yellow red  </option>

      

          </select>

        </div>
                 <div className={Style.table} >

                    <PlayerStatsHead  active={query.type.slice(0,1)} />
            
                    {data.stats?.map((props, pos) => (

                    <PlayerStats
                    key={pos + 1}
                     pos={pos + 1}
                     name={props.player?.name.first + " " + props.player?.name.last}
                     logo={props.player?.picture?.url}

                      pts={ props?.[query.type] } 
                      pl={props?.played} 
                      


                    />
                    )   )   }

            </div>


                </div>



                : <h1 > no stats availabe</h1>}





                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}


export {Overview, TeamNews, TeamFixtures, TeamResults, TeamSquad, TeamAdmin, TeamPlayerStats  }