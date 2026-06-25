import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/admin/Team.module.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { AlertError, Inputs } from "./list/Generallist";




const AdminBanner = ({ event, typeId }) => {
  const [data, setInputs] = useState({})
  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()
        



        useEffect(() => {
          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/banner/" + typeId)
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              head:data.head,
              body: data.body,
              img: data.imgUrl?.url, 
              
              
            })
          ); 

          }       

        if (event.add ) {
      setFetch({link: 'admin/add/banner/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/banner/' + typeId, method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Banner" : (event.edit) ? "Edit Banner" : "please try again later" ;  
    
    
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }
    
      const handleFileChange = (event) => {
        setFile(event.target.files)
      };



    


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

{        data.img &&    <img src={data.img } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'head'} type={'text'} name={'head'} onchange={handleChange} value={data.head}  placeholder={'headline'} disabled={false} required={true}  />
        <Inputs label={'picture'} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />







        
       <div className={Style.textarea} >


        <label rel="textarea" htmlFor="textarea" >article</label>

        <textarea value={data.body} onChange={handleChange} name="body" placeholder="type your article here"  rows={7}> </textarea>


        </div>



        <button className="submit" type="submit"  disabled={submitbtn}> Submit</button> 

        </form>

    </div>

    )
}


const AdminCodeOfConduct = ({ event, typeId }) => {
  const [data, setInputs] = useState({})
  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()
        



        useEffect(() => {
          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/code-of-conduct/" + typeId)
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              title:data.title,
              body: data.body,
             
              
            })
          ); 

          }       

        if (event.add ) {
      setFetch({link: 'admin/add/code-of-conduct/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/code-of-conduct/' + typeId, method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Code Of Conduct" : (event.edit) ? "Edit Code Of Conduct" : "please try again later" ;  
    
    
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

        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'title'} type={'text'} name={'title'} onchange={handleChange} value={data.title}  placeholder={'title'} disabled={false} required={true}  />

        
       <div className={Style.textarea} >


        <label rel="textarea" htmlFor="textarea" >article</label>

        <textarea value={data.body} onChange={handleChange} name="body" placeholder="type your article here"  rows={7}> </textarea>


        </div>



        <button className="submit" type="submit"  disabled={submitbtn}> Submit</button> 

        </form>

    </div>

    )
}


const AdminNews = ({event, typeId }) => {
  const [data, setInputs] = useState({})
  const [region, settRegion] = useState([])


  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()





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
        

       <div className={Style.select} >


        <label rel="select" htmlFor="select" >region</label>

          <select id="region" name={"region"} onChange={handleChange} title="region" Value={data.region} > 
          { data.region ? null : <option value={""} > select a region  </option> }


          {region.map((props) => (

                        
        <option key={props._id} name={"region"} value={props.name} > {props.name}  </option>
 


                )   )   }
    


          </select>

        </div>


        <Inputs label={'picture'} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={data.img ? false : true}  />





       <div className={Style.textarea} >


        <label rel="textarea" htmlFor="textarea" >article</label>

        <textarea value={data.body} onChange={handleChange} name="body" placeholder="type your article here"  rows={7}> </textarea>


        </div>



        {/* <div className={Style.select} >


        <label >positions</label>

          <select id="position" name={"position"} onChange={handleChange} title="positions" >

              <option name={"position"} value={"foward"} > foward  </option>
              <option name={"position"} value={"midfielder"} > midfielder  </option>
              <option name={"position"} value={"defender"} > defender  </option>
              <option name={"position"} value={"goalkeeper"} > goalkeeper  </option>

          </select>

        </div> */}

        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 

        
        </form>







    </div>

    )
}





