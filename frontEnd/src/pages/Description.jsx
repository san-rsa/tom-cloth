import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Style from "../styles/Description.module.css"
import styles from "../styles/Description.module.css"

import Nav from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';

import { faBars, faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'



import { ShoppingCart, Heart, BarChart2, Star, Check, HelpCircle } from "lucide-react";
import { ProductCard } from "../components/sub component/list/Generallist";


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
  title: "Vulcan Weightlifting Tank",
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

// function Description() {
//   const [selectedImage, setSelectedImage] = useState(productData.images[0]);
//   const [selectedSize, setSelectedSize] = useState("M");
//   const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");

//   const handleQuantityChange = (type) => {
//     if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
//     if (type === "inc") setQuantity(quantity + 1);
//   };

//   const handleAddToCart = () => {
//     alert(`Added to cart:\n${productData.title}\nSize: ${selectedSize}\nColor: ${selectedColor.name}\nQty: ${quantity}`);
//   };

//   return (
//     <div className={styles.container}>

//       <div className={styles.pdpGrid}>
        
//         {/* Gallery */}
//         <div className={styles.mediaBlock}>
//           <div className={styles.thumbnailContainer}>
//             {productData.images.map((img, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedImage(img)}
//                 className={`${styles.thumbnailButton} ${selectedImage === img ? styles.thumbnailActive : ""}`}
//               >
//                 <img src={img} alt={`Preview ${index + 1}`} className={styles.thumbnailImage} />
//               </button>
//             ))}
//           </div>

//           <div className={styles.heroWindow}>
//             <img src={selectedImage} alt={productData.title} className={styles.heroImage} />
//           </div>
//         </div>

//         {/* Purchase Options */}
//         <div className={styles.buyPanel}>
//           <h1 className={styles.title}>{productData.title}</h1>
          
//           <div className={styles.metricsPanel}>
//             <div className={styles.stars}>
//               {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
//             </div>
//             <button className={styles.reviewLink}>Be the first to review this product</button>
//             <span className={styles.dividerPipe}>|</span>
//             <span className={styles.sku}>SKU: {productData.sku}</span>
//           </div>

//           <div className={styles.priceSection}>
//             <div className={styles.priceDisplay}>${productData.basePrice.toFixed(2)}</div>
//             <div className={styles.stockBadge}>
//               <Check size={14} /> In stock & ready to ship
//             </div>
//           </div>

//           <div className={styles.selectorsGroup}>
//             {/* Sizes */}
//             <div>
//               <div className={styles.selectorLabelRow}>
//                 <span className={styles.groupLabel}>Size: <span className={styles.labelValue}>{selectedSize}</span></span>
//                 <button className={styles.textActionLink}>
//                   <HelpCircle size={12} /> Size Guide
//                 </button>
//               </div>
//               <div className={styles.sizeGrid}>
//                 {productData.sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`${styles.sizeBox} ${selectedSize === size ? styles.sizeBoxActive : ""}`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Colors */}
//             <div>
//               <span className={styles.groupLabel}>
//                 Color: <span className={styles.labelValue}>{selectedColor.name}</span>
//               </span>
//               <div className={styles.colorGrid}>
//                 {productData.colors.map((color) => (
//                   <button
//                     key={color.name}
//                     onClick={() => setSelectedColor(color)}
//                     style={{ backgroundColor: color.value }}
//                     className={`${styles.colorCircle} ${selectedColor.name === color.name ? styles.colorCircleActive : ""}`}
//                     title={color.name}
//                   >
//                     {selectedColor.name === color.name && <span className={styles.checkmark}>✓</span>}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity */}
//             <div>
//               <span className={styles.groupLabel}>Qty</span>
//               <div className={styles.qtyContainer}>
//                 <button onClick={() => handleQuantityChange("dec")} className={`${styles.qtyBtn} ${styles.qtyBtnLeft}`}>-</button>
//                 <div className={styles.qtyDisplay}>{quantity}</div>
//                 <button onClick={() => handleQuantityChange("inc")} className={`${styles.qtyBtn} ${styles.qtyBtnRight}`}>+</button>
//               </div>
//             </div>
//           </div>

//           {/* Action Row */}
//           <div className={styles.actionSuite}>
//             <button onClick={handleAddToCart} className={styles.addToCartBtn}>
//               <ShoppingCart size={18} /> Add to Cart
//             </button>

//             <div className={styles.metaActionsRow}>
//               <button className={styles.metaBtn}>
//                 <Heart size={16} /> ADD TO WISH LIST
//               </button>
//               <button className={`${styles.metaBtn} ${styles.metaBtnCompare}`}>
//                 <BarChart2 size={16} /> ADD TO COMPARE
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Tabs */}
//       <div className={styles.tabsContainer}>
//         <div className={styles.tabHeaders}>
//           {["description", "specifications"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`${styles.tabLink} ${activeTab === tab ? styles.tabLinkActive : ""}`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <div className={styles.tabPanelContent}>
//           {activeTab === "description" ? (
//             <p>{productData.description}</p>
//           ) : (
//             <div className={styles.specsTable}>
//               {productData.specs.map((item, index) => (
//                 <div key={index} className={styles.specsRow}>
//                   <span className={styles.specLabel}>{item.label}</span>
//                   <span className={styles.specValue}>{item.value}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



