import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Matchupdate.module.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { AlertError, Inputs } from "./list/Generallist";




const AddMatchLineup = ({ competition, match, matchId, matchday }) => {
  const [data, setInputs] = useState({})
  const [starting, setStarting] = useState([])
  const [sub, setSub] = useState([])



  const [submitbtn, setSubmitBtn] = useState(false)
  const [players, setPlayers] = useState([])   
  const [team, setTeam] = useState({})   



  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()
        
  


    useEffect(() => {

            fetch(process.env.REACT_APP_API_LINK + "getaccess/user/team/all-players",  {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'}, 
        })
            .then((res) =>  res.json())
            .then((data) => setPlayers(data.data));

            fetch(process.env.REACT_APP_API_LINK + "getaccess/user/team/",  {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'}, 
        })
            .then((res) =>  res.json())
            .then((data) => setTeam(data.data));



            


      }, []);
        

    const h1 = "Match Lineup" ;  

    
    
    
      const handleChangeStarting = (event) => {
       const name = event.target.name;
       const value = event.target.value;
        setStarting(values => ({...values, [name]: value}))

      }

      const handleChangeSub = (event) => {
        const name = event.target.name;
        const value = event.target.value;
         setSub(values => ({...values, [name]: value}))
 
       }
    
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      

  
       formData.append('starting',  JSON.stringify(starting));
       formData.append('sub',  JSON.stringify(sub));
       formData.append('action',  JSON.stringify("line-up"));
       formData.append('matchday',  JSON.stringify(matchday));



    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + "admin/update/" +  competition.name + "/fixture/" + matchId ,{ //fetchs.link, {
        method: "PATCH", // fetchs.method,
        credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {           

           if (res.status == 200) {

         

          
                navigate("./../.."); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               setSubmitBtn(false);
               
            } else {
              //  navigate("/user"); 

            }
          }).catch((e) => {
          console.log(e);
          setSubmitBtn(false)
          AlertError("error try again later")

        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        team.logo &&    <img src={team.logo[0].url } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>


        <div className={Style.starting}> 
            <h2> Starting</h2>

                    { Array.from({ length: competition.substitute?.starting }, (_, i) => i + 1).map((props,) => (

          
        <div className={Style.select} key={props} >


        <label rel="select" htmlFor="select" >player {props}</label>

          <select id="starting" name={"player" + props } onChange={handleChangeStarting} required > 
          { data.team ?  null : <option value={""} > select a player  </option> }


          {players.map((props) => (

                        
        <option key={props._id} value={props._id} > {props.name?.first + " " + props.name?.last}  </option>
 


                )   )   }
    


          </select>

        </div>
            

            )              )}      
        </div>
    
        
        <div className={Style.sub}> 
            <h2> sub</h2>

                    { Array.from({ length: competition.substitute?.sub }, (_, i) => i + 1).map((props,) => (

          
        <div className={Style.select} key={props} >


        <label rel="select" htmlFor="select" >player {props}</label>

          <select id="starting" name={"player" + props } onChange={handleChangeSub} required > 
          { data.team ?  null : <option value={""} > select a player  </option> }


          {players.map((props) => (

                        
        <option key={props._id} value={props._id} > {props.name?.first + " " + props.name?.last}  </option>
 


                )   )   }
    


          </select>

        </div>
            

            )              )}      
        </div>




        <button className="submit" type="submit"  disabled={submitbtn}> Submit</button> 

        </form>

    </div>

    )
}






// live et

const AddMatchExtraTime = ({ competition, match, matchId, matchday }) => {

  const [data, setInputs] = useState({})

  const [submitbtn, setSubmitBtn] = useState(false)
  const [team, setTeam] = useState({})   



  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()
        
  


    useEffect(() => {

            fetch(process.env.REACT_APP_API_LINK + "getaccess/user/team/",  {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'}, 
        })
            .then((res) =>  res.json())
            .then((data) => setTeam(data.data));



            


      }, []);
        

    const h1 = "Add Extra Time" ;  
    
    
    
      const handleChange = (event) => {
       const name = event.target.name;
       const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }    
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      

       formData.append('data',  JSON.stringify(data));
       formData.append('action',  JSON.stringify("extra-time"));
       formData.append('matchday',  JSON.stringify(matchday));



    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + "admin/update/" +  competition.name + "/fixture/" + matchId ,{ //fetchs.link, {
        method: "PATCH", // fetchs.method,
        credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {           

           if (res.status == 200) {

         

          
                navigate("./../.."); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               setSubmitBtn(false);
               
            } else {
              //  navigate("/user"); 

            }
          }).catch((e) => {
          console.log(e);
          setSubmitBtn(false)
          AlertError("error try again later")

        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        team.logo &&    <img src={team.logo[0].url } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

    

        <Inputs label={'add extra time'} type={'Number'} name={'extraTime'} onchange={handleChange} value={data.extra}  placeholder={'add extra time'} disabled={false} required={true}  />

        <button className="submit" type="submit"  disabled={submitbtn}> Submit</button> 

        </form>

    </div>

    )
}


// edit for live

const AddMatchStart = ({ competition, match, matchId, matchday }) => {
  const [data, setInputs] = useState({})
  const [submitbtn, setSubmitBtn] = useState(false)
  const [team, setTeam] = useState({})   



  let navigate = useNavigate()
        
  


    useEffect(() => {

            fetch(process.env.REACT_APP_API_LINK + "getaccess/user/team/",  {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'}, 
        })
            .then((res) =>  res.json())
            .then((data) => setTeam(data.data));



            


      }, []);
        

    const h1 = "Start Match" ;  

    

      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
         setInputs(values => ({...values, [name]: value}))
 
       }
    
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      

       formData.append('data',  JSON.stringify(data));
       formData.append('action',  JSON.stringify("start"));
       formData.append('matchday',  JSON.stringify(matchday));



  
    
       const api = fetch(process.env.REACT_APP_API_LINK + "admin/update/" +  competition.name + "/fixture/" + matchId ,{ //fetchs.link, {
        method: "PATCH", // fetchs.method,
        credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {           

           if (res.status == 200) {

         

          
                navigate("./../.."); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               setSubmitBtn(false);
               
            } else {
              //  navigate("/user"); 

            }
          }).catch((e) => {
          console.log(e);
          setSubmitBtn(false)
          AlertError("error try again later")

        })


        
    
    
     
      
      }

      console.log(data);
      


    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        team.logo &&    <img src={team.logo[0].url } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>



        <div className={Style.select} >


        <label rel="select" htmlFor="select" >start type  </label>

          <select id="start" name={"start"} onChange={handleChange} required > 
          { data.start ?  null : <option value={""} > start type  </option> }

            <option value={"start game"} > Start Game  </option>


            {/* <option value={"second"} > Start Second Half  </option> */}


          {/* {(competition.type == "cup" ) ? 
          <div >
              <option value={"extra time"} > Start Extra Time </option>
              <option value={"extra time second half"} > Start Extra Time Second Half  </option> 
          </div>
          : null}  */}


 
    


          </select>

        </div>
            
    
        <button className="submit" type="submit"  disabled={submitbtn}> Submit</button> 

        </form>

    </div>

    )
}