const AdminCategory = ({event, typeId }) => {
  const [data, setInputs] = useState({})
  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})

  let navigate = useNavigate()


        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/category/" + typeId)
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              name:data.name, img: data?.imgUrl?.url,
            
            })
          );
          }    
          
          console.log(data, typeId);
          

        if (event.add ) {
      setFetch({link: 'admin/add/category/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/category/' + typeId, method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Category" : (event.edit) ? "Edit Category" : "please try again later" ;  
    
    
      const handleChange = (event) => {
        const name = event.target.name;     
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }
    
      const handleFileChange = (event) => {
        setFile(event.target.files)
      };


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

           
            if (data.success == false) {
               AlertError(data.message)
                setSubmitBtn(false);


               console.log(data.message);
               
            } else {
                            // navigate("admin"); 

            }
          })


        
        .catch((e) => {
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

{        data.img &&    <img src={data.img } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'name'} type={'text'} name={'name'} onchange={handleChange} value={data.name}  placeholder={'name'} disabled={false} required={true}  />
        


        <Inputs label={'logo'} type={'file'} name={'logo'} onchange={handleFileChange} value={data.logo}  placeholder={'first name'} disabled={false}  />


        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 



        </form>







    </div>

    )
}



const AdminSubRegion = ({event, typeId }) => {
  const [data, setInputs] = useState({})
  const [region, settRegion] = useState([])


  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()


          useEffect(() => {
          fetch(process.env.REACT_APP_API_LINK  + "getall/competition/" )
          .then((res) =>  res.json())
          .then((data) =>  settRegion(data.data))
        

      }, []);






        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/sub-competition/" + typeId.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              name:data.name,
              region: data.regionId,
              bio: data.bio,
              img: data?.pictures[0]?.url
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/sub-competition/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/sub-competition/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Sub Region" : (event.edit) ? "Edit Sub Region" : "please try again later" ;  
    
    
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


          let msg = "fail"
        })


        
    
    
     
      
      }


      console.log(data.type);


    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'name'} type={'text'} name={'name'} onchange={handleChange} value={data.name}  placeholder={'name'} disabled={false} required={true}  />
        


           <div className={Style.select} >


        <label rel="select" htmlFor="select" >region</label>

          <select id="region" name={"region"} onChange={handleChange} title="region" value={data.region} required > 
          { data.region ?  null : <option value={""} > select a region  </option> }


          {region.map((props) => (

                        
        <option key={props._id} name={"region"} value={props.name} > {props.name}  </option>
 


                )   )   }
    


          </select>

        </div>









        <Inputs label={'logo'} type={'file'} name={'logo'} onchange={handleFileChange} value={data.logo}  placeholder={'first name'} disabled={false}  />



       <div className={Style.textarea} >


        <label rel="textarea" htmlFor="textarea" >bio</label>

        <textarea value={data.bio} onChange={handleChange} name="bio" placeholder="biography of the area"  rows={7}> </textarea>


        </div>

        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 

        </form>







    </div>

    )
}



const AdminAddTeamToRegion = ({event, regionId, typeId }) => {
  const [data, setInputs] = useState({})
  const [team, setTeam] = useState([])


  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: "", get: ""})



  let navigate = useNavigate()


    useEffect(() => {
     

      if (event.add ) {
        setFetch({link: 'admin/add/add-team-to-competition/', method: 'POST',  })
        fetch(process.env.REACT_APP_API_LINK  + 'getall/teams/'  )
        .then((res) =>  res.json())
        .then((data) =>  setTeam(data.data))

    } else if (event.delete) {
      setFetch({link: 'admin/delete/add-team-to-competition/', method: 'PATCH',  })

      fetch(process.env.REACT_APP_API_LINK  + 'getall/teams/' + regionId  )
      .then((res) =>  res.json())
      .then((data) =>  setTeam(data.data))

    }
        fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + regionId)
        .then((res) =>  res.json())
        .then((data) =>  setInputs({
          name:data.name,
          competitionId: data.name,
          img: data?.logo[0]?.url
          
          
        })
      );




      }, []);

      // fetch(process.env.REACT_APP_API_LINK  + fetchs.get )
      // .then((res) =>  res.json())
      // .then((data) =>  setTeam(data.data))
      
      
  

        



    const h1 = (event.add) ? "Add Team to Region" : (event.delete) ? "Delete Team in Region" : "please try again later" ;  
    
    
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }




          console.log(data, );
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    

    
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


          let msg = "fail"
        })


        
    
    
     
      
      }


      console.log(data.type);


    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'region Id'} type={'text'} name={'competitionId'} value={data.competitionId} disabled={true} required={true}  />
        


           <div className={Style.select} >


        <label rel="select" htmlFor="select" >team</label>

          <select id="team" name={"team"} onChange={handleChange} title="team" value={data.team} required > 
          { data.team ?  null : <option value={""} > select a team  </option> }


          {team.map((props) => (

                        
        <option key={props._id} name={"team"} value={props.name} > {props.name}  </option>
 


                )   )   }
    


          </select>

        </div>

        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 

        </form>







    </div>

    )
}


