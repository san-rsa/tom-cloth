import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Lists.module.css"
import Nav, { SearchNav } from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Footer from "../components/sub component/Footer";
import { CardList2, CatList, ProductCard } from "../components/sub component/list/Generallist";


 const products = [
  {
    id: 1,
    name: "Casual Jacket",
    price: "$79",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 2,
    name: "Summer Shirt",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
  },
  {
    id: 3,
    name: "Classic Hoodie",
    price: "$60",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  },

  {    id: 1,
    name: "Oversized Hoodie",
    price: "$59",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 2,
    name: "Classic Jacket",
    price: "$89",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  },
  {
    id: 3,
    name: "Premium Shirt",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
];


const Competitions = () => {

    const [data, setdata] = useState([])

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/competition")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);



    return (
        <div className={Style.competitions}>
         <Nav />

         <h3 > All Regions </h3>
            <div className={Style.allregions}>


                
            {data?.map((p) => (

            <CardList2 
                        name={p.name}
                        to={"region"}
                        category={"Region"}
                        logo={p.logo[0]?.url}

                    />  


  


            )   )   }






     </div>


        <Footer />
        </div>

    )
}


const Teams = ({}) => {

    const [data, setdata] = useState([])

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);



    return (
        <div className={Style.competitions}>
         <Nav />

         <h3 > All Teams </h3>
            <div className={Style.allregions}>


                
            {data?.map((p) => (

            <CardList2 
                        name={p.name}
                        to={"team"}
                        category={"Region"}
                        logo={p.logo[0]?.url}

                    />  


  


            )   )   }






     </div>


        <Footer />
        </div>

    )
}



const Search = ({}) => {

    const [data, setdata] = useState([])

        
        const title = useParams().id
    
        const link =title.replaceAll('-',' ')


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);



    return (
        <div className={Style.app}>
         <Nav />
         <SearchNav />

         <h3 > Search: {link} </h3>
            <div className={Style.search}>


                
            {products?.map((p) => (

            <ProductCard 
                key={p.id}
                    name={p.name}
                    price={p.price}
                    image={p.image}
                    link={'/product/' + p.name}

                    />  


  


            )   )   }






     </div>


        <Footer />
        </div>

    )
}



const Categories = ({}) => {

    const [data, setdata] = useState([])


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);



    return (
        <div className={Style.app}>
         <Nav />
         <SearchNav />

         <h3 > Category </h3>
            <div className={Style.cat}>


                
            {products?.map((p) => (

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

        
        const title = useParams().id
    
        const link =title.replaceAll('-',' ')


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);



    return (
        <div className={Style.app}>
         <Nav />
         <SearchNav />

         <h3 > Category: {link} </h3>
            <div className={Style.cat}>


                
            {products?.map((p) => (

            <ProductCard 
                key={p.id}
                    name={p.name}
                    price={p.price}
                    image={p.image}
                    link={'/product/' + p.name}

                    />  


  


            )   )   }






     </div>


        <Footer />
        </div>

    )
}


export {Competitions, Categories, Category, Teams, Search }