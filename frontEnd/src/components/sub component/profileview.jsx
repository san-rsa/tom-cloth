import React, { useState, useEffect,  } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Style from "../../styles/Profile.module.css"
import { CardList, Inputs, PlayerBio } from "./list/Generallist";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Styles from "../..//styles/News.module.css"

import {  faX, faHeart, faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, Result, Table, Tablehead } from "./list/Tournamentlist";
import News, { Mininews } from "./list/Newslist";
import { Standing } from "./Hometournament";
import { TeamList, TeamSquadList, TeamSquadListWithPosition } from "./list/Teamviewlist";
import { CardList2, CardList3, CardList3Edit } from "./list/Generallist";





const Overview = ({info, user }) => {
    
    const [fixture, setFixture] = useState([])
    const [team, setTeam] = useState({})
    const [result, setResult] = useState({})
    const navigate = useNavigate();
    
    

    

    
        useEffect(() => {
            if (user.team) {
                fetch(process.env.REACT_APP_API_LINK + "getaccess/user/team/",  {
                    method: 'GET',
                    credentials: "include",
                    headers: {'Content-Type': 'application/json'}, 
            })
                .then((res) =>  res.json())
                .then((data) => setTeam(data.data));
    
                fetch(process.env.REACT_APP_API_LINK + "getaccess/latest/fixture/",  {
                    method: 'GET',
                    credentials: "include",
                    headers: {'Content-Type': 'application/json'}, 
            })
                .then((res) =>  res.json())
                .then((data) => setFixture(data.data));



                fetch(process.env.REACT_APP_API_LINK + "getaccess/latest/result/",  {
                    method: 'GET',
                    credentials: "include",
                    headers: {'Content-Type': 'application/json'}, 
            })
                .then((res) =>  res.json())
                .then((data) => setResult(data.data));
            }
        }, [user]);        
        
        



        const logout = async (event) => {
       
           
            const api = await fetch(process.env.REACT_APP_API_LINK + 'auth/logout/', {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'},
                 })
                 
                 if (api.status === 200) {
                  navigate("/login");
                } 
              }

            






    return (
        <div className={Style.overview}>


            {  team ?  <div className={Style.teams} >

                        <h2 > Team</h2>

                    
                        <CardList
                            name={team.name}
                            to={"team"}
                            category={"Team"}
                       logo={team.logo && team?.logo[0]?.url} 
                        />

                        </div> : null }



                    <div className={Style.matches}>

        {result?.match &&         <div className={Style.result}>
                
        
            <h2 > Latest Results </h2>


            <Result
                Hname={result?.match?.home?.name}
                Hlogo={result?.match?.home?.logo[0]?.url}
                Hscore={result?.match?.homeScore}

                date={result?.match?.day?.date.slice(0, 10).replaceAll('-','/')} time={result?.match?.day?.time}

                matchday={result?.matchday}

                Ascore={result?.match?.awayScore}
                Alogo={result?.match?.away?.logo[0]?.url}
                Aname={result?.match?.away?.name}

               live={result?.match?.live} start={result?.match?.start} 
               half={result?.match?.half} minutes={result?.match?.time.now}


               _id={result?.match?._id}
               regionId={result?.regionId}

                        
                        
                        />    
    
        
        
        
        
                </div> }
                

            
            {fixture?.match &&         <div className={Style.fixture}>

            <h2 > Next Match </h2>


            <Fixture 

                 
                Hname={fixture.match?.home?.name}
                Hlogo={fixture.match?.home?.logo[0]?.url}
                Hscore={fixture.match?.homeScore}

                date={fixture.match?.day?.date.slice(0, 10).replaceAll('-','/')} time={fixture.match?.day?.time}

                matchday={fixture.matchday}

                Ascore={fixture.match?.awayScore}
                Alogo={fixture.match.away?.logo[0]?.url}
                Aname={fixture.match.away?.name}

               live={fixture.match?.live} start={fixture.match?.start} 
               half={fixture.match?.half} minutes={fixture.match?.time.now}


               _id={fixture.match._id}
               regionId={fixture.regionId}

            />  




        </div> }


        </div>


        
                                <div className={Style.stats}> 
        
                                    <h2 > INFO </h2>
        
                                    <div className={Style.bio}>
                                        <PlayerBio topic={"First Name"} answer={info.name?.first} />  

                                        <PlayerBio topic={"Last Name"} answer={info.name?.last} />   

                                        <PlayerBio topic={"Username"} answer={info.username} />
        
                                        <PlayerBio topic={"Email"} answer={info.email}  />  

                                        <PlayerBio topic={"Phone"} answer={info.phone} />       

        
        
        
        
                                    </div>
                                    
                                 </div>
            
                 {/* <div id={Style.logout} > */}
                    <button className={Style.logout} onClick={logout}> logout</button>
                {/* </div> */}

        </div>

    )
}


