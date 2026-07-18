import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import Style from "../styles/Description.module.css"
import styles from "../styles/Checkout.module.css"

import Nav, { SearchNav } from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';

import { faBars, faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';



import { ShoppingCart, Heart, BarChart2, Star, Check, HelpCircle } from "lucide-react";
import { AlertError, AlertSuccess, CartCard, NotFoundCard, ProductCard } from "../components/sub component/list/Generallist";
import { Detailbuypanelinfo, Detailimages } from "../components/sub component/Descriptionview";
import Footer from "../components/sub component/Footer";




function ActionRedirectComponent() {


//   const handleAction = () => {
//     // 1. Prevent multiple accidental clicks

//     // 2. Start the 5-second countdown visual
//     intervalRef.current = setInterval(() => {
//       setCountdown((prev) => prev - 1);
//     }, 1000);

//     // 3. Trigger the programmatic redirect after 5000ms
//     timerRef.current = setTimeout(() => {
//       clearInterval(intervalRef.current);
//       navigate('/dashboard', { replace: true }); // replace: true prevents going back to this page via the back button
//     }, 5000);
//   };


}



function SuccessOrder() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(7);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);


  // 4. Cleanup timers if user leaves the page early
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
       // 1. Prevent multiple accidental clicks

    // 2. Start the 5-second countdown visual
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // 3. Trigger the programmatic redirect after 5000ms
    timerRef.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      navigate('/', { replace: true }); // replace: true prevents going back to this page via the back button
    }, 5000);
    
    
  });
  


    return (
      <div className={styles.app}> 
        <Nav />

        <SearchNav />   


        <div className={styles.success}>

        <NotFoundCard 
        title={'Your Order has been successful'}
        button={'Order Successful'}
        body={'redirect in a few seconds ' + countdown}
        link={'/'}
         />

         </div>
        <Footer />

      </div>
    );


}

export default SuccessOrder