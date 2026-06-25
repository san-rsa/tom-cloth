import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import Style from "../styles/Description.module.css"
import styles from "../styles/Cart.module.css"

import Nav, { SearchNav } from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';

import { faBars, faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'



import { ShoppingCart, Heart, BarChart2, Star, Check, HelpCircle } from "lucide-react";
import { AlertError, AlertSuccess, CartCard, ProductCard } from "../components/sub component/list/Generallist";
import { Detailbuypanelinfo, Detailimages } from "../components/sub component/Descriptionview";
import Footer from "../components/sub component/Footer";


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



// Mock initial data
const INITIAL_ITEMS = [
  { id: 1, name: 'Premium Wireless Headphones', price: 129.99, quantity: 1, image: 'https://placeholder.com' },
  { id: 2, name: 'Ergonomic Mechanical Keyboard', price: 89.50, quantity: 2, image: 'https://placeholder.com' },
  { id: 3, name: 'Smart Fitness Watch', price: 199.00, quantity: 1, image: 'https://placeholder.com' },
];

function Cart() {
  const [cartItems, setCartItems] = useState([]);
const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state




      const fetchUserCartFromDatabase =  () => {
    try {
        fetch(process.env.REACT_APP_API_LINK + 'getall/user-cart', {
                      method: 'GET',
                      credentials: "include",
                      headers: {'Content-Type': 'application/json'},
                    }).then((res) =>  res.json())
              .then((data) =>  setCartItems(data.data.products ) );

      // const data = await response.json();
     
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

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


                         function updatedCartAfterClick(event) {
                                 // useEffect(() => {
                         
                         
                         
                         
                         
                                                            
                             if (!event.detail) {
                                   // localStorage.setItem('guest_cart', JSON.stringify(cart));
                         
                               //    const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;
                         
                                   setCartItems(   JSON.parse(localStorage.getItem('guest_cart')) || [] )
                         
                                   
                         
                             } else {
                                const guest = JSON.parse(localStorage.getItem('guest_cart'))
                         
    
                                fetchUserCartFromDatabase()

        
                         
                         
                             }
                           // }, [ total ])
                         }


                           useEffect(() => {
                                     window.addEventListener('cart-updated',updatedCartAfterClick); // cc());
                         
                                return () => {
                               window.removeEventListener('cart-updated', updatedCartAfterClick); // cc());
                             };
                           }, [ ]) 


                             useEffect(() => {

                              if (!isLoggedIn) {
                                 setCartItems(   JSON.parse(localStorage.getItem('guest_cart')) || [] )

                              } else {
                                fetchUserCartFromDatabase()
                              }
                                    
                                                        
                           }, [isLoggedIn ]) 


  

  // Update item quantity
//   const updateQuantity = (id, amount) => {
//     setCartItems(prevItems =>
//       prevItems.map(item => {
//         if (item.id === id) {
//           const newQty = item.quantity + amount;
//           return newQty > 0 ? { ...item, quantity: newQty } : item;
//         }
//         return item;
//       })
//     );
//   };

//   // Remove item from cart
//   const removeItem = (id) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

  // Calculations
  const subtotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15.00;
  const total = subtotal + shipping;

  if (cartItems?.length === 0) {
    return (
      <div className={styles.app}> 
        <Nav />

        <SearchNav />   

            <div className={styles.emptyContainer}>
     
        <h2>Your Cart is Empty</h2>
        <p>Add some items to your cart to see them here.</p>
        <button className={styles.continueButton}>Continue Shopping</button>

      </div>
        <Footer />

      </div>
    );
  }

  return (
    <div className={styles.app} >
        <Nav />

        <SearchNav />

            <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>
      
      <div className={styles.layout}>
        {/* Cart Items List */}
        <div className={styles.cartList}>
          {cartItems?.map((product, key) => (
            // <div key={item.id} className={styles.cartItem}>
            //   <img src={item.image} alt={item.name} className={styles.itemImage} />
              
            //   <div className={styles.itemDetails}>
            //     <h3 className={styles.itemName}>{item.name}</h3>
            //     <p className={styles.itemPrice}>€{item.price.toFixed(2)}</p>
            //   </div>

            //   <div className={styles.quantityControls}>
            //     <button 
            //       onClick={() => updateQuantity(item.id, -1)} 
            //       className={styles.qtyBtn}
            //     >-</button>
            //     <span className={styles.qtyValue}>{item.quantity}</span>
            //     <button 
            //       onClick={() => updateQuantity(item.id, 1)} 
            //       className={styles.qtyBtn}
            //     >+</button>
            //   </div>

            //   <div className={styles.itemTotal}>
            //     €{(item.price * item.quantity).toFixed(2)}
            //   </div>

            //   <button 
            //     onClick={() => removeItem(item.id)} 
            //     className={styles.removeBtn}
            //     aria-label="Remove item"
            //   >
            //     ✕
            //   </button>
            // </div>

              isLoggedIn ? <CartCard 
                        key={key}
                        name={product.name}
                        price={product?.size[0]?.price}
                        image={product?.img[0]?.url}
                        link={'/product/' + product.name}
                        id={product._id}
                        color={product?.color[0]}
                        size={product?.size[0]?._id}
                        loggedin={isLoggedIn}
                        category={product?.categoryId[0]}

                        quantity={product.quantity}
                        c={product.c}

            
                                />  :  
                                                        <CartCard 
                        key={key}
                        name={product.name}
                        price={product?.price}
                        image={product?.image}
                        link={'/product/' + product.name}
                        id={product.productId}
                        color={product?.color}
                        size={product?.size}
                        loggedin={isLoggedIn}
                        category={product?.category}

                        quantity={product.quantity}
                        c={product.c}

            
                                />
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <button className={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

    <Footer />
    </div>
  );
}

export default Cart