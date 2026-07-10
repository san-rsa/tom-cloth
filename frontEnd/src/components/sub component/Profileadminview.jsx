import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/admin/Team.module.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { AlertError, AlertSuccess, Inputs } from "./list/Generallist";


import styles from '../../styles/Order.module.css'; // Import styles as a JS object
import Nav, { SearchNav } from './Nav';
import { CheckoutCard } from './list/Generallist';


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
              name:data.name, img: data?.imgUrl?.url, _id: data._id
            
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

         const HandleDelete = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    

      //                 Array.from(color).forEach(p => {
    
      //     formData.append('color', p);
    
      // });
    
        formData.append('data',  JSON.stringify(data));

        // formData.append('data',  JSON.stringify(data));

    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + 'admin/delete/category/' + data._id, {
        method: 'DELETE',
        credentials: "include",
       headers: {'Content-Type': "application/json", },
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

        {event.edit ? <button className={Style.delete} onClick={HandleDelete} type="delete" disabled={submitbtn}> Delete </button> : null }



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
              _id: data._id,
              img: data.img[0].url

              
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
        formData.append('specs',  JSON.stringify(specs));

    
    
    
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



      const HandleDelete = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    

      //                 Array.from(color).forEach(p => {
    
      //     formData.append('color', p);
    
      // });
    
        formData.append('data',  JSON.stringify(data));

        // formData.append('data',  JSON.stringify(data));

    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + 'admin/delete/cloth/' + data._id, {
        method: 'DELETE',
        credentials: "include",
       headers: {'Content-Type': "application/json", },
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


      
            <Inputs label={'Available'} type={'text'} name={'available'} onchange={handleChange} value={data.available}  placeholder={'number of item available '} disabled={false} required={true}  />



        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 


        {event.edit ? <button className={Style.delete} onClick={HandleDelete} type="delete" disabled={submitbtn}> Delete </button> : null }



        </form>







    </div>

    )
}







// Mock data simulating an API response

