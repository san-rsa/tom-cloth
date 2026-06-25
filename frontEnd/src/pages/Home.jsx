import Nav, { SearchNav } from "../components/sub component/Nav";
//import "../styles/style.css"
import Footer from "../components/sub component/Footer";


import {Hero,  ProductSection, Newsletter, Category, Categorygender} from "../components/sub component/Homeview";
// import "../styles/Home.css";
import Style from  "../styles/Home.module.css";
import { ProductCard } from "../components/sub component/list/Generallist";

import Trending from "../components/sub component/Trending";
import { useEffect, useState } from "react";






function App() {


    const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state
  
    // 1. Load initial cart on component mount  isloggedin
  
            useEffect(() => {
  
    
                    fetch(process.env.REACT_APP_API_LINK + 'getone/user/isloggedin', {
                        method: 'GET',
                        credentials: "include",
                        headers: {'Content-Type': 'application/json'},
                         }).then((res) => {
                        if (res.status === 200) {
                            setIsLoggedIn( true)
        
                        } else  if (res.status === 403) {
                            setIsLoggedIn( false)
        
                        } 
             })    
                      
             },   []);
  


  return (
    <div>
      <Nav loggedin={isLoggedIn} />
      <SearchNav />

      <Hero />
            <Trending loggedin={isLoggedIn} />

      <Category />



      <ProductSection loggedin={isLoggedIn} />

      <Categorygender />

      <Newsletter />


      
      <Footer />
    </div>
  );
}



export default App;