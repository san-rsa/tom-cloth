import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import Style from "../styles/Description.module.css"
import styles from "../styles/Description.module.css"

import Nav, { SearchNav } from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';

import { faBars, faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'



import { ShoppingCart, Heart, BarChart2, Star, Check, HelpCircle } from "lucide-react";
import { ProductCard } from "../components/sub component/list/Generallist";
import { Detailbuypanelinfo, Detailimages } from "../components/sub component/Descriptionview";
import Footer from "../components/sub component/Footer";


// const Description = ({}) => {

//     const [data, setData] = useState({})
//     const [wishlist, setwish] = useState()
//     const [set, setset] = useState('')
//     const [priced, setpriced] = useState(Number())




    
//     let link = useParams().id


//         useEffect(() => {
//             fetch(process.env.REACT_APP_API_LINK  + "getone/news/"+ link)
//             .then((res) =>  res.json())
//             .then((data) => setData(data));
//         }, [link]);

//         // useEffect(() => {
//         //     fetch(process.env.REACT_APP_API_LINK  + "getall/product")
//         //     .then((res) =>  res.json())
//         //     .then((data) => setproduct(data.data));
//         // }, []);
    
 

//     //  useEffect(() => {
//     //     fetch(process.env.REACT_APP_API_LINK  + "getone/wishlist/" + link, {
//     //         credentials: "include",
//     //         headers: { "Content-type": "application/json; charset=UTF-8", },
//     //     }).then((res) =>  res.json())
//     //     .then((data) =>  {
//     //         if (data.data == "true") {
//     //             setwish(faX)
//     //             setset("active")
//     //         } else {
//     //             setwish(faHeart)
//     //             setset("false")
//     //         }
//     //     } );
//     // }, []);
//     //      function wish(e) {
//     //         e.preventDefault()
//     //         const  mood = wishlist.iconName


//     //         if (mood == "heart") {
//     //             fetch(process.env.REACT_APP_API_LINK + "add/wishlist", {
//     //             method: "POST",
//     //             credentials: "include",
//     //             headers: {
//     //               "Content-type": "application/json",
//     //             },
//     //             body: JSON.stringify({productId: data._id }),
//     //          }).then((res) =>  res.json())
//     //          .then( ()=> setwish(faX))



//     //         } else {
//     //             fetch(process.env.REACT_APP_API_LINK + "del/wishlist", {
//     //                 method: "DELETE",
//     //                 credentials: "include",
//     //                 headers: {
//     //                   "Content-type": "application/json",
//     //                 },
//     //                 body: JSON.stringify({productId: data._id }),
//     //              }).then((res) =>  res.json())
//     //              .then( ()=> setwish(faHeart))
//     //         }



//     //    }



//     return (
//         <div>
//          <Nav />
//             <div className={Style.desc}>


                


//             <div className={Style.img}>
//                 {/* <img src={info?.imgUrl} alt=""/> */}
//                 <img src="https://image-service.onefootball.com/transform?w=620&h=348&dpr=2&image=https%3A%2F%2Fwp-images.onefootball.com%2Fwp-content%2Fuploads%2Fsites%2F10%2F2024%2F10%2FFBL-ENG-PR-ARSENAL-SOUTHAMPTON-1728373020-1000x750.jpg"/>

//         </div>

//         <div className={Style.topic}>
//         <h1 > gggggggggggggggggggggg</h1>
//         </div>


//         <div className={Style.details}>
//             {/* <p>{info?.description}.</p> */}
//             <p> gggg hhhh jjjj mmmm jjjjj jjjj jjjjj</p>
//         </div>




//      </div>
//         </div>

//     )
// }

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

const productData = {
  id: "vulcan-tank",
  name: "Vulcan Weightlifting Tank",
  sku: "MT01",
  basePrice: 28.00,
  description: "The Vulcan Weightlifting Tank is engineered for maximum range of motion and breathability. Featuring flatlock seams to minimize chafing and advanced moisture-wicking fabric to keep you cool during heavy training sessions.",
  specs: [
    { label: "Material", value: "85% Polyester / 15% Spandex" },
    { label: "Fit", value: "Athletic Slim Fit" },
    { label: "Care", value: "Machine wash cold, tumble dry low" }
  ],
  colors: [
    { name: "Black", value: "#1a1a1a" },
    { name: "Red", value: "#b32424" },
    { name: "Blue", value: "#2459b3" }
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
    "https://unsplash.com"
  ]
};


// const Description = ({}) => {

//     const [product, setproduct] = useState([])
//     const [info, setinfo] = useState({})
//     const [quan, setquan] = useState(Number(0))
//     const [prc, setprc] = useState(Number())
//     const [price, setprice] = useState(Number())
//     const [weight, setweight] = useState(Number())
//     const [wishlist, setwish] = useState()
//     const [set, setset] = useState('')
//     const [priced, setpriced] = useState(Number())

//     const [selectedImage, setSelectedImage] = useState(productData.images[0]);
//     const [selectedSize, setSelectedSize] = useState("M");
//     const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
//     const [quantity, setQuantity] = useState(1);
//     const [activeTab, setActiveTab] = useState("description");

//     const handleQuantityChange = (type) => {
//         if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
//         if (type === "inc") setQuantity(quantity + 1);
//     };

//     const handleAddToCart = () => {
//         alert(`Added to cart:\n${productData.title}\nSize: ${selectedSize}\nColor: ${selectedColor.name}\nQty: ${quantity}`);
//     };


//         const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state
      
//         // 1. Load initial cart on component mount  isloggedin
      
//                 useEffect(() => {
      
        
//                         fetch(process.env.REACT_APP_API_LINK + 'getone/user/isloggedin', {
//                             method: 'GET',
//                             credentials: "include",
//                             headers: {'Content-Type': 'application/json'},
//                              }).then((res) => {
//                             if (res.status === 200) {
//                                 setIsLoggedIn( true)
            
//                             } else  if (res.status === 403) {
//                                 setIsLoggedIn( false)
            
//                             } 
//                  })    
                          
//                  },   []);
      


    
//     const link = useParams().id

   


//        function wght(event) {
//         event.preventDefault() 
        
//         console.log(priced, weight)
        
//         if (event.target.name == 0) {

//             const weight0 = document.getElementById("weight0")
//             const weight1 = document.getElementById("weight1")
//             const weight2 = document.getElementById("weight2")

//             weight0.classList.add(Style.active)
//             weight1.classList.remove(Style.active)
//             weight2.classList.remove(Style.active)






//             setprc(info.size[0].price )
//             setquan(1)
//             setprice(info.size[0].price )
//             setweight(info.size[0]._id)
//             setpriced(0)



            
//         } else  if (event.target.name == 1) {


//             const weight0 = document.getElementById("weight0")
//             const weight1 = document.getElementById("weight1")
//             const weight2 = document.getElementById("weight2")

//             weight0.classList.remove(Style.active)
//             weight1.classList.add(Style.active)
//             weight2.classList.remove(Style.active)



//             setprc(info.size[1].price )
//             setquan(1)
//             setprice(info.size[1].price )
//             setweight(info.size[1]._id)
//             setpriced(1)








            
//         }        else  if (event.target.name == 2) {

//             const weight0 = document.getElementById("weight0")
//             const weight1 = document.getElementById("weight1")
//             const weight2 = document.getElementById("weight2")


//             weight0.classList.remove(Style.active)
//             weight1.classList.remove(Style.active)
//             weight2.classList.add(Style.active)



//             setprc(info.size[2].price )
//             setquan(1)
//             setprice(info.size[2].price )
//             setweight(info.size[2]._id)
//             setpriced(2)



//         }  

//        }



    
//         useEffect(() => {
//             fetch(process.env.REACT_APP_API_LINK  + "getone/cloth/"+ link)
//             .then((res) =>  res.json())
//             .then((data) => setinfo(data));
//         }, []);

//         useEffect(() => {
//             fetch(process.env.REACT_APP_API_LINK  + "getall/clothes")
//             .then((res) =>  res.json())
//             .then((data) => setproduct(data.data));
//         }, []);
    
 
    
//  function qty(params) {
//         setquan(params.target.value);
//         setprc(Number(params.target.value) * prc )

        
//         if (quan <= 0) {
//             setquan(1)
//            }
//     }


//     function add(p) {
//         p.preventDefault()
//         setquan(prevItems => {
//            let no= Number(prevItems) + 1;
//            let pr = Number(no)*prc;
//            setprice(pr);
//           return no;
//         });
//        }

  

//        async function addToCart(e) {
//         e.preventDefault()
//         try {
//           const response = await fetch(process.env.REACT_APP_API_LINK + "add/cart", {
//             method: "POST",
//             credentials: "include",
//             headers: { "Content-type": "application/json; charset=UTF-8", },
//             body: JSON.stringify({
//               productId: info._id,
//               quantity: quan,
//               weight: weight,
//               price: priced
//             }),

//           }).then((res) =>  {
//             if (res.status === 200) {
//                 toast.success('added to cart', {
//               position: "top-center",
//               autoClose: 2000,
//               hideProgressBar: true,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "dark",
//               transition: Bounce,
//               });
//             } else {
             
//                 toast.error('please try again later ', {
//               position: "top-center",
//               autoClose: 2000,
//               hideProgressBar: true,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "dark",
//               transition: Bounce,
//               });
//             }
//           }
//         )
            
//         } catch (err) {
//           toast.error('please try again later ' + err, {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//             transition: Bounce,
//             });
//           console.log(err);
//         };

//         } 
      

    //  useEffect(() => {
    //     fetch(process.env.REACT_APP_API_LINK  + "getone/wishlist/" + link, {
    //         credentials: "include",
    //         headers: { "Content-type": "application/json; charset=UTF-8", },
    //     }).then((res) =>  res.json())
    //     .then((data) =>  {
    //         if (data.data == "true") {
    //             setwish(faX)
    //             setset("active")
    //         } else {
    //             setwish(faHeart)
    //             setset("false")
    //         }
    //     } );
    // }, []);
    //      function wish(e) {
    //         e.preventDefault()
    //         const  mood = wishlist.iconName


    //         if (mood == "heart") {
    //             fetch(process.env.REACT_APP_API_LINK + "add/wishlist", {
    //             method: "POST",
    //             credentials: "include",
    //             headers: {
    //               "Content-type": "application/json",
    //             },
    //             body: JSON.stringify({productId: info._id }),
    //          }).then((res) =>  res.json())
    //          .then( ()=> setwish(faX))



    //         } else {
    //             fetch(process.env.REACT_APP_API_LINK + "del/wishlist", {
    //                 method: "DELETE",
    //                 credentials: "include",
    //                 headers: {
    //                   "Content-type": "application/json",
    //                 },
    //                 body: JSON.stringify({productId: info._id }),
    //              }).then((res) =>  res.json())
    //              .then( ()=> setwish(faHeart))
    //         }



    //    }

    // //    useEffect(() => {
    // //     fetch(process.env.REACT_APP_API_LINK  + "getone/wishlist/"+ link, {
    // //         credentials: "include"}
    // //     )
    // //     .then((res) =>  res.json())
    // //     .then((data) => setinfo(data));
    // // }, []);






//        function minus(p) {
//         p.preventDefault()
//         setquan(prevItems => {
//            let no= Number(prevItems) - 1;
//            let pr = Number(no) * prc;
//            setprice(pr);

//            if (prevItems <= 1) {
//             setquan(1)
//            }



//           return no;
//         });
//        }

//     return (
//         <div>
//                <Nav loggedin={isLoggedIn} />
//                <SearchNav />


//             <div className={Style.desc}>


//             <div className={Style.tea}>

//              <div className={styles.mediaBlock}>
//            <div className={styles.thumbnailContainer}>
//              {productData.images.map((img, index) => (
//                <button
//                  key={index}
//                  onClick={() => setSelectedImage(img)}
//                  className={`${styles.thumbnailButton} ${selectedImage === img ? styles.thumbnailActive : ""}`}
//                >
//                  <img src={img} alt={`Preview ${index + 1}`} className={styles.thumbnailImage} />
//                </button>
//              ))}
//            </div>
//             <div className={Style.imgD}>
//             <img src={selectedImage} alt={productData.title} className={styles.heroImage} />
//             <button name="set" className={''} value={set} onClick={wish} ><FontAwesomeIcon icon={wishlist}/> </button>

//         </div>

//         </div>

//             <div className={Style.rtea}>
//             <h1>{info.name}</h1>

// <form>
// <div className={Style.quan}>
// <div className={Style.count}>
//     <button onClick={minus} value={quan}> - </button>
//     <input type="number" min={0} name="qty" onChange={qty} value={quan} max={99} maxLength={2} />
//     <button onClick={add} value={quan}> + </button>
// </div>

// <div className={Style.price}>
//     <h2> £ {price} </h2>
// </div>

// <div className={Style.weight}>
//     <h3> WEIGHT</h3>

//     {info.size?.map((project, id) => (
    

//         <button onClick={wght} name={id} value={weight} id={"weight"+id} className={Style.weightb}> {project.weight} </button>



//         )   )   }


//     {/* <button onClick={wght} name="size1"> {info.size[0]['weight']} </button>
//     <button onClick={wght} name="size2"> {info.size[1]['weight']} </button>
//     <button onClick={wght} name="size3"> {info.size[2]['weight']} </button> */}

// </div>

// <button className={Style.cartB} onClick={addToCart}>ADD TO CART</button>
// </div>
// </form>
//             </div>
//             </div>




//         <div className={Style.details}>
//             <h3>DETAILS</h3>
//             <p>{info.description}.</p>
//         </div>

//         <div className={Style.others}>
//             <h3>YOU MIGHT ALSO LIKE</h3>
           
//             {products.slice(0, 4).map((project) => (

//                 <div className="card" key={project._id}> 

//                 <ProductCard
//                     id={project._id}
//                     price={project.price}
//                     name={project.name}
//                     image={project.image}
//                     link={'/product/' + project.name}
//                     />    
//                     </div>


//                 )   )   }
//         </div>


//      </div>
//         </div>

//     )
// }


//kk

function Description() {
      const [info, setinfo] = useState()
      const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state
      const [others, setotherproduct] = useState([])
      const [wishlist, setwish] = useState()
       const [set, setset] = useState('')
  const [activeTab, setActiveTab] = useState("description");



    let link = useParams().id


          useEffect(() => {
              fetch(process.env.REACT_APP_API_LINK  + "getone/cloth/"+ link)
              .then((res) =>  res.json())
              .then((data) => setinfo(data));
          }, [link]);

          
                                
          
          
                  useEffect(() => {
                      fetch(process.env.REACT_APP_API_LINK + "getall/clothes")
                      .then((res) =>  res.json())
                      .then((data) => setotherproduct(data.data?.filter(item => item.name !== link)));
                  }, [link]);
            
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

    <div className={styles.app}>    
      
      <Nav loggedin={isLoggedIn}/>

      <SearchNav />



    <div className={styles.container}>

      <div className={styles.pdpGrid}>
        
        {/* Gallery */}
 
       {info ? <Detailimages productData={info} /> : null} 

        {/* Purchase Options */}

             {info ? <Detailbuypanelinfo productData={info} loggedin={isLoggedIn} /> : null} 


      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabHeaders}>
          {["description", "specifications",].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tabLink} ${activeTab === tab ? styles.tabLinkActive : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className={styles.tabPanelContent}>
          {activeTab === "description" ? (
          info?.description ?   <p>{info?.description}</p> :   <p>No description found</p>
          ) : 
            info?.specs.length !== 0 ?
            <div className={styles.specsTable}>
              { info.specs?.map((item, index) => (
                <div key={index} className={styles.specsRow}>
                  <span className={styles.specLabel}>{item?.label}</span>
                  <span className={styles.specValue}>{item?.value}</span>
                </div>
              ))}
            </div> : <p>No specs found</p> 
          
          }
        </div>
      </div>



          <div className={styles.others} >

            <h3 > Other Product</h3>

            <div className={styles['product-grid']}>


                
        {others?.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            price={product.size[0]?.price}
            image={product.img[0]?.url}
            link={'/product/' + product.name}
            id={product._id}
            color={product?.color[0]}
            size={product.size[0]?._id}
            loggedin={isLoggedIn}
            category={product?.categoryId[0]}
          />
        ))}






     </div>

          </div>



    </div>

    <Footer />

    </div>


  );
}


export default Description