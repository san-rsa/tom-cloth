import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Tournament.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, Result, Table, Tablehead } from "./list/Tournamentlist";












const Standing = () => {

    const [data, setData] = useState([])

    const year = 2022 // new Date(2022).getFullYear()

    


    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/672a24205fa419f32c581933/standing/" + year)
        .then((res) =>  res.json())
        .then((data) => setData(data.data));
    }, []);




    return (
        <div className={Style.news}>
            <div className={Style.Nav}>
                
           <Tablehead />
   
              {data.standing?.slice(0, 5).map((props, pos) => (



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



     </div>
        </div>

    )
}




const Results = () => {

        
    const [data, setData] = useState([])

    const year = 2022 // new Date(2022).getFullYear()

    


    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/672a24205fa419f32c581933/results/" + year)
        .then((res) =>  res.json())
        .then((data) => setData(data.data));
    }, []);



    console.log(data);
    

    return (
        <div className={Style.news}>
            <div className={Style.result}>


            <h2 > Results</h2>


            {data.result?.slice(0, 1)?.map((prop) => (

                <div  >

                <h3 className={Style.day} > matchday:  {prop.matchday} </h3>


                
                    
                { prop.teams.map((props) => (
                    
                    <Result
                        Hname={props.home?.name}
                        Hlogo={props.home?.logo[0].url}
                        Hscore={props.home.homeScore}

                        date={props.time.date}
                        time={props.time.time}
                        

                        Ascore={props.away.awayScore}
                        Alogo={props.away?.logo[0].url}
                        Aname={props.away?.name}

                         
                        
                        />    
                ))


                    }



</div>
))
}





     </div>
        </div>

    )
}




const Fixtures = () => {


    
    const [data, setData] = useState([])

    const year = 2022 // new Date(2022).getFullYear()

    


    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/672a24205fa419f32c581933/fixtures/" + year)
        .then((res) =>  res.json())
        .then((data) => setData(data.data));
    }, []);



    console.log(data);
    


    return (
        <div className={Style.news}>
            <div className={Style.fix}>


            <h2> Fixtures</h2>

   
            {data.fixture?.slice(0, 1)?.map((props) => (

                <div  >

                <h3 className={Style.day} > matchday:  {props.matchday} </h3>


                 
                    
                   { props.teams.map((props) => (
                    
                    <Fixture
                        Hname={props.home?.name}
                        Hlogo={props.home?.logo[0].url}
                        date={props.time.date}
                        time={props.time.time}
                        Alogo={props.away?.logo[0].url}
                        Aname={props.away?.name}
                        
                        />    
                ))

                
                    }
            


            </div>
))
   }







     </div>
        </div>

    )
}




export  {Standing, Fixtures, Results}
