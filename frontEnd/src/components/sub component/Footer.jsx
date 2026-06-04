import React, { useState, ReactDOM } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Footer.module.css"
import {Link, useNavigate} from "react-router-dom"
import { faBars, faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'
import {
    faFacebookSquare,
    faGithub,
    faInstagram,
    faLinkedin,
   
  } from "@fortawesome/free-brands-svg-icons";
import {Footerlist, SocialList} from "./list/Footerlist";



const Footer = () => {

      const social = [
        {
            icon: faInstagram,
            name: "instagram",
            handle: "Agbedian",
            link: ""
        },

        {
            icon: faInstagram,
            name: "instagram",
            handle: "Agbedian",
            link: ""
        },

        {
            icon: faInstagram,
            name: "instagram",
            handle: "Agbedian",
            link: ""
        },

        {
            icon: faInstagram,
            name: "instagram",
            handle: "Agbedian",
            link: ""
        },

        {
            icon: faInstagram,
            name: "instagram",
            handle: "Agbedian",
            link: ""
        },

        {
            icon: faInstagram,
            name: "instagram",
            handle: "Agbedian",
            link: ""
        }


      ]


      const footerlist = [
        {
            head : "Quick links",
            link: [
                {
                    list: "code of conducts",
                    link: "/code-of-conduct"
                },

                {
                    list: "all teams",
                    link: "/teams"
                },

                {
                    list: "all regions",
                    link: "/regions"
                },
            ]
        },

        {
            head : "Quick links",
            link: [
                {
                    list: "all matches",
                    link: "/ffff"
                },

                {
                    list: "all matches",
                    link: "/ffff"
                },

                {
                    list: "all matches",
                    link: "/ffff"
                },

                
                {
                    list: "all matches",
                    link: "/ffff"
                },

                {
                    list: "all matches",
                    link: "/ffff"
                },
            ]
        },

        {
            head : "Quick links",
            link: [
                {
                    list: "all matches",
                    link: "/ffff"
                },

                {
                    list: "all matches",
                    link: "/ffff"
                },

                {
                    list: "all matches",
                    link: "/ffff"
                },
            ]
        },

        {
            head : "Quick links",
            link: [
                {
                    list: "all matches",
                    link: "/ffff"
                },

                {
                    list: "all matches",
                    link: "/ffff"
                },


                {
                    list: "all matches",
                    link: "/ffff"
                },

                {
                    list: "all matches",
                    link: "/ffff"
                },
            ]
        },

        {
            head : "Quick links",
            link: [
                {
                    list: "all matches",
                    link: "/ffff"
                },

                {
                    list: "all matches",
                    link: "/ffff"
                },

                {
                    list: "all matches",
                    link: "/ffff"
                },
            ]
        },

      ]



      const options = {weekday: "none", day: "none", month: "none"};
      const year = new Date().getFullYear(options);
    
    






    return (
        <div className={Style.footer}>

         
            <div className={Style.socials}>

                <h2> Follow Us</h2>

                {social.map((p, id) => (


                <SocialList  key={id}  icon={p.icon}  name={p.name} handle={p.handle}  link={p.link} />


                )   )   }

            </div>



                <div className={Style.otherLinks}>

                                        
                <h2> Agbedian League</h2>

                <div className={Style.others}>


                    {footerlist.map((p, id) => (


                        <Footerlist key={id} head={p.head} list={p.link}  /> 


                    )   )   }




                    </div>
                </div>


                <div className={Style.copyright} >
                    <p > @ {year} Agbedian League </p>
                </div>


        {/* <div className={Style.lnav}>
            <a ><FontAwesomeIcon icon={faBars} size="1x"/> </a> 
        </div> */}

                   {/* <div className={Style.rnav}>
<Link className={Style.navr}to={"/login"}  onClick={login} ><FontAwesomeIcon icon={faUser}/> </Link>
        
         <Link className={Style.navr} to={"/cart"}><FontAwesomeIcon icon={faCartShopping}/> </Link>

            <form id={Style.form} action="/search">
                <Search name="order" type={"text"} onchange={handleChange} value={data.order} class={Style.order} />  
            </form>



            <button id={Style.search} name="navbtn" onClick={hide}><FontAwesomeIcon icon={faSearch}/> </button>
   
        </div> */}

    </div>
    )
}

export default Footer