const AddMatchSub = ({ competition, match, matchId, matchday }) => {
  const [data, setInputs] = useState({})
  const [submitbtn, setSubmitBtn] = useState(false)
  const [team, setTeam] = useState({}) 

  const [playerIn, setPlayerIn] = useState([]) 
  const [playerOut, setPlayerOut] = useState([]) 


  const [sub, setSub] = useState("") 




  let navigate = useNavigate()


    useEffect(() => {

            fetch(process.env.REACT_APP_API_LINK + "getaccess/user/team/",  {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'}, 
        })
            .then((res) =>  res.json())
            .then((data) => setTeam(data.data));
// handleArrays()
      }, []);


  

    const h1 = "Match Substitution" ;  

    
     const player = match.match?.lineup
     const userT = match.match 
     const substitute = match.match?.timeline 








      useEffect(() => {
        if (userT && substitute ) {
          const playersIn = []
          const playersOut = []

          if (userT.home._id == team._id) {
            
        if (substitute ) {
          for (let i = 0; i < substitute?.length; i++) {
            const element = substitute[i];
      
            if (substitute[i].action == "substitution") {
              playersIn.push(substitute[i].player.main._id)
              playersOut.push(substitute[i].player.assist._id)
      
            }
            
          }
            const newArray1 = player?.sub.home?.filter(item => !playersIn.includes(item._id));     
            const newArray2 = player?.starting.home?.filter(item => !playersOut.includes(item._id));       
        
          console.log(newArray1, newArray2, playersIn, playersOut);
      
           setPlayerIn(newArray1)
           setPlayerOut(newArray2)
          

      
        };
         } else if (userT.away._id == team._id) {
          if (substitute ) {
            for (let i = 0; i < substitute?.length; i++) {
              const element = substitute[i];
        
              if (substitute[i].action == "substitution") {
                playersIn.push(substitute[i].player.main._id)
                playersOut.push(substitute[i].player.assist._id)
        
              }
              
            }
              const newArray1 = player?.sub.away?.filter(item => !playersIn.includes(item._id));     
              const newArray2 = player?.starting.away?.filter(item => !playersOut.includes(item._id));       
          
            console.log(newArray1, newArray2, playersIn, playersOut);
        
             setPlayerIn(newArray1)
             setPlayerOut(newArray2)
            
  
        
          };

         } 
        }



        
  }, [team]);




  // useEffect(() => {
      
  //     const playersIn = []
  //     const playersOut = []

  //   if (substitute ) {
      
  //     for (let i = 0; i < substitute?.length; i++) {
  //       const element = substitute[i];

  //       if (substitute[i].action == "substitution") {
  //         playersIn.push(substitute[i].player.main._id)
  //         playersOut.push(substitute[i].player.assist._id)

  //       }
        
  //     }

  //       const newArray1 = playerIn?.filter(item => !playersIn.includes(item._id));     
  //       const newArray2 = playerOut?.filter(item => !playersOut.includes(item._id));       
    
  //     console.log(newArray1, newArray2, playersIn, playersOut);

  //      setPlayerIn(newArray1)
  //      setPlayerOut(newArray2)
      
  //   }

  //   }, [sub ]);



  

  function sq () {
    const playersIn = []
    const playersOut = []

  if (substitute ) {
    
    for (let i = 0; i < substitute?.length; i++) {
      const element = substitute[i];

      if (substitute[i].action == "substitution") {
        playersIn.push(substitute[i].player.main._id)
        playersOut.push(substitute[i].player.assist._id)

      }
      
    }

      const newArray1 = playerIn?.filter(item => !playersIn.includes(item._id));     
      const newArray2 = playerOut?.filter(item => !playersOut.includes(item._id));       
  
    console.log(newArray1, newArray2, playersIn, playersOut);

     setPlayerIn(newArray1)
     setPlayerOut(newArray2)
    
  }

  };






       const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
         setInputs(values => ({...values, [name]: value}))
 
       }
    
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      

  
       formData.append('data',  JSON.stringify(data));
       formData.append('action',  JSON.stringify("substitution"));
       formData.append('matchday',  JSON.stringify(matchday));



    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + "admin/update/" +  competition.name + "/fixture/" + matchId ,{ //fetchs.link, {
        method: "PATCH", // fetchs.method,
        credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {           

           if (res.status == 200) {

         

          
                navigate("./../.."); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               setSubmitBtn(false);
               
            } else {
              //  navigate("/user"); 

            }
          }).catch((e) => {
          console.log(e);
          setSubmitBtn(false)
          AlertError("error try again later")

        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        team.logo &&    <img src={team.logo[0].url } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>



          
      <Inputs label={'Time'} type={'Number'} name={'minutes'} onchange={handleChange} value={data.minutes}  placeholder={'Time'} disabled={false} required={true} />


      <Inputs label={'Extra Time'} type={'Number'} name={'et'} onchange={handleChange} value={data.et}  placeholder={'Extra Time'} disabled={false} required={true} />

    
        

        <div className={Style.select}  >
            <h2> in</h2>


        <label rel="select" htmlFor="select" > player </label>

          <select id="assist" name={"main" } onChange={handleChange} required > 
          { data.team ?  null : <option value={""} > select a player  </option> }



        {playerIn?.map((props) => (

                        
        <option key={props._id} value={props._id} > {props.name?.first + " " + props.name?.last}  </option> )) 

}
    

          </select>

        </div>


        <div className={Style.select}  >
            <h2> out</h2>


        <label rel="select" htmlFor="select" > player </label>

          <select id="main" name={"assist" } onChange={handleChange} required > 
          { data.team ?  null : <option value={""} > select a player  </option> }

        {playerOut?.map((props) => (

                        
        <option key={props._id} value={props._id} > {props.name?.first + " " + props.name?.last}  </option> )) }
    


          </select>

        </div>

        <button className="submit" type="submit"  disabled={submitbtn}> Submit</button> 

        </form>

    </div>

    )
}






