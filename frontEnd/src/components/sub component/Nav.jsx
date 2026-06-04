import React, { useState, ReactDOM } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Nav.module.css"
import {Link, useNavigate} from "react-router-dom"
import { faBars, faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'



const Nav = () => {


    const [data, setInputs] = useState({});
    const [burger, setburger] = useState(false)
    const navigate = useNavigate();


    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }



    const login = async () => {
       
           
    const api = await fetch(process.env.REACT_APP_API_LINK + 'auth/autoLogin/', {
        method: 'GET',
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
         })
         
         if (api.status === 200) {
          navigate("/user");
        } else {
            navigate("/login")
        }
      }







    const [search, setelement] = useState()

    function toggle (p){

        setburger(!burger)

    }

    return (
        <nav>
            <FontAwesomeIcon className={Style.burger} icon={faBars} size="2x" onClick={toggle} /> 

             <Link to={"/"}>
             {/* <img src={require("../../logo.png")} /> */}
             <h1 id={Style.navh1}> AGBEDIAN LEAGUE</h1>
             </Link>



                       <div className={Style.menu} >
           
                      <Link to={"/regions"}> <h3 id={Style.navh1}> Regions</h3> </Link>
          
                      <Link to={"/teams"}> <h3 id={Style.navh1}> Teams</h3> </Link>
                       
                       
                       
                       
                       
                       {/* <Link to={"/"}>
          
                                         {/*  <Link to={"/"}>
                       <h3 id={Style.navh1}> Matches </h3>
                       </Link>
                        */}

                       {/*   <Link to={"/"}>
                       <h3 id={Style.navh1}> Teams </h3>
                       </Link>
                      */}
                       
                       </div>


          { burger &&  
                       <div className={Style.navmenu} >
                        
                        <Link to={"/regions"}> <h3 id={Style.navh1}> Regions</h3> </Link>
          
                       <Link to={"/teams"}> <h3 id={Style.navh1}> Teams</h3> </Link>
                       {/* <Link to={"/"}>
                       <h3 id={Style.navh1}> Matches </h3>
                       </Link>

                       <Link to={"/"}>
                       <h3 id={Style.navh1}> Teams </h3>
                       </Link> */}
          
                       
                       </div>
          }

        {/* <div className={Style.rnav}>
                <Link className={Style.navr}to={"/login"}  onClick={login} ><FontAwesomeIcon icon={faUser}/> </Link>
        


        </div> */}

    </nav>
    )
}

export default Nav