const AdminProduct = ({event, regionId, typeId,  }) => {


  const [color, setColor] = useState([{color: ''}]);
  // Initialize the sub-form tracking structure with one empty entry
  const [size, setSize] = useState([{ size: '', price: '' }]);
  const [specs, setSpec] = useState([{ label: '', value: '' }]);

  const [data, setInputs] = useState({})
  const [category, setCategory] = useState([])
  const [img, setFile] = useState([]);
  const [submitbtn, setSubmitBtn] = useState(false)
  const [fetchs, setFetch] = useState({link: "", method: ""})
  
  // Handle value modifications for specific indices within the array
  const handleSizeChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...size];
    updated[index][name] = value;
    setSize(updated);
  };


    const handleColorChange = (index, event) => {

      const { value, name } = event.target;
    const updated = [...color];
    updated[index][name] = value;
    console.log(event.target, index,  updated, value, updated[index]) ;
    


    setColor(updated);


            // setColor(values => ([  value]))

  };
  

    const handleSpecChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...specs];
    updated[index][name] = value;
    setSpec(updated);
  };


  // Append a brand new object element to the array state
  const addSizeField = () => {
    setSize([...size, { size: '', price: '' }]);
  };

  // Evict an object element by target index
  const removeSizeField = (index) => {
    const updatedSkills = size.filter((_, i) => i !== index);
    setSize(updatedSkills);
  };


    const addSpecField = () => {
    setSize([...specs, { label: '', value: '' }]);
  };

  // Evict an object element by target index
  const removeSpecField = (index) => {
    const updatedSkills = specs.filter((_, i) => i !== index);
    setSize(updatedSkills);
  };



    const addColor = () => {
    setColor([...color, {color: ''} ]);
  };

  // Evict an object element by target index
  const removeColor = (index) => {
    const updatedSkills = color.filter((_, i) => i !== index);
    setColor(updatedSkills);
  };













  let navigate = useNavigate()


          useEffect(() => {

            fetch(process.env.REACT_APP_API_LINK  + "getall/category/" )
            .then((res) =>  res.json())
            .then((data) =>  setCategory(data.data)
          );
          



  
          }, []);