const AddMatchGoal = ({ competition, match, matchId, matchday }) => {
  const [data, setInputs] = useState({})
  const [submitbtn, setSubmitBtn] = useState(false)
  const [team, setTeam] = useState({})   


  const [playerIn, setPlayerIn] = useState([]) 
  const [playerOut, setPlayerOut] = useState([]) 


  const [sub, setSub] = useState("") 


  let navigate = useNavigate()



        
  


    useEffect(() => {

            fetch(process.env.REACT_APP_API_LINK + "getaccess/user/team/",  {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'}, 
        })
            .then((res) =>  res.json())
            .then((data) => setTeam(data.data));



            


      }, []);
        

    const h1 = "Match Goal" ;  

    
     const player = match.match?.lineup
     const userT = match.match 
     const substitute = match.match?.timeline 


     useEffect(() => {
      if (userT && substitute) {


        const playersIn = []
        const playersOut = []
      
      if (substitute ) {
        
        for (let i = 0; i < substitute?.length; i++) {
          const element = substitute[i];
      
          if (substitute[i].action == "substitution") {
      
            if (userT) {
              if (substitute[i].team == "home") {
      
                playersIn.push(substitute[i].player.main._id)
                playersOut.push(substitute[i].player.assist._id)
      
             } else if (substitute[i].team == "away") {
              
              playersIn.push(substitute[i].player.main._id)

              playersOut.push(substitute[i].player.assist._id)
      
             } 
            }
      
          }
          
        }
      

      
      
        if (userT.home._id == team._id) {

          const newArray1 =  player?.starting?.home?.filter(item => !playersOut.includes(item._id)); 
          
          if (playersIn.length == 0) {
            setPlayerIn( newArray1)

          } else {
            const newArray2 = player?.sub?.home?.filter(item => playersIn.includes(item._id));       
          
      
             const allP = [...newArray1, ...newArray2]
      
              setPlayerIn( allP)
          }


       } else if (userT.away._id == team._id) {

        const newArray1 =  player?.starting?.away?.filter(item => !playersOut.includes(item._id));     

        if (playersIn.length == 0) {
          setPlayerIn( newArray1)

        } else {
          const newArray2 = player?.sub?.away?.filter(item => playersIn.includes(item._id));       
        
    
           const allP = [...newArray1, ...newArray2]
    
            setPlayerIn( allP)
        }
    

       } 
      }  


      }
}, [team]);

   
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
         setInputs(values => ({...values, [name]: value}))
 
       }
    
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      

  
       formData.append('data',  JSON.stringify(data));
       formData.append('action',  JSON.stringify("goal"));
       formData.append('matchday',  JSON.stringify(matchday));



    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + "admin/update/" +  competition.name + "/fixture/" + matchId ,{ //fetchs.link, {
        method: "PATCH", // fetchs.method,
        credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {           

           if (res.status == 200) {

         

          
                navigate("./../.."); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               setSubmitBtn(false);
               
            } else {
              //  navigate("/user"); 

            }
          }).catch((e) => {
          console.log(e);
          setSubmitBtn(false)
          AlertError("error try again later")

        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        team.logo &&    <img src={team.logo[0].url } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

       <Inputs label={'Time'} type={'Number'} name={'minutes'} onchange={handleChange} value={data.minutes}  placeholder={'Time'} disabled={false} required={true} />


      <Inputs label={'Extra Time'} type={'Number'} name={'et'} onchange={handleChange} value={data.et}  placeholder={'Extra Time'} disabled={false} required={true} />


          
        <div className={Style.select}  >
            <h2> main</h2>


        <label rel="select" htmlFor="select" > player </label>

          <select id="main" name={"main" } onChange={handleChange} required > 
          { data.team ?  null : <option value={""} > select a player  </option> }


        {playerIn?.map((props) => (

                        
        <option key={props._id} value={props._id} > {props.name?.first + " " + props.name?.last}  </option> )) 

}
    
    


          </select>

        </div>
    
        

        <div className={Style.select}  >
            <h2> assist</h2>


        <label rel="select" htmlFor="select" > player </label>

          <select id="assist" name={"assist" } onChange={handleChange}  > 
          { data.team ?  null : <option value={""} > select a player  </option> }


        {playerIn?.map((props) => (

                        
        <option key={props._id} value={props._id} > {props.name?.first + " " + props.name?.last}  </option> )) 

}
    
    


          </select>

        </div>




        <button className="submit" type="submit"  disabled={submitbtn}> Submit</button> 

        </form>

    </div>

    )
}





