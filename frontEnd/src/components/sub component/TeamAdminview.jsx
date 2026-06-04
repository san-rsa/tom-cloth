import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/admin/Team.module.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { AlertError, Inputs } from "./list/Generallist";




const TeamAdminPlayer = ({teamid, event, typeId }) => {
  const [data, setInputs] = useState({})
  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()




        useEffect(() => {
          if (!typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + teamid)
            .then((res) =>  res.json())
            .then((data) =>  setInputs(values => ({...values, teamid: data.name}))
          );
          }

        }, []);



        useEffect(() => {
          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/player/" + typeId.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              fname:data.name.first,
              lname: data.name.last,
              position: data.position,
              dob: data.dob.slice(0, 10), 
              img: data.picture.url, 
              teamid: data.teamId
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/player/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/player/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Player" : (event.edit) ? "Edit Player" : "please try again later" ;  
    
    
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }
    
      const handleFileChange = (event) => {
        setFile(event.target.files)
      };



          console.log(data, img);
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    
        Array.from(img).forEach(imgs => {
    
          formData.append('img', imgs);
    
      });
    
            formData.append('data',  JSON.stringify(data));
    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + fetchs.link, {
        method: fetchs.method,
        // credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {
           if (res.status == 200) {

            const link =teamid.replaceAll(' ','-')

          
                navigate("/user"); 

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
                            // navigate("admin"); 

            }
          })


        
        .catch((e) => {
          console.log(e);
          setSubmitBtn(false)
            AlertError(e)

          let msg = "fail"
        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
        <Inputs label={'last name'} type={'text'} name={'lname'} onchange={handleChange} value={data.lname}  placeholder={'last name'} disabled={false} required={true}  />
        <Inputs label={'team'} type={'text'} value={data.teamid} disabled={true} required={true}  />

        <Inputs label={'date of birth'} type={'date'} name={'dob'} onchange={handleChange} value={data.dob} disabled={false} required={true}  />
        <Inputs label={'picture'} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />


       <div className={Style.select} >


        <label >positions</label>

          <select id="position" name={"position"} onChange={handleChange} title="position" Value={data.position} >

          { data.position ? null : <option value={""} > select a position  </option> }



              <option name={"position"} value={"foward"} > foward  </option>
              <option name={"position"} value={"midfielder"} > midfielder  </option>
              <option name={"position"} value={"defender"} > defender  </option>
              <option name={"position"} value={"goalkeeper"} > goalkeeper  </option>

          </select>

        </div>




        <Inputs label={'shirt number'} type={'text'} name={'snumber'} onchange={handleChange} value={data.snumber} placeholder={'first name'} disabled={false} required={true}  />
        
        {/* <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
        <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
        <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
         */}






        <button className="submit"  disabled={submitbtn} type="submit"> Submit</button> 
        </form>

    </div>

    )
}





const TeamAdminNews = ({teamid, event, typeId }) => {
  const [data, setInputs] = useState({})
  const [region, settRegion] = useState([])


  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()



          useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + teamid)
            .then((res) =>  res.json())
            .then((data) =>  setInputs(values => ({...values, teamid: data.name}))
          );

        }, []);


        useEffect(() => {
          fetch(process.env.REACT_APP_API_LINK  + "getall/competition/" )
          .then((res) =>  res.json())
          .then((data) =>  settRegion(data.data))
        

      }, []);



        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/news/" + typeId)
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              head:data.head,
              body: data.body,
              team: data.ref_Team[0],
              region: data.ref_Region[0], 
              img: data?.imgUrl[0]?.url
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/news/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/news/' + typeId, method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add News" : (event.edit) ? "Edit News" : "please try again later" ;  
    
    
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }
    
      const handleFileChange = (event) => {
        setFile(event.target.files)
      };



          console.log(data, img);
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    
        Array.from(img).forEach(imgs => {
    
          formData.append('img', imgs);
    
      });
    
            formData.append('data',  JSON.stringify(data));
    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + fetchs.link, {
        method: fetchs.method,
        // credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {
           if (res.status == 200) {
          
                navigate("/user"); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               console.log(data.message);
               
            } else {
                            // navigate("admin"); 

            }
          })


        
        .catch((e) => {
          console.log(e);
          setSubmitBtn(!submitbtn)
          AlertError("error try again later")

        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'head'} type={'text'} name={'head'} onchange={handleChange} value={data.head}  placeholder={'head'} disabled={false} required={true}  />
        

        <Inputs label={'team'} type={'text'} value={teamid} disabled={true} required={true}  />

       <div className={Style.select} >


        <label rel="select" htmlFor="select" >region</label>

          <select id="region" name={"region"} onChange={handleChange} title="region" Value={data.region} > 
          { data.region ? null : <option value={""} > select a region  </option> }


          {region.map((props) => (

                        
        <option key={props._id} name={"region"} value={props.name} > {props.name}  </option>
 


                )   )   }
    


          </select>

        </div>


        <Inputs label={'picture'} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />





       <div className={Style.textarea} >


        <label rel="textarea" htmlFor="textarea" >article</label>

        <textarea value={data.body} onChange={handleChange} name="body" placeholder="type your article here"  rows={7}> </textarea>


        </div>


        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 

        
        </form>

    </div>

    )
}



export {TeamAdminPlayer, TeamAdminNews}