const Description = ({}) => {

    const [product, setproduct] = useState([])
    const [info, setinfo] = useState({})
    const [quan, setquan] = useState(Number(0))
    const [prc, setprc] = useState(Number())
    const [price, setprice] = useState(Number())
    const [weight, setweight] = useState(Number())
    const [wishlist, setwish] = useState()
    const [set, setset] = useState('')
    const [priced, setpriced] = useState(Number())

    const [selectedImage, setSelectedImage] = useState(productData.images[0]);
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");

    const handleQuantityChange = (type) => {
        if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
        if (type === "inc") setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        alert(`Added to cart:\n${productData.title}\nSize: ${selectedSize}\nColor: ${selectedColor.name}\nQty: ${quantity}`);
    };




    
    const link = useParams().id

   


       function wght(event) {
        event.preventDefault() 
        
        console.log(priced, weight)
        
        if (event.target.name == 0) {

            const weight0 = document.getElementById("weight0")
            const weight1 = document.getElementById("weight1")
            const weight2 = document.getElementById("weight2")

            weight0.classList.add(Style.active)
            weight1.classList.remove(Style.active)
            weight2.classList.remove(Style.active)






            setprc(info.size[0].price )
            setquan(1)
            setprice(info.size[0].price )
            setweight(info.size[0]._id)
            setpriced(0)



            
        } else  if (event.target.name == 1) {


            const weight0 = document.getElementById("weight0")
            const weight1 = document.getElementById("weight1")
            const weight2 = document.getElementById("weight2")

            weight0.classList.remove(Style.active)
            weight1.classList.add(Style.active)
            weight2.classList.remove(Style.active)



            setprc(info.size[1].price )
            setquan(1)
            setprice(info.size[1].price )
            setweight(info.size[1]._id)
            setpriced(1)








            
        }        else  if (event.target.name == 2) {

            const weight0 = document.getElementById("weight0")
            const weight1 = document.getElementById("weight1")
            const weight2 = document.getElementById("weight2")


            weight0.classList.remove(Style.active)
            weight1.classList.remove(Style.active)
            weight2.classList.add(Style.active)



            setprc(info.size[2].price )
            setquan(1)
            setprice(info.size[2].price )
            setweight(info.size[2]._id)
            setpriced(2)



        }  

       }



    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/product/"+ link)
            .then((res) =>  res.json())
            .then((data) => setinfo(data));
        }, []);

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getall/product")
            .then((res) =>  res.json())
            .then((data) => setproduct(data.data));
        }, []);
    
 
    
 function qty(params) {
        setquan(params.target.value);
        setprc(Number(params.target.value) * prc )

        
        if (quan <= 0) {
            setquan(1)
           }
    }


    function add(p) {
        p.preventDefault()
        setquan(prevItems => {
           let no= Number(prevItems) + 1;
           let pr = Number(no)*prc;
           setprice(pr);
          return no;
        });
       }

  

       async function addToCart(e) {
        e.preventDefault()
        try {
          const response = await fetch(process.env.REACT_APP_API_LINK + "add/cart", {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json; charset=UTF-8", },
            body: JSON.stringify({
              productId: info._id,
              quantity: quan,
              weight: weight,
              price: priced
            }),

          }).then((res) =>  {
            if (res.status === 200) {
                toast.success('added to cart', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
            } else {
             
                toast.error('please try again later ', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
            }
          }
        )
            
        } catch (err) {
          toast.error('please try again later ' + err, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          console.log(err);
        };

        } 
      

     useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK  + "getone/wishlist/" + link, {
            credentials: "include",
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then((res) =>  res.json())
        .then((data) =>  {
            if (data.data == "true") {
                setwish(faX)
                setset("active")
            } else {
                setwish(faHeart)
                setset("false")
            }
        } );
    }, []);
         function wish(e) {
            e.preventDefault()
            const  mood = wishlist.iconName


            if (mood == "heart") {
                fetch(process.env.REACT_APP_API_LINK + "add/wishlist", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({productId: info._id }),
             }).then((res) =>  res.json())
             .then( ()=> setwish(faX))



            } else {
                fetch(process.env.REACT_APP_API_LINK + "del/wishlist", {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({productId: info._id }),
                 }).then((res) =>  res.json())
                 .then( ()=> setwish(faHeart))
            }



       }

    //    useEffect(() => {
    //     fetch(process.env.REACT_APP_API_LINK  + "getone/wishlist/"+ link, {
    //         credentials: "include"}
    //     )
    //     .then((res) =>  res.json())
    //     .then((data) => setinfo(data));
    // }, []);






       function minus(p) {
        p.preventDefault()
        setquan(prevItems => {
           let no= Number(prevItems) - 1;
           let pr = Number(no) * prc;
           setprice(pr);

           if (prevItems <= 1) {
            setquan(1)
           }



          return no;
        });
       }

    return (
        <div>
         <Nav />
            <div className={Style.desc}>


            <div className={Style.tea}>

             <div className={styles.mediaBlock}>
           <div className={styles.thumbnailContainer}>
             {productData.images.map((img, index) => (
               <button
                 key={index}
                 onClick={() => setSelectedImage(img)}
                 className={`${styles.thumbnailButton} ${selectedImage === img ? styles.thumbnailActive : ""}`}
               >
                 <img src={img} alt={`Preview ${index + 1}`} className={styles.thumbnailImage} />
               </button>
             ))}
           </div>
            <div className={Style.imgD}>
            <img src={selectedImage} alt={productData.title} className={styles.heroImage} />
            <button name="set" className={''} value={set} onClick={wish} ><FontAwesomeIcon icon={wishlist}/> </button>

        </div>

        </div>

            <div className={Style.rtea}>
            <h1>{info.name}</h1>

<form>
<div className={Style.quan}>
<div className={Style.count}>
    <button onClick={minus} value={quan}> - </button>
    <input type="number" min={0} name="qty" onChange={qty} value={quan} max={99} maxLength={2} />
    <button onClick={add} value={quan}> + </button>
</div>

<div className={Style.price}>
    <h2> £ {price} </h2>
</div>

<div className={Style.weight}>
    <h3> WEIGHT</h3>

    {info.size?.map((project, id) => (
    

        <button onClick={wght} name={id} value={weight} id={"weight"+id} className={Style.weightb}> {project.weight} </button>



        )   )   }


    {/* <button onClick={wght} name="size1"> {info.size[0]['weight']} </button>
    <button onClick={wght} name="size2"> {info.size[1]['weight']} </button>
    <button onClick={wght} name="size3"> {info.size[2]['weight']} </button> */}

</div>

<button className={Style.cartB} onClick={addToCart}>ADD TO CART</button>
</div>
</form>
            </div>
            </div>




        <div className={Style.details}>
            <h3>DETAILS</h3>
            <p>{info.description}.</p>
        </div>

        <div className={Style.others}>
            <h3>YOU MIGHT ALSO LIKE</h3>
           
            {products.slice(0, 4).map((project) => (

                <div className="card" key={project._id}> 

                <ProductCard
                    id={project._id}
                    price={project.price}
                    name={project.name}
                    image={project.image}
                    link={'/product/' + project.name}
                    />    
                    </div>


                )   )   }
        </div>


     </div>
        </div>

    )
}




export default Description