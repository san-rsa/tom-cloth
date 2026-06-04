import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/General.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';





const HorizontalScroll = ({ children }) => {
  const scrollRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add('active');
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove('active');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    startX = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      className={Style.scroll_container}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ overflow: 'hidden', cursor: 'grab' }}
    >
      {children}
    </div>
  );
};

const Inputs = ({label, type, name, onchange, value, disabled, placeholder, required  }) => {



  return (
      <div className={Style.formlist} >
      <label >{label}</label>
      <input type={type} disabled={disabled} name={name} onChange={onchange} value={value} id={name} placeholder={placeholder} required={required} />
      </div>

  )
}



const CardList = ({logo, name, category, to}) => {

    const link = name?.replaceAll(' ','-')


    return (
        <Link to={"/" + to + "/" + link} className={Style.a} >

        <div className={Style.main} >

        <div className={Style.logo}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={logo} />

        </div>
                

            
        <div className={Style.name}>

            <h3 > {category} </h3>

            <h2 >  {name}  </h2>
        </div>    
        


        </div>



        </Link>
        

    )
}


const CardList2 = ({logo, name, category, to}) => {

    const link = name.replaceAll(' ','-')


    return (
        <Link to={"/" + to + "/" + link} className={Style.a2} >

        <div className={Style.main2} >

        <div className={Style.logo2}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={logo} />

        </div>
                

            
        <div className={Style.name2}>

            <h3 > {category} </h3>

            <h2 >  {name}  </h2>
        </div>    
        


        </div>



        </Link>
        

    )
}



const CardList3 = ({logo, name, category, to, link,}) => {


    return (
        <Link to={ to + "/" + link  } className={Style.a3} >

        <div className={Style.main3} >

        <div className={Style.logo3}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                {/* <img src={logo} /> */}
                <FontAwesomeIcon icon={logo} />

        </div>
                

            
        <div className={Style.name3}>

            <h3 > {category} </h3>

            <h2 className={Style.cat}> {category} </h2>


            <h2 >  {name}  </h2>
        </div>    
        


        </div>



        </Link>
        

    )
}


const CardList3Edit = ({logo, name, category, to, link, id}) => {


  const idLink =id?.replaceAll('-',' ')



  return (
      <Link to={ to + "/" + link + "/" + idLink } className={Style.a3} >

      <div className={Style.main3} >

      <div className={Style.logo3}>
              {/* <img src={info?.imgUrl} alt=""/> */}
              {/* <img src={logo} /> */}
              <FontAwesomeIcon icon={logo} />

      </div>
              

          
      <div className={Style.name3}>

          <h3 > {category} </h3>

          <h2 className={Style.cat}> {category} </h2>


          <h2 >  {name}  </h2>
      </div>    
      


      </div>



      </Link>
      

  )
}






const CardList4 = ({logo, name, category, link}) => {

  const to = link.replaceAll(' ','-')


  return (
      <Link to={ to } className={Style.a4} >

      <div className={Style.main4} >

      <div className={Style.logo4}>
              {/* <img src={info?.imgUrl} alt=""/> */}
              <img src={logo} />

      </div>
     
              

          
      <div className={Style.name4}>

          <h3 > {category} </h3>

          <h2 >  {name}  </h2>
      </div>    
      


      </div>



      </Link>
      

  )
}





const PlayerBio = ({answer, topic,}) => {

    return (
        <div className={Style.biostat} >

    
            <h1 > {answer} </h1>

            <h3 >  {topic}  </h3>
        


        </div>


        

    )
}




const AlertSuccess = (message) => {


  return (
    toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    })




  
      

  )
}





const AlertError = (message ) => {


  
  return   toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    })
  
  
}





export {CardList, PlayerBio, CardList2, CardList3, CardList3Edit, CardList4, HorizontalScroll, Inputs, AlertError, AlertSuccess }