const AddMatchYellow = ({ competition, match, matchId, matchday }) => {
  const [data, setInputs] = useState({})
  const [submitbtn, setSubmitBtn] = useState(false)
  const [team, setTeam] = useState({})   


  const [playerIn, setPlayerIn] = useState([]) 
  const [playerOut, setPlayerOut] = useState([]) 


  const [sub, setSub] = useState("") 


  let navigate = useNavigate()



        
  


    useEffect(() => {

            fetch(process.env.REACT_APP_API_LINK + "getaccess/user/team/",  {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'}, 
        })
            .then((res) =>  res.json())
            .then((data) => setTeam(data.data));



            


      }, []);
        

    const h1 = "Match Goal" ;  

    
     const player = match.match?.lineup
     const userT = match.match 
     const substitute = match.match?.timeline 


     useEffect(() => {
      if (userT && substitute) {


        const playersIn = []
        const playersOut = []
      
      if (substitute ) {
        
        for (let i = 0; i < substitute?.length; i++) {
          const element = substitute[i];
      
          if (substitute[i].action == "substitution") {
      
            if (userT) {
              if (substitute[i].team == "home") {
      
                playersIn.push(substitute[i].player.main._id)
                playersOut.push(substitute[i].player.assist._id)
      
             } else if (substitute[i].team == "away") {
              
              playersIn.push(substitute[i].player.main._id)
              playersOut.push(substitute[i].player.assist._id)
      
             } 
            }
      
          }
          
        }
      

      
      
        if (userT.home._id == team._id) {

          const newArray1 =  player?.starting?.home?.filter(item => !playersOut.includes(item._id)); 
          
          if (playersIn.length == 0) {
            setPlayerIn( newArray1)

          } else {
            const newArray2 = player?.sub?.home?.filter(item => playersIn.includes(item._id));       
          
      
             const allP = [...newArray1, ...newArray2]
      
              setPlayerIn( allP)
          }


       } else if (userT.away._id == team._id) {

        const newArray1 =  player?.starting?.away?.filter(item => !playersOut.includes(item._id));     

        if (playersIn.length == 0) {
          setPlayerIn( newArray1)

        } else {
          const newArray2 = player?.sub?.away?.filter(item => playersIn.includes(item._id));       
        
    
           const allP = [...newArray1, ...newArray2]
    
            setPlayerIn( allP)
        }
    

       } 
      }  


      }
}, [team]);

   
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
         setInputs(values => ({...values, [name]: value}))
 
       }
    
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      

  
       formData.append('data',  JSON.stringify(data));
       formData.append('action',  JSON.stringify("yellow"));
       formData.append('matchday',  JSON.stringify(matchday));



    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + "admin/update/" +  competition.name + "/fixture/" + matchId ,{ //fetchs.link, {
        method: "PATCH", // fetchs.method,
        credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {           

           if (res.status == 200) {

         

          
                navigate("./../.."); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               setSubmitBtn(false);
               
            } else {
              //  navigate("/user"); 

            }
          }).catch((e) => {
          console.log(e);
          setSubmitBtn(false)
          AlertError("error try again later")

        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        team.logo &&    <img src={team.logo[0].url } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>


      <Inputs label={'Time'} type={'Number'} name={'minutes'} onchange={handleChange} value={data.minutes}  placeholder={'Time'} disabled={false} required={true} />


      <Inputs label={'Extra Time'} type={'Number'} name={'et'} onchange={handleChange} value={data.et}  placeholder={'Extra Time'} disabled={false} required={true} />

          
        <div className={Style.select}  >
            <h2> main</h2>


        <label rel="select" htmlFor="select" > player </label>

          <select id="main" name={"main" } onChange={handleChange} required > 
          { data.team ?  null : <option value={""} > select a player  </option> }


        {playerIn?.map((props) => (

                        
        <option key={props._id} value={props._id} > {props.name?.first + " " + props.name?.last}  </option> )) 

}
    
    


          </select>

        </div>
    




        <button className="submit" type="submit"  disabled={submitbtn}> Submit</button> 

        </form>

    </div>

    )
}






