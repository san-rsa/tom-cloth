import React, { useState, ReactDOM, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Nav.module.css"
import {Link, useNavigate} from "react-router-dom"
import { faBars, faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'
import { AlertError, AlertSuccess, Inputs } from "./list/Generallist";



const Nav = ({loggedin}) => {


    const [data, setInputs] = useState({});
    const [burger, setburger] = useState(false)
    const navigate = useNavigate();

        const [status, setstatus] = useState(loggedin)


    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }




    const login = async () => {
       
           
    const api = await fetch(process.env.REACT_APP_API_LINK + 'auth/autoLogin/', {
        method: 'GET',
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
         })
         
         if (api.status === 200) {
          navigate("/user");
        } else {
            navigate("/login")
        }
      }








    const [search, setelement] = useState()

    function toggle (p){

        setburger(!burger)

    }


      const [total, setTotal] = useState([]);


  // 1. Load initial cart on component mount  isloggedin


          let totalItems = total?.reduce((sum, item) => sum + item.quantity, 0);



      
    
      // Fetch from Mongoose via API
      const fetchUserCartFromDatabase =  () => {
    try {
        fetch(process.env.REACT_APP_API_LINK + 'getall/user-cart', {
                      method: 'GET',
                      credentials: "include",
                      headers: {'Content-Type': 'application/json'},
                    }).then((res) =>  res.json())
              .then((data) =>  setTotal(data.data.products ) );

      // const data = await response.json();
     
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };
      
          console.log(loggedin);

function updatedCart(event) {
        // useEffect(() => {






          console.log(loggedin, status, event, 6, event?.detail);
          
    if (!loggedin) {
          // localStorage.setItem('guest_cart', JSON.stringify(cart));

      //    const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;

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


    }
  // }, [ total ])
}

function updatedCartAfterClick(event) {
        // useEffect(() => {






          console.log(loggedin, status, event, 6, event?.detail);
          
    if (!event.detail) {
          // localStorage.setItem('guest_cart', JSON.stringify(cart));

      //    const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;

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


    }
  // }, [ total ])
}






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
  
  // [   JSON.parse(localStorage.getItem('guest_cart')) || [] || total ]);

  // 3. Add item logic (increments quantity if exists, or pushes a new item)
  // const addToCart = (product) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item.id === product.id);

  //     if (existingItem) {
  //       // If item exists, increase its quantity safely
  //       return prevCart.map((item) =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     }

  //     // If it's a new item, append it with a default quantity of 1
  //     return [...prevCart, { ...product, quantity: 1 }];
  //   });
  // };


//   window.addEventListener('cartUpdated', () => {
//   // Fetch new count and update Navbar HTML
//  // updateNavbarCartDOM();

//  console.log(444);

 
 
// });

function cc() {
  updatedCart()
}

  useEffect(() => {
            window.addEventListener('cartUpdated',updatedCartAfterClick); // cc());

       return () => {
      window.removeEventListener('cartupdated', updatedCartAfterClick); // cc());
    };
  }, [ ])  


    useEffect(() => {
        setstatus((prevMessage) => loggedin);
      updatedCart(loggedin)
  }, [ loggedin ])  






    return (
        <nav>
            <FontAwesomeIcon className={Style.burger} icon={faBars} size="2x" onClick={toggle} /> 

             <Link to={"/"}>
             {/* <img src={require("../../logo.png")} /> */}
             <h1 id={Style.navh1}> ARA CLOSET</h1>
             </Link>



                       <div className={Style.menu} >
           
                      {/* <Link to={"/regions"}> <h3 id={Style.navh1}> Regions</h3> </Link>
          
                      <Link to={"/teams"}> <h3 id={Style.navh1}> Teams</h3> </Link> */}
                       
                       
                       
                       
                       
                       {/* <Link to={"/"}>
          
                                         {/*  <Link to={"/"}>
                       <h3 id={Style.navh1}> Matches </h3>
                       </Link>
                        */}

                       {/*   <Link to={"/"}>
                       <h3 id={Style.navh1}> Teams </h3>
                       </Link>
                      */}
                       
                       </div>


          { burger &&  
                       <div className={Style.navmenu} >
                        
                        <Link to={"/regions"}> <h3 id={Style.navh1}> Regions</h3> </Link>
          
                       <Link to={"/teams"}> <h3 id={Style.navh1}> Teams</h3> </Link>
                       {/* <Link to={"/"}>
                       <h3 id={Style.navh1}> Matches </h3>
                       </Link>

                       <Link to={"/"}>
                       <h3 id={Style.navh1}> Teams </h3>
                       </Link> */}
          
                       
                       </div>
          }

        <div className={Style.rnav}>

            <div className=""style={{position: 'relatie'}} >
                 <Link className={Style.navr} to={"/cart"}><FontAwesomeIcon icon={faCartShopping}/> </Link>
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '9px',
              right: '23px',
              background: '#000',
              color: 'white',
              borderRadius: '50%',
              padding: '1px 3px',
              fontSize: 'xx-small',
              fontWeight: 'bolder'
            }}>
              {totalItems}
            </span>  )}
            </div>
          
                <Link className={Style.navr}to={"/login"}  onClick={login} ><FontAwesomeIcon icon={faUser}/> </Link>
        


        </div>

    </nav>
    )
}


// function Nav() {
//   return (
//     <nav className="navbar">
//       <div className="logo">FASHION HUB</div>

//       <ul className="nav-links">
//         {/* <li>Men</li>
//         <li>Women</li> */}
//       </ul>

//       <div className="nav-icons">
//         <span>🛒</span>
//       </div>
//     </nav>
//   );
// }



const SearchNav = ({ event, typeId }) => {
  const [data, setInputs] = useState({})
  const [submitbtn, setSubmitBtn] = useState(false)




  let navigate = useNavigate()
        
    
    
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }
    



    


      const HandleSubmit = async (event) => {
        event.preventDefault();
           navigate("/search/"+ data.name ); 
        
    
     
      
      }



    return (            
      <div className={Style.searchNav} id={Style.searchNav}>


        <form className={Style.searchNav} onSubmit={HandleSubmit}>

        <Inputs type={'text'} name={'name'} onchange={handleChange} value={data.name}  placeholder={'search'} disabled={false} required={true}  />
        

        <button className="submit" type="submit"  disabled={submitbtn}> 🔍</button> 

        </form>

    </div>

    )
}


export default Nav

export {SearchNav,}