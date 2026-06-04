import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../..//styles/Competition.module.css"
import Styles from "../..//styles/News.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, PlayerStats, PlayerStatsHead, Result, Table, Tablehead } from "./list/Tournamentlist";
import News, { Mininews } from "./list/Newslist";
import { Standing } from "./Hometournament";
import { TeamList, TeamSquadList } from "./list/Teamviewlist";





const CompetitionNews = ({regionId}) => {
    
    const [news, setnews] = useState([])

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news/region/" + regionId)
            .then((res) =>  res.json())
            .then((data) => setnews(data.data));
        }, []);



    return (
        <div className={Style.teamNews}>





            { (news !== "not found") ?                     
            
            <div >    
            
            
            <div className={Style.top} >
                    {news.slice(0, 1).map((project) => (

                    <div className='' key={project._id}> 

                    <News
                        head={project.head}
                        img={project.imgUrl[0].url}
                        link={project.head}
                        />    
                        </div>


                    )   )   }
                    </div>


                        {news.slice(1, 10).map((project) => (

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


                    </div>

 

    )
}



const CompetitionFixtures = ({regionId}) => {
    
    const [data, setData] = useState({})
    
    const [showAll, setShowAll] = useState(false);

    function handleClick() {
      setShowAll(prevShowAll => !prevShowAll);
    }
  


    


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/fixtures")
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);

    

      const show = showAll ? data.fixture : data.fixture?.slice(0, 1);



    return (
        <div className={Style.teamFix}>

            <h2 > Next Fixtures </h2>

     
              { (data !== "not found" ) ? 
                   <div> 
           { show?.map((p) => (

                                        
        <div className={Style.fixture}>

            <h3 > matchday: {p.matchday} </h3>


                    <div className={Style.fix} >


                        {p.teams.map((props) => (

                            <Fixture 
                             Hname={props.home?.name}
                             Hlogo={props.home?.logo[0].url}
                             Hscore={props.homeScore}

                             date={props.day?.date.slice(0, 10).replaceAll('-','/')} time={props.day?.time}
                             matchday={p.matchday}

                             Ascore={props.awayScore}
                             Alogo={props.away?.logo[0].url}
                             Aname={props.away?.name}

                            live={props?.live} start={props?.start} 
                            half={props?.half} minutes={props?.time.now}


                            _id={props._id}
                            regionId={data.competition}





                            />  



                        )
                        ) } 
                    </div>







                        </div>


                    )   )   }
                    


                    <button  onClick={handleClick}> {showAll ? "Showless" : "showAll" } </button>




 </div>


             :  <h1 > no fixtures availabe</h1> }



                    </div>

 

    )
}



const CompetitionResults = ({regionId}) => {
    
    const [data, setData] = useState([])
    const [years, setYears] = useState([])

    
    const [year, setYear] = useState() // new Date(2022).getFullYear()

    

    const [showAll, setShowAll] = useState(false);

  function handleClick() {
    setShowAll(prevShowAll => !prevShowAll);
  }

  const show = showAll ? data.result : data.result?.slice(0, 1);


    
        useEffect(() => {
            if (year) {
                fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/results/" + year)
                .then((res) =>  res.json())
                .then((data) => setData(data.data));
            }
        }, [year]);


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getyear/" + regionId + "/result/years")
            .then((res) =>  res.json())
            .then((data) =>  { return (setYears(data.data), setYear(data?.data ? data.data[0] : null)
            )}    );
        }, []);


        const handleChange = (event) => {
            const value = event.target.value;
            setYear( value)
    
          }
        
          console.log(data);
          




    return (
        <div className={Style.teamRes}>

            <h2 > Latest Results </h2>

       <div className={Style.select} >


        <label rel="select" htmlFor="select" > year </label>

          <select id="region" name={"year"} onChange={handleChange} value={year} > 
          { year ?  null : <option value={0} > select year  </option> }

          {years?.map((props) => (             
             <option key={props} value={props} > {props}  </option>
           )   )   }

          </select>

        </div>



            {  (data.length !== 0  )  ? 

            <div >       
            
           
                    {show?.map((p) => (


        <div className={Style.result}>
             <h3 > matchday: {p.matchday} </h3>



                    <div className={Style.res} >


                {p.teams.map((props) => (

                <Result 
                Hname={props.home?.name}
                Hlogo={props.home?.logo[0].url}
                Hscore={props?.homeScore}

                date={props.day?.date} time={props.day?.time}
                matchday={p.matchday}


                Ascore={props?.awayScore}
                Alogo={props.away?.logo[0].url}
                Aname={props.away?.name}

                live={props?.live} start={props?.start} 
                half={props?.half} minutes={props?.time.now}


                _id={props._id}
                regionId={data.competition}





                />  



                )
                ) }







                        </div>

       </div>
                    )   )   }
             




                    
                        <button  onClick={handleClick}> {showAll ? "Showless" : "showAll" } </button>
                    
                         </div>

                : <h1 > no results availabe</h1>}


                    </div>

 

    )
}