const AddMatchRed = ({ competition, match, matchId, matchday }) => {
  const [data, setInputs] = useState({})
  const [submitbtn, setSubmitBtn] = useState(false)
  const [team, setTeam] = useState({})   


  const [playerIn, setPlayerIn] = useState([]) 
  const [playerOut, setPlayerOut] = useState([]) 


  const [sub, setSub] = useState("") 


  let navigate = useNavigate()



        
  


    useEffect(() => {

            fetch(process.env.REACT_APP_API_LINK + "getaccess/user/team/",  {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'}, 
        })
            .then((res) =>  res.json())
            .then((data) => setTeam(data.data));



            


      }, []);
        

    const h1 = "Match Goal" ;  

    
     const player = match.match?.lineup
     const userT = match.match 
     const substitute = match.match?.timeline 


     useEffect(() => {
      if (userT && substitute) {


        const playersIn = []
        const playersOut = []
      
      if (substitute ) {
        
        for (let i = 0; i < substitute?.length; i++) {
          const element = substitute[i];
      
          if (substitute[i].action == "substitution") {
      
            if (userT) {
              if (substitute[i].team == "home") {
      
                playersIn.push(substitute[i].player.main._id)
                playersOut.push(substitute[i].player.assist._id)
      
             } else if (substitute[i].team == "away") {
              
              playersIn.push(substitute[i].player.main._id)
              playersOut.push(substitute[i].player.assist._id)
      
             } 
            }
      
          }
          
        }
      

      
        if (userT.home._id == team._id) {

          const newArray1 =  player?.starting?.home?.filter(item => !playersOut.includes(item._id)); 
          
          if (playersIn.length == 0) {
            setPlayerIn( newArray1)

          } else {
            const newArray2 = player?.sub?.home?.filter(item => playersIn.includes(item._id));       
          
      
             const allP = [...newArray1, ...newArray2]
      
              setPlayerIn( allP)
          }


       } else if (userT.away._id == team._id) {

        const newArray1 =  player?.starting?.away?.filter(item => !playersOut.includes(item._id));     

        if (playersIn.length == 0) {
          setPlayerIn( newArray1)

        } else {
          const newArray2 = player?.sub?.away?.filter(item => playersIn.includes(item._id));       
        
    
           const allP = [...newArray1, ...newArray2]
    
            setPlayerIn( allP)
        }
    

       } 
      }  


      }
}, [team]);

   
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
         setInputs(values => ({...values, [name]: value}))
 
       }
    
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      

  
       formData.append('data',  JSON.stringify(data));
       formData.append('action',  JSON.stringify("red"));
       formData.append('matchday',  JSON.stringify(matchday));



    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + "admin/update/" +  competition.name + "/fixture/" + matchId ,{ //fetchs.link, {
        method: "PATCH", // fetchs.method,
        credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {           

           if (res.status == 200) {

         

          
                navigate("./../.."); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               setSubmitBtn(false);
               
            } else {
              //  navigate("/user"); 

            }
          }).catch((e) => {
          console.log(e);
          setSubmitBtn(false)
          AlertError("error try again later")

        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        team.logo &&    <img src={team.logo[0].url } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>


      <Inputs label={'Time'} type={'Number'} name={'minutes'} onchange={handleChange} value={data.minutes}  placeholder={'Time'} disabled={false} required={true} />


      <Inputs label={'Extra Time'} type={'Number'} name={'et'} onchange={handleChange} value={data.et}  placeholder={'Extra Time'} disabled={false} required={true} />

          
        <div className={Style.select}  >
            <h2> main</h2>


        <label rel="select" htmlFor="select" > player </label>

          <select id="main" name={"main" } onChange={handleChange} required > 
          { data.team ?  null : <option value={""} > select a player  </option> }


        {playerIn?.map((props) => (

                        
        <option key={props._id} value={props._id} > {props.name?.first + " " + props.name?.last}  </option> )) 

}
    
    


          </select>

        </div>
    





        <button className="submit" type="submit"  disabled={submitbtn}> Submit</button> 

        </form>

    </div>

    )
}