function editinput(data) {
  setSize(data.size)


             setInputs({

              name: data.name ,
              type: data.type,
              description: data.description ,
              gender: data.gender ,
              age: data.age ,
              categoryId: data.categoryId[0],
              available: data.available,

              
           }) 


            //  setColor(data.color)

                   //   setColor(data.color.map(value => (console.log({ color: value })   )));
                      setColor(data.color.map(value => ({color: value}   )));

                      setSize(data.size.map(value => ({size: value.size, price: value.price}   )));

                      setSpec(data.specs.map(value => ({label: value.label, value: value.value }   )));




    //             data.color.forEach(e => { //  { color: value }
    //       setColor([ {color: e}] );
    //       // console.log(e, color);

          

    // });

            console.log(data.color, 333, color, data.size, data.img);
            
}

            console.log(data.color, 333, color, data.size, data.img);


        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK + "getone/cloth/" + typeId   )
            .then((res) =>  res.json())
            .then((data) => editinput(data)
          // setSize([data.size]),
          //    setInputs({

          //     name: data.name ,
          //     type: data.type,
          //     description: data.description ,
          //     gender: data.gender ,
          //     age: data.age ,
          //     category: data.categoryId,

              
          //  }) , setColor([data.color]) ,  
           

         

          );
          }   
          
          

        if (event.add ) {
      setFetch({link: 'admin/add/cloth/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/cloth/' + typeId?.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        


      console.log(color, size);
      


    const h1 = (event.add) ? "Add Cloth " : (event.edit) ? "Edit Cloth" : "please try again later" ;  
    
    
          const handleFileChange = (e) => {
            const files = Array.from(e.target.files);
            setFile(files);      
          };

      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }
    



          console.log(data );
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    
                Array.from(img).forEach(imgs => {
    
          formData.append('img', imgs);
    
      });

      //                 Array.from(color).forEach(p => {
    
      //     formData.append('color', p);
    
      // });
    
        formData.append('data',  JSON.stringify(data));
        formData.append('color',  JSON.stringify(color));
        formData.append('size',  JSON.stringify(size));
        // formData.append('data',  JSON.stringify(data));

    
    
    
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

           
            if (data.success == false) {
               AlertError(data.message)
                setSubmitBtn(false)


               console.log(data.message);
               
            } else {
                            // navigate("admin"); 

            }
          })


        
        .catch((e) => {
          console.log(e);
          setSubmitBtn(false)
          AlertError("error try again later")


          let msg = "fail"
        })


        
    
    
     
      
      }


      console.log(data.type);


    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>



      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>




        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'Name'} type={'text'} name={'name'} onchange={handleChange} value={data.name}  placeholder={'name of item '} disabled={false} required={true}  />
        
        <div className={Style.picture} > 
          <h3 > Picture</h3>
                  <input type="file"  multiple accept="image/*" onChange={handleFileChange}  />
        
        {/* List names of selected files as a preview */}
        <ul>
          {img?.map((file, index) => (
            <li key={index}>{file?.name}</li>
          ))}
        </ul>

        </div>


          <div className={Style.description} > 
           <h3 > Description</h3>

            <textarea name={'description'} required value={data.description} onChange={handleChange} > </textarea>


        </div>

       <div className={Style.select} >


        <label rel="select" htmlFor="select" > Gender </label>

          <select id="type" name={"gender"} onChange={handleChange} title="gender" value={data.gender} required > 
          { data.type ?  null : <option value={""} > select type  </option> }


              <option value={"male"} > male  </option>
              <option value={"female"} > female </option> 
              <option value={"all"} > all  </option>


          </select>

        </div>


               <div className={Style.select} >


        <label rel="select" htmlFor="select" > Age </label>

          <select id="type" name={"age"} onChange={handleChange} title="type" value={data.age} required > 
          { data.type ?  null : <option value={""} > select age group  </option> }


              <option value={"adult"} > adult  </option>
              <option value={"minor"} > minor </option> 
          </select>

        </div>



               <div className={Style.select} >


        <label rel="select" htmlFor="select" > Type </label>

          <select id="type" name={"type"} onChange={handleChange} title="type" value={data.type} required > 
          { data.type ?  null : <option value={""} > select type  </option> }


              <option value={"top"} > top  </option>
              <option value={"bottom"} > bottom </option> 
              <option value={"accesory"} > accesory  </option>

          </select>

        </div>


          <div className={Style.select} >


        <label rel="select" htmlFor="select" > category </label>

          <select id="category" name={"categoryId"} onChange={handleChange} title="category" value={data.category} required > 
          { data.categoryId ?  null : <option value={""} > select category  </option> }

          {category.map((props) => (

                        
          <option key={props._id} value={props.name} > {props.name}  </option>

                )   )   }

          </select>

        </div>

          <div className={Style.size} >
                      <h3>Size</h3>
        {size?.map((skill, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>

              <Inputs label={'size'} type={'text'} name={'size'} onchange={(e) => handleSizeChange(index, e)} value={size[index].size}  placeholder={'size available '} disabled={false} required={true}  />
              <Inputs label={'price'} type={'number'} name={'price'} onchange={(e) => handleSizeChange(index, e)} value={size[index].price}  placeholder={'price '} disabled={false} required={true}  />

            {size.length > 1 && (
              <button type="button" onClick={() => removeSizeField(index)} style={{ marginTop: '5px', color: 'red' }}>
                Remove size
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addSizeField} style={{ marginRight: '10px' }}>
          + Add Another size
        </button>
            </div>


          <div className={Style.specs} >
                      <h3>specs</h3>
        {specs?.map((skill, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>

              <Inputs label={'label'} type={'text'} name={'label'} onchange={(e) => handleSpecChange(index, e)} value={specs[index].label}  placeholder={'label for spec '} disabled={false} required={true}  />
              <Inputs label={'value'} type={'text'} name={'value'} onchange={(e) => handleSpecChange(index, e)} value={specs[index].value}  placeholder={'value for the spec '} disabled={false} required={true}  />

            {size.length > 1 && (
              <button type="button" onClick={() => removeSpecField(index)} style={{ marginTop: '5px', color: 'red' }}>
                Remove size
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addSpecField} style={{ marginRight: '10px' }}>
          + Add Another spec
        </button>
            </div>


          <div className={Style.color} >
              <h3>Color</h3>
        {color?.map((skill, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>

              <Inputs key={index} label={'color'} type={'text'} name={'color'} onchange={(e) => handleColorChange(index, e)} value={color[index].color}  placeholder={'color available '} disabled={false} required={true}  />

            <label>Experience: </label>
              {/* <input
                type="text"
                key={index}
                name="color"
                value={color}
                onChange={(e) => handleColorChange(index, e)}
                required
              /> */}
            {color.length > 1 && (
              <button type="button" onClick={() => removeColor(index)} style={{ marginTop: '5px', color: 'red' }}>
                Remove color
              </button>
            )}
          </div>
        ))}




        <button type="button" onClick={addColor} style={{ marginRight: '10px' }}>
          + Add Another color
        </button>
            </div>


      
            <Inputs label={'Available '} type={'text'} name={'available '} onchange={handleChange} value={data.available}  placeholder={'number of item available '} disabled={false} required={true}  />



        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 



        </form>







    </div>

    )
}




const AdminTeam = ({event, typeId }) => {
  const [data, setInputs] = useState({})
  const [region, settRegion] = useState([])


  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()





        useEffect(() => {
          fetch(process.env.REACT_APP_API_LINK  + "getall/competition/" )
          .then((res) =>  res.json())
          .then((data) =>  settRegion(data.data))
        

      }, []);



        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + typeId?.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              name:data.name,
              regionId: data?.regionId[0], 
              img: data?.logo[0]?.url
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/team/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/team/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Team" : (event.edit) ? "Edit Team" : "please try again later" ;  
    
    
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

        <Inputs label={'name'} type={'text'} name={'name'} onchange={handleChange} value={data.name}  placeholder={'name'} disabled={false} required={true}  />
        

       <div className={Style.select} >


        <label rel="select" htmlFor="select" >region</label>

          <select id="region" name={"regionId"} onChange={handleChange} title="region" Value={data.regionId} > 
          { data.region ? null : <option value={""} > select a region  </option> }


          {region.map((props) => (

                        
        <option key={props._id} name={"region"} value={props.name} > {props.name}  </option>
 


                )   )   }
    


          </select>

        </div>


        <Inputs label={'picture'} type={'file'} name={'logo'} onchange={handleFileChange} value={data.logo}  placeholder={'logo'} disabled={false} required={data.img ? false  : true}  />


        

        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 

        
        </form>







    </div>

    )
}











const AdminAddUserToTeam = ({event, regionId, typeId }) => {
  const [data, setInputs] = useState({})
  const [user, setUser] = useState([])


  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: "", get: ""})



  let navigate = useNavigate()


    useEffect(() => {
     

      if (event.add ) {
        setFetch({link: 'admin/add/add-user-to-team/', method: 'POST',  })
        fetch(process.env.REACT_APP_API_LINK  + 'getall/user/', {
          method: "GET",
          credentials: "include",
          headers: {'Content-Type': 'application/json'},
        }  )
        .then((res) =>  res.json())
        .then((data) =>  setUser(data.data))

    } else if (event.delete) {
      setFetch({link: 'admin/delete/add-user-to-team/', method: 'PATCH',  })

      fetch(process.env.REACT_APP_API_LINK  + 'getall/user/team/' + regionId, {
        method: "GET",
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) =>  res.json())
      .then((data) =>  setUser(data.data))

    }
        fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + regionId)
        .then((res) =>  res.json())
        .then((data) =>  setInputs({
          name:data.name,
          teamId: data.name,
          img: data?.logo[0]?.url
          
          
        })
      );




      }, []);




    const h1 = (event.add) ? "Add User to Team" : (event.delete) ? "Delete User At Of Team" : "please try again later" ;  
    
    
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }




          console.log(data, );
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    

    
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

        <Inputs label={'team Id'} type={'text'} name={'teamId'} value={data.teamId} disabled={true} required={true}  />
        


           <div className={Style.select} >


        <label rel="select" htmlFor="select" >user</label>

          <select id="user" name={"user"} onChange={handleChange} title="user" value={data.user} required > 
          { data.user ?  null : <option value={""} > select a user  </option> }


          {user.map((props) => (

                        
        <option key={props._id} value={props._id} > {props.name.first + ' ' + props.name.last}  </option>
 


                )   )   }
    


          </select>

        </div>

        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 

        </form>







    </div>

    )
}





