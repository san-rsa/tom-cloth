import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Codeofconduct.module.css"
import Nav from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Footer from "../components/sub component/Footer";




const Codeofconduct = ({}) => {

    const [data, setData] = useState([])
    const [isActive, setActive] = useState({players: false, coaches: false, clubs: false, spectators: false, refrees: false, fans: false, communities: false});    

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getall/code-of-conduct")
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);

        // useEffect(() => {
        //     fetch(process.env.REACT_APP_API_LINK  + "getall/product")
        //     .then((res) =>  res.json())
        //     .then((data) => setproduct(data.data));
        // }, []);


        function activate(e) {

            
            const name = e.target.children[0]?.innerText?.toLowerCase();
            const name2 = e.target.innerText?.toLowerCase();

            const classlist = e.target?.classList[1]


            console.log(e,name, isActive, classlist);

            if (classlist == "Codeofconduct_active__Fuymx" ) {

                setActive(values => ({...values, [name]: false}))
            } else {
              
                setActive({players: false, coaches: false, clubs: false, spectators: false, refrees: false, fans: false, communities: false});  

                data.map((props, ) => (
                    setActive(values => ({...values, [props.title]: false}))
                    )   )  

                    console.log( isActive,);


                setActive(values => ({...values, [name]: true}))
            }



            
        }
    
      //  console.log(data);
        
 



    return (
        <div>
         <Nav />
            <div className={Style.coc}>

            
            <h1 > CODE OF CONDUCT</h1>




            <div className={Style.coclist}>


                {data?.map((props, pos) => (

                <div key={props.title} className={`${Style.section} ${isActive[props.title.toLowerCase()] ? Style.active : null } ${Style[props.title?.toLowerCase()]}` } >

                <div className={`${Style.head} ${isActive[props.title?.toLowerCase()] && Style.active }`} onClick={activate}>
                    <h3 > {props.title.toUpperCase()}</h3>

                    {isActive[props.title?.toLowerCase()] ? <FontAwesomeIcon icon={faArrowUp } /> :  <FontAwesomeIcon icon={faArrowDown } />} 

                </div>


                    {isActive[props.title?.toLowerCase()] ? 
                    
                    <div className={Style.body} >  <p> {props.body} </p> </div>: null } 




                </div>


                )   )   }



                <div className={`${Style.section} ` }>

                <div className={`${Style.head} ${isActive.coaches && Style.active}`} onClick={activate}>
                    <h3 > {"Coaches".toUpperCase()}</h3>

                    {isActive.coaches ? <FontAwesomeIcon icon={faArrowUp } /> :  <FontAwesomeIcon icon={faArrowDown } />} 

                </div>


                    { isActive.coaches && 
                    <p> {data[1]?.body}
                    </p>}




                </div>



                <div className={`${Style.section} ` }>

                    <div className={`${Style.head} ${isActive.clubs && Style.active}`} onClick={activate}>
                        <h3 > {"Clubs".toUpperCase()}</h3>

                        {isActive.clubs ? <FontAwesomeIcon icon={faArrowUp } /> :  <FontAwesomeIcon icon={faArrowDown } />} 

                    </div>


                        { isActive.clubs && 
                        <p>  Play fairly
                            Not cheat, dive, complain or waste time
                            Respect my team mates, the other team, the referee and my coach or team manager
                            Play by the rules, as directed by the referee
                            Be gracious in victory and defeat
                            I will show respect to the opposite team and referee at the end of the game
                            Listen and respond to what my Coach has to do what is best for the team and not one individual player
                            Talk to someone I trust or the club Welfare Officer if I am unhappy about anything at my club

                            I understand that if I do not follow the code, any/all of the following actions may be taken by my club, county FA or The FA: I may:

                            Be required to apologise to my team-mates, my coach and any visiting club members
                            Receive a formal warning from the Coach – Be excluded from game scenarios
                            Be suspended from training – be required to leave the academy and in addition:
                            PFA may make my parent or carer aware of any infringements of the Code of Conduct
                            The FA/County FA could make a complaint against the academy
                        </p>}




                </div>



                <div className={`${Style.section} ` }>

                <div className={`${Style.head} ${isActive.refrees && Style.active}`} onClick={activate}>
                    <h3 > {"Refrees".toUpperCase()}</h3>

                    {isActive.refrees ? <FontAwesomeIcon icon={faArrowUp } /> :  <FontAwesomeIcon icon={faArrowDown } />} 

                </div>


                    { isActive.refrees && 
                    <p>  Play fairly
                        Not cheat, dive, complain or waste time
                        Respect my team mates, the other team, the referee and my coach or team manager
                        Play by the rules, as directed by the referee
                        Be gracious in victory and defeat
                        I will show respect to the opposite team and referee at the end of the game
                        Listen and respond to what my Coach has to do what is best for the team and not one individual player
                        Talk to someone I trust or the club Welfare Officer if I am unhappy about anything at my club

                        I understand that if I do not follow the code, any/all of the following actions may be taken by my club, county FA or The FA: I may:

                        Be required to apologise to my team-mates, my coach and any visiting club members
                        Receive a formal warning from the Coach – Be excluded from game scenarios
                        Be suspended from training – be required to leave the academy and in addition:
                        PFA may make my parent or carer aware of any infringements of the Code of Conduct
                        The FA/County FA could make a complaint against the academy
                    </p>}




                </div>



                <div className={`${Style.section} ` }>

                <div className={`${Style.head} ${isActive.fans && Style.active}`} onClick={activate}>
                    <h3 > {"Fans".toUpperCase()}</h3>

                    {isActive.fans ? <FontAwesomeIcon icon={faArrowUp } /> :  <FontAwesomeIcon icon={faArrowDown } />} 

                </div>


                    { isActive.fans && 
                    <p>  Play fairly
                        Not cheat, dive, complain or waste time
                        Respect my team mates, the other team, the referee and my coach or team manager
                        Play by the rules, as directed by the referee
                        Be gracious in victory and defeat
                        I will show respect to the opposite team and referee at the end of the game
                        Listen and respond to what my Coach has to do what is best for the team and not one individual player
                        Talk to someone I trust or the club Welfare Officer if I am unhappy about anything at my club

                        I understand that if I do not follow the code, any/all of the following actions may be taken by my club, county FA or The FA: I may:

                        Be required to apologise to my team-mates, my coach and any visiting club members
                        Receive a formal warning from the Coach – Be excluded from game scenarios
                        Be suspended from training – be required to leave the academy and in addition:
                        PFA may make my parent or carer aware of any infringements of the Code of Conduct
                        The FA/County FA could make a complaint against the academy
                    </p>}




                </div>



<div className={`${Style.section} ` }>

<div className={`${Style.head} ${isActive.communities && Style.active}`} onClick={activate}>
    <h3 > {"Communities".toUpperCase()}</h3>

    {isActive.communities ? <FontAwesomeIcon icon={faArrowUp } /> :  <FontAwesomeIcon icon={faArrowDown } />} 

</div>


    { isActive.communities && 
    <p>  Play fairly '\n`\n`b /n '/n `/n'
        Not cheat, dive, complain or waste time
        Respect my team mates, the other team, the referee and my coach or team manager
        Play by the rules, as directed by the referee
        Be gracious in victory and defeat
        I will show respect to the opposite team and referee at the end of the game
        Listen and respond to what my Coach has to do what is best for the team and not one individual player
        Talk to someone I trust or the club Welfare Officer if I am unhappy about anything at my club

        I understand that if I do not follow the code, any/all of the following actions may be taken by my club, county FA or The FA: I may:

        Be required to apologise to my team-mates, my coach and any visiting club members
        Receive a formal warning from the Coach – Be excluded from game scenarios
        Be suspended from training – be required to leave the academy and in addition:
        PFA may make my parent or carer aware of any infringements of the Code of Conduct
        The FA/County FA could make a complaint against the academy
    </p>}




</div>






            </div>

    
                        




     </div>

     <Footer />
        </div>

    )
}





export default Codeofconduct