const AddMatchEnd = ({ competition, match, matchId, matchday }) => {
  const [data, setInputs] = useState({})
  const [submitbtn, setSubmitBtn] = useState(false)
  const [team, setTeam] = useState({}) 




  let navigate = useNavigate()


    useEffect(() => {

            fetch(process.env.REACT_APP_API_LINK + "getaccess/user/team/",  {
                method: 'GET',
                credentials: "include",
                headers: {'Content-Type': 'application/json'}, 
        })
            .then((res) =>  res.json())
            .then((data) => setTeam(data.data));
      }, []);


  

    const h1 = "End Match" ;  

    








       const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
         setInputs(values => ({...values, [name]: value}))
 
       }
    
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      

  
       formData.append('data',  JSON.stringify(data));
       formData.append('action',  JSON.stringify("end"));
       formData.append('matchday',  JSON.stringify(matchday));



    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + "admin/update/" +  competition.name + "/fixture/" + matchId ,{ //fetchs.link, {
        method: "PATCH", // fetchs.method,
        credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {           

           if (res.status == 200) {

         

          
            //    navigate("./../../../../../result/" + matchday + "/" + matchId); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               setSubmitBtn(false);
               
            } else {
              //  navigate("/user"); 

            }
          }).catch((e) => {
          console.log(e);
          setSubmitBtn(false)
          AlertError("error try again later")

        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        team.logo &&    <img src={team.logo[0].url } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

          


        <button className="submit" type="submit"  disabled={submitbtn}> End Match</button> 

        </form>

    </div>

    )
}


export { AddMatchEnd, AddMatchLineup, AddMatchExtraTime, AddMatchStart, AddMatchGoal, AddMatchSub, AddMatchRed, AddMatchYellow }