import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import Style from "../styles/Description.module.css"
import styles from "../styles/Checkout.module.css"

import Nav, { SearchNav } from "../components/sub component/Nav"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';

import { faBars, faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'



import { ShoppingCart, Heart, BarChart2, Star, Check, HelpCircle } from "lucide-react";
import { AlertError, AlertSuccess, CartCard, CheckoutCard, Inputs, ProductCard } from "../components/sub component/list/Generallist";
import { Detailbuypanelinfo, Detailimages } from "../components/sub component/Descriptionview";
import Footer from "../components/sub component/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForms } from "./Payment";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


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


// function Checkout() {
//   const [cartItems, setCartItems] = useState([]);
// const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state




//       const fetchUserCartFromDatabase = () => {
//     try {
//         fetch(process.env.REACT_APP_API_LINK + 'getall/user-cart', {
//                       method: 'GET',
//                       credentials: "include",
//                       headers: {'Content-Type': 'application/json'},
//                     }).then((res) =>  res.json())
//               .then((data) => setCartItems(data.data?.products ) );

//       // const data = await response.json();
     
//     } catch (err) {
//       console.error('Error fetching cart:', err);
//     }
//   };

//                         useEffect(() => {
              
                
//                                 fetch(process.env.REACT_APP_API_LINK + 'getone/user/isloggedin', {
//                                     method: 'GET',
//                                     credentials: "include",
//                                     headers: {'Content-Type': 'application/json'},
//                                      }).then((res) => {
//                                     if (res.status === 200) {
//                                         setIsLoggedIn( true)
                    
//                                     } else  if (res.status === 403) {
//                                         setIsLoggedIn( false)
                    
//                                     } 
//                          })    
                                  
//                          },   []);


//                         async function updatedCartAfterClick(event) {
   
//                           console.log(event);
                          
                                                            
//                              if (!event.detail) {
                 
                              
//                                    setCartItems(   JSON.parse(localStorage.getItem('guest_cart')) || [] )
                         
                                   
                         
//                              } else {
                        
    
//                                fetchUserCartFromDatabase()

//                              }
//                          }


//                            useEffect(() => {
//                                      window.addEventListener('cart-updated',updatedCartAfterClick); // cc());
                         
//                                 return () => {
//                                window.removeEventListener('cart-updated', updatedCartAfterClick); // cc());
//                              };

//                            }, [ ]) 


//                              useEffect(() => {

//                               if (!isLoggedIn) {
//                                  setCartItems(   JSON.parse(localStorage.getItem('guest_cart')) || [] )

//                               } else {
//                                 fetchUserCartFromDatabase()
//                               }
                                    
                                                        
//                            }, [isLoggedIn ]) 


  

//   // Update item quantity
// //   const updateQuantity = (id, amount) => {
// //     setCartItems(prevItems =>
// //       prevItems.map(item => {
// //         if (item.id === id) {
// //           const newQty = item.quantity + amount;
// //           return newQty > 0 ? { ...item, quantity: newQty } : item;
// //         }
// //         return item;
// //       })
// //     );
// //   };

// //   // Remove item from cart
// //   const removeItem = (id) => {
// //     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
// //   };

//   // Calculations
//   const subtotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const shipping = subtotal > 200 || subtotal === 0 ? 0 : 15.00;
//   const total = subtotal + shipping;

//   if (cartItems?.length === 0 || !cartItems) {
//     return (
//       <div className={styles.app}> 
//         <Nav />

//         <SearchNav />   

//             <div className={styles.emptyContainer}>
     
//         <h2>Your Cart is Empty</h2>
//         <p>Add some items to your cart to see them here.</p>
//         <button className={styles.continueButton}>Continue Shopping</button>

//       </div>
//         <Footer />

//       </div>
//     );
//   }

//   return (
//     <div className={styles.app} >
//         <Nav />

//         <SearchNav />

//             <div className={styles.container}>
//       <h1 className={styles.title}>Shopping Cart</h1>
      
//       <div className={styles.layout}>
//         {/* Cart Items List */}
//         <div className={styles.cartList}>
//           {cartItems?.map((product, key) => (

  
//             // <div key={item.id} className={styles.cartItem}>
//             //   <img src={item.image} alt={item.name} className={styles.itemImage} />
              
//             //   <div className={styles.itemDetails}>
//             //     <h3 className={styles.itemName}>{item.name}</h3>
//             //     <p className={styles.itemPrice}>€{item.price.toFixed(2)}</p>
//             //   </div>

//             //   <div className={styles.quantityControls}>
//             //     <button 
//             //       onClick={() => updateQuantity(item.id, -1)} 
//             //       className={styles.qtyBtn}
//             //     >-</button>
//             //     <span className={styles.qtyValue}>{item.quantity}</span>
//             //     <button 
//             //       onClick={() => updateQuantity(item.id, 1)} 
//             //       className={styles.qtyBtn}
//             //     >+</button>
//             //   </div>

//             //   <div className={styles.itemTotal}>
//             //     €{(item.price * item.quantity).toFixed(2)}
//             //   </div>

//             //   <button 
//             //     onClick={() => removeItem(item.id)} 
//             //     className={styles.removeBtn}
//             //     aria-label="Remove item"
//             //   >
//             //     ✕
//             //   </button>
//             // </div>

//               isLoggedIn ? <CartCard 
//                         key={key}
//                         name={product.productId.name}
//                         price={product?.price}
//                         image={product.productId?.img[0]?.url}
//                         link={'/product/' + product.name}
//                         id={product.productId._id}
//                         color={product?.color}
//                         size={ product.sizeId}
//                         loggedin={isLoggedIn}
//                         // category={product?.categoryId[0]}

//                         quantity={product.quantity}
//                         c={product.productId.size.find((item => item._id === product.sizeId) )?.size}

            
//                                 />  :  
//                                                         <CartCard 
//                         key={key}
//                         name={product.name}
//                         price={product?.price}
//                         image={product?.image}
//                         link={'/product/' + product.name}
//                         id={product.productId}
//                         color={product?.color}
//                         size={product?.size}
//                         loggedin={isLoggedIn}
//                         category={product?.category}

//                         quantity={product.quantity}
//                         c={product.c}

            
//                                 />
//           ))}
//         </div>

//         {/* Order Summary Sidebar */}
//         <div className={styles.summaryCard}>
//           <h2 className={styles.summaryTitle}>Order Summary</h2>
          
//           <div className={styles.summaryRow}>
//             <span>Subtotal</span>
//             <span>€{subtotal?.toFixed(2)}</span>
//           </div>
          
//           <div className={styles.summaryRow}>
//             <span>Shipping</span>
//             <span>{shipping === 0 ? 'Free' : `€${shipping?.toFixed(2)}`}</span>
//           </div>
          
//           <div className={`${styles.summaryRow} ${styles.totalRow}`}>
//             <span>Total</span>
//             <span>€{total?.toFixed(2)}</span>
//           </div>

//           <button className={styles.checkoutButton}>
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>

//     <Footer />
//     </div>
//   );
// }




function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state
      const [data, setInputs] = useState({});
      const [submitbtn, setSubmitBtn] = useState(false)    
    


        const [clientSecret, setClientSecret] = useState('');
        console.log(clientSecret);
        
      
        const startCheckout = async () => {
          const res = await fetch(process.env.REACT_APP_API_LINK +'payment/pay', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'user_99', productId: 'prod_456', amount: 29.99 })
          });
          const data = await res.json();
          setClientSecret(data.clientSecret);
        };
    
          const fetchUserCartFromDatabase = () => {
        try {
            fetch(process.env.REACT_APP_API_LINK + 'getall/user-cart', {
                          method: 'GET',
                          credentials: "include",
                          headers: {'Content-Type': 'application/json'},
                        }).then((res) =>  res.json())
                  .then((data) => setCartItems(data.data?.products ) );
    
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
                             
                             
                              startCheckout()
                                      
                             },   []);


                              useEffect(() => {
 
                               if (!isLoggedIn) {
                                  setCartItems(   JSON.parse(localStorage.getItem('guest_cart')) || [] )
 
                               } else {
                                 fetchUserCartFromDatabase()
                               }
                                     
                                                         
                            }, [isLoggedIn ]) 









                             useEffect(() => {

                                if (isLoggedIn) {
                                     fetch(process.env.REACT_APP_API_LINK + 'getone/user/order-details', {
                                        method: 'GET',
                                        credentials: "include",
                                        headers: {'Content-Type': 'application/json'},
                                         }).then((res) =>  res.json())
                                         .then((data) => {
                                            // console.log(res);
                                            
                                    
                                            setInputs( {
                                                        fname:data.name?.first ,
                                                        lname:data.name?.last ,
                                                        email:data.email, 
                                                        // password:data.password, 
                                                        phone:data.phone, 
                                                        street:data.address?.street, 
                                                        city:data.address?.city, 
                                                        county:data.address?.county, 
                                                        zipcode:data.address?.zipcode,
                                            })
                        
                                        
                             })                                      
                                }
                  
                    
 
                                      
                             },   [isLoggedIn]);                           
                            
                            