const AdminAddAdmin = ({event, regionId, typeId }) => {
  const [data, setInputs] = useState({})
  const [submitbtn, setSubmitBtn] = useState(false)
  const [fetchs, setFetch] = useState({link: "", method: "", get: ""})
  let navigate = useNavigate()


    useEffect(() => {

      if (event.add ) {
        setFetch({link: 'admin/add/add-user-to-admin/', method: 'POST',  })

    } else if (event.delete) {
        setFetch({link: 'admin/delete/add-user-to-admin/', method: 'PATCH',  })

    }
        fetch(process.env.REACT_APP_API_LINK  + "getone/user/" + regionId, {
          method: "GET",
          credentials: "include",
          headers: {'Content-Type': 'application/json'},
        }  )
        .then((res) =>  res.json())
        .then((data) =>  setInputs({
          name:data.name?.first + ' ' + data.name?.last,
          _id: data._id,
          img: data?.imgUrl?.url
          
          
        })
      );




      }, []);




    const h1 = (event.add) ? "Add User to Team" : (event.delete) ? "Delete User At Of Team" : "please try again later" ;  
    const submit = (event.add) ? "Add to admin" : (event.delete) ? "Delete from admin" : "please try again later" ;  





          console.log(data, );
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    

    
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

        <Inputs label={'name'} type={'text'} name={'name'} value={data.name} disabled={true} required={true}  />
        
        <button className="submit" type="submit" disabled={submitbtn}> {submit}</button> 

        </form>







    </div>

    )
}

export {AdminTeam, AdminCodeOfConduct, AdminNews, AdminBanner, AdminCategory, AdminSubRegion, AdminAddTeamToRegion, AdminProduct, AdminAddAdmin, AdminAddUserToTeam}