const CompetitionTable = ({regionId}) => {
    
    const [data, setData] = useState({})
    const [years, setYears] = useState([])

    const [year, setYear] = useState(0) // new Date(2022).getFullYear()



    // useEffect(() => {
    //     fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/standing/" + year)
    //     .then((res) =>  res.json())
    //     .then((data) => setData(data.data));
    // }, []);


    useEffect(() => {
        if (year) {
            fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/standing/" + year)
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }
    }, [year]);


    
    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getyear/" + regionId + "/standing/years")
        .then((res) =>  res.json())
        .then((data) => { return (setYears(data.data), setYear(data?.data ? data.data[0] : null)
        )} );
    }, []);


    const handleChange = (event) => {
        const value = event.target.value;
        setYear( value)

      }



    return (
        <div className={Style.standing}>

            <h2 > Standing</h2>


            <div className={Style.select} >
            <label rel="select" htmlFor="select" > year </label>

          <select id="region" name={"year"} onChange={handleChange} value={year} > 
          { year ?  null : <option value={0} > select year  </option> }

          {years?.map((props) => (             
             <option key={props} value={props} > {props}  </option>
           )   )   }

          </select>

        </div>

            {  (data !== "not found" )  ? 



                (data.type == "cup") ? 
                                    <div className={Style.table} >

                        <Tablehead />
                    {data.group?.map((props, pos) => (
                        <div key={pos} >  

                        <h2 > group {props.group} </h2>

                        {props.standing?.map((props, pos) => (

                        <Table
                        key={pos + 1}
                         pos={pos + 1}
                         name={props.teams?.name}
                         logo={props.teams?.logo[0].url}
                          w={props.stats?.win} 
                          d={props.stats?.draw} 
                          l={props.stats?.loss} 
                          pts={props.stats?.points} 
                          pl={props.stats?.played} 
                          gd={props.stats?.gd} 
                          ga={props.stats?.ga} 
                          gs={props.stats?.gs}


                        />    
    
    
    
    
    
                        )   )   }




  </div>
                    )   )   }
                    </div> 

                    : (data.type == "league") ?


                    <div className={Style.table} >

                    <Tablehead />
            
                    {data.standing?.map((props, pos) => (

                    <Table
                    key={pos + 1}
                     pos={pos + 1}
                     name={props.teams?.name}
                     logo={props.teams?.logo[0].url}
                      w={props.stats?.win} 
                      d={props.stats?.draw} 
                      l={props.stats?.loss} 
                      pts={props.stats?.points} 
                      pl={props.stats?.played} 
                      gd={props.stats?.gd} 
                      ga={props.stats?.ga} 
                      gs={props.stats?.gs}


                    />    





                    )   )   }




                </div>  : <h1 > no table availabe</h1>



                : <h1 > no table availabe</h1>}



                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}






const CompetitionStats = ({regionId}) => {
    
    const [data, setData] = useState({})
    const [years, setYears] = useState([])

    const [year, setYear] = useState() // new Date(2022).getFullYear()
    const [type, setType] = useState("goal") // new Date(2022).getFullYear()




    // useEffect(() => {
    //     fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/standing/" + year)
    //     .then((res) =>  res.json())
    //     .then((data) => setData(data.data));
    // }, []);


    console.log(year, data, years);
    


    useEffect(() => {
        if (year) {
            fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/stats/" + type + "/" + year)
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }
    }, [year, type]);


    
    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getyear/" + regionId + "/stats/years")
        .then((res) =>  res.json())
        .then((data) => { return (setYears(data.data), setYear(data?.data ? data.data[0] : null)
        )} );
    }, []);


    const handleChange = (event) => {
        const value = event.target.value;
        setYear( value)

      }

      const handleChangeT = (event) => {
        const value = event.target.value;
        setType( value)

      }



    return (
        <div className={Style.standing}>

            <h2 > Stats</h2>


            <div className={Style.select} >
            <label rel="select" htmlFor="select" > year </label>

          <select id="region" name={"year"} onChange={handleChange}  > 
          { year ?  null : <option value={0} > select year  </option> }

          {years?.map((props) => (             
             <option key={props} value={props} > {props}  </option>
           )   )   }

          </select>

        </div>





            { (  years !== undefined || year !== null ) ? 
            <div> 

        <div className={Style.select} >
            <label rel="select" htmlFor="select" > type </label>

          <select id="region" name={"type"} onChange={handleChangeT} defaultValue={"goal"} > 
          { year ?  null : <option value={0} > select stats type  </option> }
         
             <option value={"played"} > played </option>
             <option value={"goal"} > goal  </option>
             <option value={"assist"} >  assist   </option>
             <option value={"yellow"} > yellow  </option>
             <option value={"red"} > red  </option>

             <option value={"played goal assist yellow red"} > played goal assist yellow red  </option>

      

          </select>

        </div>
                 <div className={Style.table} >

                    <PlayerStatsHead  active={type.slice(0,1)} />
            
                    {data.stats?.map((props, pos) => (

                    <PlayerStats
                    key={pos + 1}
                     pos={pos + 1}
                     name={props.player?.name.first + " " + props.player?.name.last}
                     logo={props.player?.picture?.url}

                      pts={ props?.[type] } 
                      pl={props?.played} 
                      


                    />
                    )   )   }

            </div>


                </div>



                : <h1 > no stats availabe</h1>}





                    </div>

 

    )
}

export {CompetitionNews, CompetitionFixtures, CompetitionResults, CompetitionTable, CompetitionStats }