//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     cardNumber: '',
//     expiry: '',
//     cvv: '',
//   });

  // Mock cart items data
//   const cartItems = [
//     { id: 1, name: 'Wireless Headphones', price: 99.99 },
//     { id: 2, name: 'Ergonomic Mouse', price: 49.50 },
//         { id: 1, name: 'Wireless Headphones', price: 99.99 },
//     { id: 2, name: 'Ergonomic Mouse', price: 49.50 },
//         { id: 1, name: 'Wireless Headphones', price: 99.99 },
//     { id: 2, name: 'Ergonomic Mouse', price: 49.50 },
//   ];


    
      let navigate = useNavigate()
  
  
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
  const subtotal = !isLoggedIn ? cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) : cartItems.reduce((acc, item) => acc + item.total, 0);
  const shipping = 5.00;

  const total = subtotal + shipping;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit2 = (e) => {
//     e.preventDefault();
//     alert(`Order processing for ${formData.fullName || 'Customer'}! Total: $${total.toFixed(2)}`);
//     console.log('Submitted Data: ', formData);
//   };





// const handleSubmit =  (event) => {
//           event.preventDefault();
//           setSubmitBtn(!submitbtn)
      
//           const formData = new FormData();
        
          
      
//               formData.append('data',  JSON.stringify(data));

//               console.log(data, formData);
              


      
      
//           if (isLoggedIn) {

              
//                           fetch(process.env.REACT_APP_API_LINK + 'add/order/', {
//           method: 'POST',
//           credentials: "include",
//             headers: { "Content-type": "application/json; charset=UTF-8", },
//           body: JSON.stringify(data)
//           })
          
//           .then((res) => {           
  
//               if (res.status == 200) {
  
            
//               AlertSuccess('order successful ')
            
//                   navigate("/"); 
  
//               } else {
//               setSubmitBtn(false);
          
//               }
  
//               return res.json()
//           }).then(
//             data => {
//               console.log(data.message, 'llk')       
  
              
//               if (data.success == false) {
//                   AlertError(data.message)
  
//                   setSubmitBtn(false);
                  
//               } else {
//                 //  navigate("/user"); 
  
//               }
//             }).catch((e) => {
//             console.log(e);
//             setSubmitBtn(false)
//             AlertError("error try again later")
  
//           })
//           } else {



//               const cart = JSON.parse(localStorage.getItem('guest_cart')) || [] 

//               console.log(cart, data);
              
//               fetch(process.env.REACT_APP_API_LINK + 'add/order-from-session/', {
//           method: 'POST',
//           credentials: "include",
//             headers: { "Content-type": "application/json; charset=UTF-8", },
//           body: JSON.stringify({data: data, cart: cart}, )
//           })
          
//           .then((res) => {           
  
//               if (res.status == 200) {
  
            
//               AlertSuccess('order successful ')

//                   localStorage.removeItem('guest_cart');

            
//                   navigate("/"); 
  
//               } else {
//               setSubmitBtn(false);
          
//               }
  
//               return res.json()
//           }).then(
//             data => {
//               console.log(data.message, 'llk')       
  
              
//               if (data.success == false) {
//                   AlertError(data.message)
  
//                   setSubmitBtn(false);
                  
//               } else {
//                 //  navigate("/user"); 
  
//               }
//             }).catch((e) => {
//             console.log(e);
//             setSubmitBtn(false)
//             AlertError("error try again later")
  
//           })
//           }
  
  
          
      
      
        
        
//         }

  return (
    <div> 

        <Nav />

                    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      
      {/* <form onSubmit={handleSubmit} className={styles.grid}> */}
        {/* Left Side: Shipping & Payment Forms */}
        <div>
          <h2 className={styles.sectionTitle}>Shipping Information</h2>
          
        { !isLoggedIn ?           <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>

            <Inputs name="fname" type={"text"} onchange={handleChange} value={data.fname} placeholder={"your first name "} label={"first name"}  disabled={false} required={true} />   
            <Inputs name="lname" type={"text"} onchange={handleChange} value={data.lname} placeholder={"your last name "} label={"last name"}  disabled={false} required={true} />


          </div> : null}

          <div className={styles.formGroup}>

            {!isLoggedIn ? <Inputs name="email" type={"email"} onchange={handleChange} value={data.email} placeholder={"your email "} label={"email"}  disabled={false} required={true} />
               : null }
            <Inputs name="phone" type={"number"} onchange={handleChange} value={data.phone} placeholder={"your phone number "} label={"phone number"}  disabled={false} required={true} />

          </div>



          <div className={styles.formGroup}>

              
            <div className={styles.address} >
                  <h3 > Address </h3>

            <Inputs name="street" type={"text"} onchange={handleChange} value={data.street} placeholder={"your street name "} label={"street name"}  disabled={false} required={true} />
            <Inputs name="county" type={"text"} onchange={handleChange} value={data.county} placeholder={"county "} label={"county"}  disabled={false} required={true} />


                </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
            
                        <Inputs name="city" type={"text"} onchange={handleChange} value={data.city} placeholder={"city "} label={"city"}  disabled={false} required={true} />

            </div>
            <div className={styles.formGroup}>
                        <Inputs name="zipcode" type={"text"} onchange={handleChange} value={data.zipcode} placeholder={"zip code "} label={"zipcode"}  disabled={false} required={true} />

            
            </div>
          </div>

          <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Payment Details</h2>
          
          {/* <div className={styles.formGroup}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              required
              className={styles.input}
              value={formData.cardNumber}
              onChange={handleInputChange}
            />

            
                <div className={styles.inp}>




       

                </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="expiry">Expiry Date</label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                placeholder="MM/YY"
                required
                className={styles.input}
                value={formData.expiry}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="000"
                required
                className={styles.input}
                value={formData.cvv}
                onChange={handleInputChange}
              />
            </div>
          </div> */}
        </div>

        {/* Right Side: Order Summary */}
        <div className={styles.summaryCard}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          
          <ul className={styles.itemList}>
            {cartItems.map((item) => (
               
              isLoggedIn ?  <CheckoutCard
                name={item.productId.name}
                image={item.productId?.img[0].url}
                quantity={item.quantity}
                color={item.color}
                c={item.productId.size.find((items => items._id === item.sizeId) )?.size}
                total={item.total}

                 /> :
                   <CheckoutCard
                    name={item.name}
                    image={item.image}
                    quantity={item.quantity}
                    color={item.color}
                    total={item.price * item.quantity}
                    c={item.c}


                 />                  
            ))}
          </ul>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping</span>
              <span>€{shipping.toFixed(2)}</span>
            </div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>

          {/* <button type="submit"  className={styles.submitBtn}>
            Place Order
          </button> */}

              <div>
                {!clientSecret ? (
                  <button onClick={startCheckout}>Buy Now </button>
                ) : (
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: {theme: 'stripe'}  }}>
                    <CheckoutForms />
                  </Elements>
                )}
              </div>

        </div>
      {/* </form>           */}
      {/* <Link to={'/payment'} >           <button className={styles.submitBtn}>
            Place 
          </button> </Link> */}
    </div>
    </div>
  );
}

export default Checkout