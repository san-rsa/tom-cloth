// import "../styles/style.css";
import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { CatList, ProductCard } from "./list/Generallist";
import Style from "../../styles/Home.module.css"



 const filter = [
  {
    name: "top",
    image: () => require("../../img//web/top.jpg")
     // "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    name: "bottom",
    image:() => require("../../img//web/bottom.jpg")
     // "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
  },
  {
    name: "accessory",
    image:  () => require("../../img//web/accessories.jpg"),
     // ,
 //"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  },

];

 const gender = [

  {   
    name: "male",
    image: () => require("../../img//web/men.jpg"),
     // "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    name: "female",
    image:  () => require("../../img//web/women.jpg"),
      // "https://images.unsp () => require("../../i require("../../img//web/accessories.jpg"),mg//web/accessories.jpg"),lash.com/photo-1483985988355-763728e1935b",
  },
  {
    name: "unisex",
    image:  () => require("../../img//web/uni.jpg"),
      // "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
];

const Category = () => {



 

   const [cat, setcat] = useState([])


    console.log( process.env.REACT_APP_API_LINK)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/category")
        .then((res) =>  res.json())
        .then((data) => setcat(data.data));
    }, []);





    return (
    <div className={Style.categories}>  
       <h1>CATEGORY</h1>

    <div className={Style["category-grid"]}>

    {filter.map((project) => (

        <div className='' key={project._id}> 

        <CatList
            name={project.name}
            img={project?.image()}
            link={"/category/" + project.name}

            />    
            </div>


        )   )   }
 

 </div>
         {/* <Link to={"/category"}> <button className={'more'} >SHOW ALL</button></Link> */}


   </div>

  )}



  const Categorygender = () => {



 

   const [cat, setcat] = useState([])


    console.log( process.env.REACT_APP_API_LINK)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/category")
        .then((res) =>  res.json())
        .then((data) => setcat(data.data));
    }, []);





    return (
    <div className={Style.categories}>  
       <h1>GENDER</h1>

    <div className={Style["category-grid"]}>

    {gender.map((project) => (

        <div className='' key={project._id}> 

        <CatList
            name={project.name}
            img={project?.image()}
            link={"/category/" + project.name}

            />    
            </div>


        )   )   }
 

 </div>
         {/* <Link to={"/category"}> <button className={'more'} >SHOW ALL</button></Link> */}


   </div>

  )}

// function Hero() {
//   return (
//     <section className={Style.hero}>
//       <div className={Style["hero-content"]}>
//         <h1>New Season Collection</h1>
//         <p>Discover trendy and stylish clothing for every occasion.</p>
//         <button>Shop Now</button>
//       </div>
//     </section>
//   );
// }


function Hero() {
  return (
    <section className={Style.hero}>
      <div className={Style["hero-text"]}>
        <span>FASHION NAME</span>

        <h1>
          Style That
          <br />
          Defines You
        </h1>

        <p>
          Discover premium fashion designed for everyday elegance.
        </p>

        <button><Link to={"/category"}> Explore Collection</Link> </button>

      </div>

      {/* <div className={Style["hero-image"]}>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
        //   alt="fashion"
        />
      </div> */}
    </section>
  );
}



// function ProductCard({ product }) {
//   return (
//     <div className="product-card">
//       <img src={product.image} alt={product.name} />

//       <h3>{product.name}</h3>

//       <p>{product.price}</p>

//       <button>Add to Cart</button>
//     </div>
//   );
// }

// function ProductCard2({ product }) {
//   return (
//     <div className="card">
//       <img src={product.image} alt={product.name} />

//       <div className="card-content">
//         <h3>{product.name}</h3>
//         <p>{product.price}</p>
//       </div>
//     </div>
//   );
// }





// function FeaturedProducts() {
//   return (
//     <section className="products">
//       <h2>Featured Products</h2>

//       <div className="product-grid">
//         {products.map((item) => (
//           <ProductCard2
//             key={item.id}
//             product={item}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }




function ProductSection({loggedin}) {

      const [data, setData] = useState([])
  


  
          useEffect(() => {
              fetch(process.env.REACT_APP_API_LINK + "getall/clothes/most-order" )
              .then((res) =>  res.json())
              .then((data) => setData(data.data));
          }, []);


  return (
    <section className={Style.products}>
      <h2>Most Sales</h2>

      <div className={Style["product-grid"]}>
        {data.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            price={product.size[0]?.price}
            image={product.img[0]?.url}
            link={'/product/' + product.name}
            id={product._id}
            color={product?.color[0]}
            size={product.size[0]?._id}
            loggedin={loggedin}
            category={product?.categoryId[0]}
             c={product.size[0]?.size}

          />
        ))}
      </div>
    </section>
  );
}







function Newsletter() {
  return (
    <section className={Style.newsletter}>
      <h2>Subscribe To Our Newsletter</h2>

      <div className={Style["newsletter-form"]}>
        <input
          type="email"
          placeholder="Enter your email"
        />

        <button>Subscribe</button>
      </div>
    </section>
  );
}









export  {Hero, Category, ProductSection, Newsletter,  Categorygender};