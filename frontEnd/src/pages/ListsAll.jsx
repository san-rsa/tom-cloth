import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Lists.module.css"
import Nav, { SearchNav } from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Footer from "../components/sub component/Footer";
import { CardList2, CatList, NotFoundCard, ProductCard } from "../components/sub component/list/Generallist";





const Search = ({}) => {

    const [data, setdata] = useState([])

        
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state

        
        let title = useParams().id
    
        const link =title.replaceAll('-',' ')

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


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/search/" + title)
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, [title]);



    return (
        <div className={Style.app}>
         <Nav />
         <SearchNav />

         <h3 > Search: {link} </h3>
            <div className={Style.search}>



                
            {   data === 'not found' ? 
                    <NotFoundCard
                    title={'Could not find your search item'}
                    body={''}
                    button={'Not Found'}
                    link={''}
                     /> :
            
            data?.map((product) => (

            <ProductCard 
            key={product._id}
            name={product.name}
            price={product?.size[0]?.price}
            image={product?.img[0]?.url}
            link={'/product/' + product.name}
            id={product._id}
            color={product?.color[0]}
            size={product?.size[0]?._id}
            loggedin={isLoggedIn}
            category={product?.categoryId[0]}
            c={product.size[0]?.size}

                    />  

            )   )   }






     </div>


        <Footer />
        </div>

    )
}



const Categories = ({}) => {

    const [data, setdata] = useState([])


        const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state

        
        const title = useParams().id
    
        const link =title.replaceAll('-',' ')

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


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);



    return (
        <div className={Style.app}>
         <Nav loggedin={isLoggedIn} />
         <SearchNav />

         <h3 > Category </h3>
            <div className={Style.cat}>


                
            {data?.map((p) => (

            <CatList 
                key={p.id}
                    name={p.name}
                    price={p.price}
                    img={p.image}
                    link={'/category/' + p.name}

                    />  


  


            )   )   }






     </div>


        <Footer />
        </div>

    )
}


const Category = ({}) => {

    const [data, setdata] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state

        
        const title = useParams().id
    
        const link =title.replaceAll('-',' ')

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


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/clothes/category/" + title)
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);



    return (
        <div className={Style.app}>
         <Nav loggedin={isLoggedIn} />
         <SearchNav />

         <h3 >  {link} </h3>
            <div className={Style.cat}>
      
            { data === 'not found' ? 
                    <NotFoundCard
                    title={'Could not find items'}
                    body={''}
                    button={'Not Found'}
                    link={''}
                     /> :
            
            
            
            data.length !== 0  ? data?.map((product) => (

            <ProductCard 
            key={product._id}
            name={product.name}
            price={product?.size[0]?.price}
            image={product?.img[0]?.url}
            link={'/product/' + product.name}
            id={product._id}
            color={product?.color[0]}
            size={product?.size[0]?._id}
            loggedin={isLoggedIn}
            category={product?.categoryId[0]}
            c={product.size[0]?.size}

                    />  


  


            )   ) : <p> no clothes available </p>  }






     </div>


        <Footer />
        </div>

    )
}


export {Categories, Category, Search }