const ProfileNews = () => {
    
    const [news, setnews] = useState([])
     
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setnews(data.data));
        }, []);



    return (
        <div className={Style.teamNews}>





                    <div className={Style.top} >
                    {news.slice(0, 1).map((project) => (


                    <News
                        head={project.head}
                        img={project.imgUrl[0].url}
                        body={project.body}
                        />    


                    )   )   }
                    </div>

                        <div className={Style.other_news} > 

                        {news.slice(1, 10).map((project) => (


                        <Mininews
                            key={project._id}
                            head={project.head}
                            img={project.imgUrl[0].url}
                            link={project.head}
                            />    


                        )   )   }
                    
                            </div>

                    </div>

 

    )
}



const ProfileAdmin = ({}) => {
    

    return (
        <div className={Style.teamAdmin}>

        <div className={Style.teamadminmenu} >

            <h2 > Banner</h2>

            <div className={Style.teamadminmenulist} >
                <CardList3 name={"Banner"} to={"add"} category={"add"} link={"banner"} logo={faPlus} />  
                <CardList3Edit name={"Banner"} to={"edit"} category={"edit"} link={"banner"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
        </div>


        <div className={Style.teamadminmenu} >

            <h2 > Code Of Conduct</h2>

            <div className={Style.teamadminmenulist} >
                <CardList3 name={"Code Of Conduct"} to={"add"} category={"add"} link={"code-of-conduct"} logo={faPlus} />  
                <CardList3Edit name={"Code Of Conduct"} to={"edit"} category={"edit"} link={"code-of-conduct"} logo={faPenToSquare} id={"list"} />  
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


                
        <div className={Style.teamadminmenu} >


            <h2 > Region</h2>

            <div className={Style.teamadminmenulist} >
                <CardList3 name={"Region"} to={"add"} category={"add"} link={"region"} logo={faPlus} />  
                <CardList3Edit name={"Region"} to={"edit"} category={"edit"} link={"region"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
            
        </div>

        
                
        <div className={Style.teamadminmenu} >


            <h2 > Sub Region </h2>

            <div className={Style.teamadminmenulist} >
                <CardList3 name={"Sub Region"} to={"add"} category={"add"} link={"sub-region"} logo={faPlus} />  
                <CardList3Edit name={"Sub Region"} to={"edit"} category={"edit"} link={"sub-region"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
            
        </div>


                 <div className={Style.teamadminmenu} >


            <h2 > Add Team </h2>

            <div className={Style.teamadminmenulist} >
            <CardList3 name={"Team"} to={"add"} category={"add"} link={"team"} logo={faPlus} />  
            <CardList3Edit name={"Team "} to={"edit"} category={"edit"} link={"team"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
            
        </div>


         <div className={Style.teamadminmenu} >


            <h2 > Add Team to Region </h2>

            <div className={Style.teamadminmenulist} >
                <CardList3Edit name={"Add Team to Region"} to={"add"} category={"add"} link={"add-team-to-region"} logo={faPlus} id={"list"} />  
                <CardList3Edit name={"Add Team to Region"} to={"delete"} category={"delete"} link={"add-team-to-region"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
            
        </div>

                
        <div className={Style.teamadminmenu} >


            <h2 > Fixture </h2>

            <div className={Style.teamadminmenulist} >
                <CardList3Edit name={"Fixture"} to={"add"} category={"add"} link={"fixture"} logo={faPlus} id={"list"} />  
                <CardList3Edit name={"Fixture"} to={"edit"} category={"edit"} link={"fixture"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
            
        </div>

        
        <div className={Style.teamadminmenu} >


            <h2 > Add User To Team</h2>

            <div className={Style.teamadminmenulist} >
                <CardList3Edit name={"User"} to={"add"} category={"add"} link={"user"} logo={faPlus} id={"list"} />  
                <CardList3Edit name={"User"} to={"delete"} category={"delete"} link={"user"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
            
        </div>


                <div className={Style.teamadminmenu} >


            <h2 > Add Admin </h2>

            <div className={Style.teamadminmenulist} >
                <CardList3Edit name={"Admin"} to={"add"} category={"add"} link={"admin"} logo={faPlus} id={"list"} />  
                <CardList3Edit name={"Admin"} to={"delete"} category={"delete"} link={"admin"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
            
        </div>



                    



         




                    </div>

 

    )
}


export { Overview, ProfileNews, ProfileAdmin }