function AdminOrder() {

    const [data, setData] = useState()
    
    const [order, setOrder] = useState(false)
    const [submitbtn, setSubmitBtn] = useState(false)

    let link = useParams().id






                 useEffect(() => {
                      
                        
            fetch(process.env.REACT_APP_API_LINK + 'getone/admin/order/' + link, {
                          method: 'GET',
                          credentials: "include",
                          headers: {'Content-Type': 'application/json'},
                        }).then((res) =>  res.json())
                  .then((data) => setData(data ) ); 
                                          
                                 },   [order]);





                               function submitorder(e) {
                                  e.preventDefault()
                      
                      
                                  if (data.Delivered === false) {
                                      fetch(process.env.REACT_APP_API_LINK + "admin/add/order/" + link, {
                                      method: "POST",
                                      credentials: "include",
                                      headers: {
                                        "Content-type": "application/json",
                                      },
                                      body: JSON.stringify({deliver: true }),
                                   }).then((res) => {
                                      if (res.status == 200) {

                                      setOrder(true) 
                                      AlertSuccess('successfully completed to order ')

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
                                            setOrder(false)

                                        }
                                      })

                      
                      
                      
                                  } else if (data.Delivered === true) {
                                      fetch(process.env.REACT_APP_API_LINK + "admin/delete/order/" + link, {
                                          method: "DELETE",
                                          credentials: "include",
                                          headers: {
                                            "Content-type": "application/json",
                                          },
                                          body: JSON.stringify({deliver: false }),
                                       }).then((res) => {
                                      if (res.status == 200) {
                                      setOrder(false)
                                      AlertSuccess('successfully removed order from complete list ')
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
                                              setOrder(true)


                                        }
                                      })

                                  }
                      
                      
                      
                             }




  return (
    <div className={styles.app} >
        <Nav />
        <SearchNav />

        <div className={styles.container}>
      {/* Page Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Order Details</h1>
          <p className={styles.subtitle}>
            Order ID: <span className={styles.boldText}>{link}</span>     {/*  • Placed on {order.date} */}
          </p>
        </div>
        <div className={styles.stat}>
          <p className={`${styles.badge} ${styles.badgeDelivered}` } style={{background: data?.Delivered ? 'green' : 'gray'}} >
            {data?.Delivered ? 'Delivered' : 'Shipment on the way'}
          </p>

          <p className={`${styles.badge_pay} ${styles.badgeDelivered}` } style={{color: data?.paymentStatus == 'completed' ? 'green' : data?.paymentStatus == 'pending' ? 'yellow' : data?.paymentStatus == 'failed' ? 'red' : null}} >
            payment: {data?.paymentStatus }
          </p>          
        </div>
      </header>


      <div className={styles.metaGrid}>
        {/* Shipping Info Card */}
        {data?.userId || data?.guestId ?  <div className={styles.card}>
          <h2 className={styles.cardTitle}>Personal Info </h2>
                    
          <h3 className={styles.addressLine}> {data?.guestId ? 'GUEST' : null } </h3>

          <h3 className={styles.addressLine}> name: {data?.userId ? data.userId?.name.first + ' ' + data.userId?.name.last : data.guestId?.name.first + ' ' + data.guestId?.name.last } </h3>
          <p className={styles.addressLine}> email: {data?.userId ?  data.userId?.email : data.guestId?.email }</p>
          <p className={styles.addressLine}> phone: {data?.userId ?  data.userId?.phone : data.guestId?.phone }</p>


        </div> :         <div className={styles.card}>
          <h2 className={styles.cardTitle}> Personal Info </h2>
          <p className={styles.addressLine}> No Personal Info found </p>
         
        </div> }

        {/* Payment Info Card */}
        {/* <div className={styles.card}>
          <h2 className={styles.cardTitle}>Payment Information</h2>
          <p className={styles.infoText}>{order.paymentMethod}</p>
          <p className={styles.subtext}>Billed & authorized securely</p>
        </div>
       */}
</div>
      {/* Grid Layout for Metadata split */}
      <div className={styles.metaGrid}>
        {/* Shipping Info Card */}
        {data?.address ?         <div className={styles.card}>
          <h2 className={styles.cardTitle}>Shipping Address</h2>
          <p className={styles.addressLine}>{data?.address.street}</p>
          <p className={styles.addressLine}>{data?.address.city}</p>
          <p className={styles.addressLine}>
            {data?.address.county}, {data?.address.zipCode}
          </p>
          <p className={styles.addressLine}>Ireland</p>
        </div> :         <div className={styles.card}>
          <h2 className={styles.cardTitle}>Shipping Address</h2>
          <p className={styles.addressLine}> No address found </p>
         
        </div> }

        {/* Payment Info Card */}
        {/* <div className={styles.card}>
          <h2 className={styles.cardTitle}>Payment Information</h2>
          <p className={styles.infoText}>{order.paymentMethod}</p>
          <p className={styles.subtext}>Billed & authorized securely</p>
        </div>
       */}
</div>
      {/* Items Table Section */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Items Ordered</h2>
        <div className={styles.tableResponsive}>

              {data?.products?.map((item) => (
            <CheckoutCard
                name={item.productId.name}
                image={item.productId?.img[0].url}
                quantity={item.quantity}
                color={item.color}
                c={item.productId.size.find((items => items._id === item.sizeId) )?.size}
                total={item.total}

                 /> 
              ))}
          
        </div>
      </div>

      {/* Financial Summary Section */}
      <div className={styles.summaryWrapper}>
        <div className={styles.summaryCard}>
          {/* <div className={styles.summaryLine}>
            <span>Subtotal</span>
            <span>€{order.subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>Estimated Shipping</span>
            <span>€{order.shipping.toFixed(2)}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>VAT / Tax</span>
            <span>€{order.tax.toFixed(2)}</span>
          </div> */}


          <div className={`${styles.summaryLine} ${styles.totalLine}`}>
            <span>Total</span>
            <span>€{data?.totalCost?.toFixed(2)}</span>
          </div>


          <button onClick={submitorder} className={data?.Delivered ? Style.uncomplete  : Style.complete } > {data?.Delivered ? 'Remove from order completed' : 'Complete Order' }  </button>


        </div>
      </div>
    </div>
    </div>
  );
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

export {AdminNews, AdminOrder, AdminBanner, AdminCategory, AdminProduct, AdminAddAdmin, }