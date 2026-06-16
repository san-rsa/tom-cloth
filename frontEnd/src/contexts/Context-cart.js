import { createContext, useState, useContext, useEffect } from 'react';
import { AlertError, AlertSuccess } from '../components/sub component/list/Generallist';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCarts = () => setCartCount(prev => prev + 1);

    // const addToCart = async ({product, loggedin, id, size, color, category,  }) => {
    //   if (!loggedin) {
    //     // GUEST LOGIC: Save to Session / LocalStorage
    //     const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;
    //     const existingItem = updatedCart?.find(item => item.productId === id);
  
    //     if (existingItem) {
    //       existingItem.quantity += 1;
  
    //       AlertSuccess('succesfully added to cart');
    //     } else {
    //       updatedCart.push({ productId: id, quantity: 1, size: size, color: color, category: category });
  
    //           AlertSuccess('succesfully added to cart');
  
    //     }
  
    //   //   setCart(updatedCart);
  
  
  
    //     localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
    //   } else {
    //     // LOGGED IN LOGIC: Save to Mongoose via API
    //     try {
    //       const response = await fetch(process.env.REACT_APP_API_LINK + "add/cart", {
    //             method: "POST",
    //             credentials: "include",
    //             headers: { "Content-type": "application/json; charset=UTF-8", },
    //             body: JSON.stringify({
    //               productId: id,
    //               quantity: 1,
    //               size: size, 
    //               color: color,
    //               category: category,
  
    //             }),
    
    //           }).then((res) => {
    //             if (res.status === 200) {
    //                         AlertSuccess('succesfully added to cart');
    //             } else {
    //                               AlertError('Error updating  cart:');
  
    //             }
    //           })
    //       const updatedDbCart = await response.json();
  
    //         AlertSuccess('succesfully added to cart');
  
    //           navcart(loggedin)
    //     } catch (err) {
    //       console.error('Error updating database cart:', err);
    //               AlertError('Error updating database cart:', err);
  
    //     }
    //   }
    // };






          const [total, setTotal] = useState([]);
          const [totals, setTotals] = useState([]);

    
    
      // 1. Load initial cart on component mount  isloggedin
    
    
           //   let totalItems = total?.reduce((sum, item) => sum + item.quantity, 0);
    
    
    
          
        
          // Fetch from Mongoose via API
          const fetchUserCartFromDatabase =  () => {
        try {
            fetch(process.env.REACT_APP_API_LINK + 'getall/user-cart', {
                          method: 'GET',
                          credentials: "include",
                          headers: {'Content-Type': 'application/json'},
                        }).then((res) =>  res.json())
                  .then((data) =>  setTotals(data.data.products ) );
    
          // const data = await response.json();
         
        } catch (err) {
          console.error('Error fetching cart:', err);
        }
      };
          
    
    
    
    
    
    // export default function ShoppingCart() {
    //   // 1. Initialize state directly from localStorage (fallback to empty array)
    //   const [cart, setCart] = useState(() => {
    //     const savedCart = localStorage.getItem('cart');
    //     return savedCart ? JSON.parse(savedCart) : [];
    //   });
    
      // 2. Automatically sync localStorage whenever the cart state changes
      // useEffect(() => {
      //   if (!loggedin) {
      //         // localStorage.setItem('guest_cart', JSON.stringify(cart));
    
      //     //    const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;
    
      //         setTotal(   JSON.parse(localStorage.getItem('guest_cart')) || [] )
    
      //   } else {
      //      const guest = JSON.parse(localStorage.getItem('guest_cart'))
    
    
           
    
      //     if (guest !== null ) {
      //       const products = JSON.parse(localStorage.getItem('guest_cart'))
    
      //             try {
      //               const response = fetch(process.env.REACT_APP_API_LINK + "add/carts-items", {
      //                     method: "POST",
      //                     credentials: "include",
      //                     headers: { "Content-type": "application/json; charset=UTF-8", },
      //                     body: JSON.stringify({
      //                       products: products,
            
      //                     }),
              
      //                   }).then((res) => {
      //                     if (res.status === 200) {
      //                                 AlertSuccess('succesfully added to carts');
      //                                 console.log(res);
      //                                  localStorage.removeItem('guest_cart');
            
      //                     } 
                          
      //                     else {
      //                                       AlertError('Error updating  cart:');
            
      //                     }
      //                   })
      //               // const updatedDbCart = await response.json();
            
      //                 AlertSuccess('succesfully added to cart');
            
      //               // setCart(updatedDbCart.items);
      //             } catch (err) {
      //               console.error('Error updating database cart:', err);
      //                       AlertError('Error updating database cart:', err);
            
      //             }
      //     }
      //                 fetchUserCartFromDatabase()
    
    
      //   }
      // }, [ total ])  // total])


      async  function navcart(loggedin) {
         //     useEffect(() => {
        if (!loggedin) {
              // localStorage.setItem('guest_cart', JSON.stringify(cart));
    
          //    const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;

                         console.log(totals, total);

    
              setTotal(   JSON.parse(localStorage.getItem('guest_cart')) || [] )
    
        } else {
           const guest = JSON.parse(localStorage.getItem('guest_cart'))
    
    
           
    
          if (guest !== null ) {
            const products = JSON.parse(localStorage.getItem('guest_cart'))
    
                  try {
                    const response = fetch(process.env.REACT_APP_API_LINK + "add/carts-items", {
                          method: "POST",
                          credentials: "include",
                          headers: { "Content-type": "application/json; charset=UTF-8", },
                          body: JSON.stringify({
                            products: products,
            
                          }),
              
                        }).then((res) => {
                          if (res.status === 200) {
                                      AlertSuccess('succesfully added to carts');
                                      console.log(res);
                                       localStorage.removeItem('guest_cart');
            
                          } 
                          
                          else {
                                            AlertError('Error updating  cart:');
            
                          }
                        })
                    // const updatedDbCart = await response.json();
            
                      AlertSuccess('succesfully added to cart');
            
                    // setCart(updatedDbCart.items);
                  } catch (err) {
                    console.error('Error updating database cart:', err);
                            AlertError('Error updating database cart:', err);
            
                  }
          }
                      fetchUserCartFromDatabase()

               setTotal(totals.reduce((sum, item) => sum + item.quantity, 0));

               console.log(totals, total);
               


    
    
        }
    //  }, [ total ])  // total])
      }
  return (
    <CartContext.Provider value={{  navcart }}>
      {children}
    </CartContext.Provider>
  );
};

export const CartIcon = () => useContext(CartContext);