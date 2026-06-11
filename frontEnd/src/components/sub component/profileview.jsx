import React, { useState, useEffect,  } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Style from "../../styles/Profile.module.css"
import { CardList, Inputs, OrderCard, PlayerBio, ProductCard } from "./list/Generallist";
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




        
                                <div className={Style.stats}> 
        
                                    <h2 > INFO </h2>
        
                                    <div className={Style.bio}>
                                        <PlayerBio topic={"First Name"} answer={info.name?.first} />  

                                        <PlayerBio topic={"Last Name"} answer={info.name?.last} />   

                                        <PlayerBio topic={"Username"} answer={info.username} />
        
                                        <PlayerBio topic={"Email"} answer={info.email}  />  

                                        <PlayerBio topic={"Phone"} answer={info.phone} />      


     


        
        
        
        
                                    </div>
                                                                           <br></br>
                                        <h2> ADDRESS </h2> 

                                        <br></br>


                                        <PlayerBio topic={"street"} answer={info.address?.street} />       
                                        <PlayerBio topic={"city"} answer={info.address?.city} />       
                                        <PlayerBio topic={"county"} answer={info.address?.county} />       
                                        <PlayerBio topic={"zipcode"} answer={info.address?.zipcode} />   
                                 </div>
            
                 {/* <div id={Style.logout} > */}

                    <button className={Style.edit} > <Link to={'edit'}> edit </Link> </button>


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


const ProfileWishlist = () => {
    
    const [news, setnews] = useState([])
        const [data, setData] = useState([])

     
          fetch(process.env.REACT_APP_API_LINK + 'getone/wishlist/', {
            method: 'GET',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
             }).then((res) =>  res.json())
             .then((data) => setData(data));


                  
                     useEffect(() => {
                         fetch(process.env.REACT_APP_API_LINK + "getall/news")
                         .then((res) =>  res.json())
                         .then((data) => setnews(data.data));
                     }, []);



    return (
        <div className={Style.teamNews}>



      <div className={Style["product-grid"]}>
        {news.map((p) => (
          <ProductCard
            // key={p.id}
            // name={p.name}
            // price={p.price}
            // image={p.image}

            name={p.head}
            image={p.imgUrl[0].url}
            price={50}
            link={'/product/' + p.name}
          />
        ))}
      </div>

                    </div>

 

    )
}



const ProfileOrder = () => {
    
    const [news, setnews] = useState([])
        const [data, setData] = useState([])

     
          fetch(process.env.REACT_APP_API_LINK + 'getone/wishlist/', {
            method: 'GET',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
             }).then((res) =>  res.json())
             .then((data) => setData(data));


                  
                     useEffect(() => {
                         fetch(process.env.REACT_APP_API_LINK + "getall/news")
                         .then((res) =>  res.json())
                         .then((data) => setnews(data.data));
                     }, []);



    return (
        <div className={Style.teamNews}>



      <div className={Style["product-grid"]}>
        {news.map((p) => (
          <OrderCard
            // key={p.id}
            // name={p.name}
            // price={p.price}
            // image={p.image}

            name={p.head}
            image={p.imgUrl[0].url}
            price={50}
            link={'/order/' + p.name}
          />
        ))}
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


            <h2 > Product </h2>

            <div className={Style.teamadminmenulist} >
                <CardList3 name={"Product"} to={"add"} category={"add"} link={"product"} logo={faPlus} />  
                <CardList3Edit name={"Product"} to={"edit"} category={"edit"} link={"product"} logo={faPenToSquare} id={"list"} />  
                <CardList3 name={"Product"} to={"region"} category={"delete"} link={"product"} logo={faTrash} />  
      
            </div>
            
        </div>

        
                
        <div className={Style.teamadminmenu} >


            <h2 > Category  </h2>

            <div className={Style.teamadminmenulist} >
                <CardList3 name={"Category"} to={"add"} category={"add"} link={"category"} logo={faPlus} />  
                <CardList3Edit name={"Category"} to={"edit"} category={"edit"} link={"category"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
            
        </div>


                 <div className={Style.teamadminmenu} >


            <h2 > Orders </h2>

            <div className={Style.teamadminmenulist} >
            <CardList3 name={"Team"} to={"add"} category={"add"} link={"team"} logo={faPlus} />  
            <CardList3Edit name={"Team "} to={"edit"} category={"edit"} link={"team"} logo={faPenToSquare} id={"list"} />  
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


export { Overview, ProfileNews, ProfileAdmin, ProfileWishlist, ProfileOrder }



