import React, { useState, useEffect, useRef, useContext  } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/General.module.css"
import styles from "../../../styles/Cart.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';

// import { CartIcon } from '../../../context/Context-cart';




const HorizontalScroll = ({ children }) => {
  const scrollRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add('active');
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove('active');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    startX = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      className={Style.scroll_container}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ overflow: 'hidden', cursor: 'grab' }}
    >
      {children}
    </div>
  );
};

const Inputs = ({label, type, name, onchange, value, disabled, placeholder, required,  }) => {



  return (
      <div className={Style.formlist} >
      <label >{label}</label>
      <input type={type} disabled={disabled} name={name} onChange={onchange} value={value} id={name} placeholder={placeholder} required={required} />
      </div>

  )
}


const ProductCard = ({id, color, size, image, name, price, link, loggedin, category, c} ) => {

  const addToCart = async (product) => {

              console.log(loggedin);

    if (!loggedin) {
      // GUEST LOGIC: Save to Session / LocalStorage
      const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;
      const existingItem = updatedCart?.find(item => item.productId === id);

      if (existingItem) {
        existingItem.quantity += 1;

        AlertSuccess('succesfully added to cart');
      } else {
        updatedCart.push({ productId: id, quantity: 1, size: size, color: color, category: category, name: name,
          price: price, c: c,
          image: image });

            AlertSuccess('succesfully added to cart');

      }

    //   setCart(updatedCart);



      localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
    } else {
      // LOGGED IN LOGIC: Save to Mongoose via API
      try {
        const response = await fetch(process.env.REACT_APP_API_LINK + "add/cart", {
              method: "POST",
              credentials: "include",
              headers: { "Content-type": "application/json; charset=UTF-8", },
              body: JSON.stringify({
                productId: id,
                quantity: 1,
                size: size, 
                color: color,
                category: category,

              }),
  
            }).then((res) => {
              if (res.status === 200) {
                          AlertSuccess('succesfully added to cart');

                        //  navcart(loggedin)


                       
              } else {
                                AlertError('Error updating  cart:');

              }
            })

        // const updatedDbCart = await response.json();
                    
          // AlertSuccess('succesfully added to cart');

        // setCart(updatedDbCart.items);
      } catch (err) {
        console.error('Error updating database cart:', err);
                AlertError('Error updating database cart:', err);

      }
    }
        // const event = new CustomEvent('cartUpdated');
        //                window.dispatchEvent(event);


      const event = new CustomEvent('cartUpdated', { detail: loggedin });
      window.dispatchEvent(event);

                       console.log(44);
  };



  return (
    <div className={Style.product_card}>

      <Link to={link}>
            <img src={image} alt={name} />

      <h4>{name}</h4>

      <p>€{price}</p>
      </Link>

      <button onClick={() => addToCart({ id: id })} >Add to Cart</button>
    </div>
  );


}



const CartCard = ({id, color, size, image, c, name, price, link, loggedin, category, quantity,updateQuantityAdd, updateQuantitySub, } ) => {

    
    
  
    // Update item quantity
    const updateQuantity = (id, amount) => {

      console.log(id, amount, size, color, );
      

          if (!loggedin) {
      // GUEST LOGIC: Save to Session / LocalStorage
      const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;
      const existingItem = updatedCart?.find(item => item.productId === id && item?.color === color && item?.size === size );

      
      if (existingItem) {
        existingItem.quantity += amount;

        AlertSuccess('succesfully added to cart');
      } 


      localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
    } else {
      // LOGGED IN LOGIC: Save to Mongoose via API
      try {
          fetch(process.env.REACT_APP_API_LINK + "add/cart", {
              method: "POST",
              credentials: "include",
              headers: { "Content-type": "application/json; charset=UTF-8", },
              body: JSON.stringify({
                productId: id,
                quantity: amount,
                size: size, 
                color: color,
                category: category,
                // color: selectedColor,

              }),
  
            }).then((res) => {
              if (res.status === 200) {
                          AlertSuccess('succesfully added to cart');

                        //  navcart(loggedin)

      const event = new CustomEvent('cart-updated', { detail: loggedin });
      window.dispatchEvent(event);
                       
              } else {
                                AlertError('Error updating  cart:');

              }
            })

      
      } catch (err) {
        console.error('Error updating database cart:', err);
                AlertError('Error updating database cart:', err);

      }
    }
        // const event = new CustomEvent('cartUpdated');
        //                window.dispatchEvent(event);


      const event = new CustomEvent('cart-updated', { detail: loggedin });
      window.dispatchEvent(event);
    };
  
    // Remove item from cart
    const removeItem = () => {

            
      console.log(id, size, color, );

      if (!loggedin) {
      // GUEST LOGIC: Save to Session / LocalStorage
      const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;


      const existingItem = updatedCart?.filter(item => 
            !(
        item.productId === id &&
        item.color === color &&
        item.size === size
    ) )
    //item.productId !== id && item?.color !== color && item?.size !== size );
            
  

      if (existingItem) {

        AlertSuccess('succesfully removed cart');
      } 


      localStorage.setItem('guest_cart', JSON.stringify(existingItem));
    } else {
      // LOGGED IN LOGIC: Save to Mongoose via API
      try {
          fetch(process.env.REACT_APP_API_LINK + "delete/cart", {
              method: "DELETE",
              credentials: "include",
              headers: { "Content-type": "application/json; charset=UTF-8", },
              body: JSON.stringify({
              productId: id,
                size: size, 
                color: color,
                // color: selectedColor,

              }),
  
            }).then((res) => {
              if (res.status === 200) {
                          AlertSuccess('succesfully removed cart');

                const event = new CustomEvent('cart-updated', { detail: loggedin });
                window.dispatchEvent(event);


                       
              } else {
                                AlertError('Error updating  cart:');

              }
            })

        // const updatedDbCart = await response.json();
                    
          // AlertSuccess('succesfully added to cart');

        // setCart(updatedDbCart.items);
      } catch (err) {
        console.error('Error updating database cart:', err);
                AlertError('Error updating database cart:', err);

      }
    }
        // const event = new CustomEvent('cartUpdated');
        //                window.dispatchEvent(event);


      const event = new CustomEvent('cart-updated', { detail: loggedin });
      window.dispatchEvent(event);
    };


  return (
            <div className={styles.cartItem}>
              <img src={image} alt={name} className={styles.itemImage} />
              
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{name} </h3>
                <p className={styles.itemPrice}>€{price?.toFixed(2)}</p>
                <span style={{}} > color: <span style={{color: color}}> {color} </span>
 </span>
                <span style={{color: color}}> size: {c} </span>



              </div>

              <div className={styles.quantityControls}>
                <button 
                  onClick={() => updateQuantity(id, -1)} 
                  className={styles.qtyBtn}
                >-</button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button 
                  onClick={() => updateQuantity(id, 1)} 
                  className={styles.qtyBtn}
                >+</button>
              </div>

              <div className={styles.itemTotal}>
                €{(price * quantity)?.toFixed(2)}
              </div>

              <button 
                onClick={() => removeItem()} 
                className={styles.removeBtn}
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
  );


}




const CheckoutCard = ({id, color, size, image, c, name, price, link, loggedin, category, quantity,updateQuantityAdd, total, } ) => {

    
    
  
    // Update item quantity
    const updateQuantity = (id, amount) => {

      console.log(id, amount, size, color, );
      

          if (!loggedin) {
      // GUEST LOGIC: Save to Session / LocalStorage
      const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;
      const existingItem = updatedCart?.find(item => item.productId === id && item?.color === color && item?.size === size );

      
      if (existingItem) {
        existingItem.quantity += amount;

        AlertSuccess('succesfully added to cart');
      } 


      localStorage.setItem('guest_cart', JSON.stringify(updatedCart));
    } else {
      // LOGGED IN LOGIC: Save to Mongoose via API
      try {
          fetch(process.env.REACT_APP_API_LINK + "add/cart", {
              method: "POST",
              credentials: "include",
              headers: { "Content-type": "application/json; charset=UTF-8", },
              body: JSON.stringify({
                productId: id,
                quantity: amount,
                size: size, 
                color: color,
                category: category,
                // color: selectedColor,

              }),
  
            }).then((res) => {
              if (res.status === 200) {
                          AlertSuccess('succesfully added to cart');

                        //  navcart(loggedin)

      const event = new CustomEvent('cart-updated', { detail: loggedin });
      window.dispatchEvent(event);
                       
              } else {
                                AlertError('Error updating  cart:');

              }
            })

      
      } catch (err) {
        console.error('Error updating database cart:', err);
                AlertError('Error updating database cart:', err);

      }
    }
        // const event = new CustomEvent('cartUpdated');
        //                window.dispatchEvent(event);


      const event = new CustomEvent('cart-updated', { detail: loggedin });
      window.dispatchEvent(event);
    };
  
    // Remove item from cart
    const removeItem = () => {

            
      console.log(id, size, color, );

      if (!loggedin) {
      // GUEST LOGIC: Save to Session / LocalStorage
      const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;


      const existingItem = updatedCart?.filter(item => 
            !(
        item.productId === id &&
        item.color === color &&
        item.size === size
    ) )
    //item.productId !== id && item?.color !== color && item?.size !== size );
            
  

      if (existingItem) {

        AlertSuccess('succesfully removed cart');
      } 


      localStorage.setItem('guest_cart', JSON.stringify(existingItem));
    } else {
      // LOGGED IN LOGIC: Save to Mongoose via API
      try {
          fetch(process.env.REACT_APP_API_LINK + "delete/cart", {
              method: "DELETE",
              credentials: "include",
              headers: { "Content-type": "application/json; charset=UTF-8", },
              body: JSON.stringify({
              productId: id,
                size: size, 
                color: color,
                // color: selectedColor,

              }),
  
            }).then((res) => {
              if (res.status === 200) {
                          AlertSuccess('succesfully removed cart');

                const event = new CustomEvent('cart-updated', { detail: loggedin });
                window.dispatchEvent(event);


                       
              } else {
                                AlertError('Error updating  cart:');

              }
            })

        // const updatedDbCart = await response.json();
                    
          // AlertSuccess('succesfully added to cart');

        // setCart(updatedDbCart.items);
      } catch (err) {
        console.error('Error updating database cart:', err);
                AlertError('Error updating database cart:', err);

      }
    }
        // const event = new CustomEvent('cartUpdated');
        //                window.dispatchEvent(event);


      const event = new CustomEvent('cart-updated', { detail: loggedin });
      window.dispatchEvent(event);
    };


  return (
 
              <li key={id} className={Style.item}>

                <div style={{alignItems: 'center', display: 'flex'}} >
                <img src={image} alt={name} className={styles.itemImage} />
                
                <span className={Style.name}>  {name} :  <span className={Style.qty} style={{color: color}}> X{quantity} </span>
                 <p> size: ({c}) </p>
</span> 
                </div>

                <strong>€{total?.toFixed(2)}</strong>
              </li>

  );


}


const OrderCard = ({id, size, image, images, name, price, link, delivery} ) => {
  return (
    <div className={Style.order_card}>

      <Link to={link}>
        <div className={Style.order_card_img} >

          {images?.slice(0,4)?.map((p) => (
              <img src={p.productId?.img[0].url} alt={name} />

          ))}

        </div>
      <h4> order no: {name}</h4>

      <p> €{price}</p>
        <h5> status: {delivery} </h5>

            <button>View Order</button>   


    
            
    </Link>

    </div>
  );
}



const OrderCardAdmin = ({id, size, image, pay, payColor, name, price, link, style, status, images, delivery, order,  } ) => {
  return (
    <div className={Style.order_card}>

      <Link to={link}>
        <div className={Style.order_card_img} >

          {images?.slice(0,4)?.map((p) => (
              <img src={p.productId?.img[0].url} alt={name} />

          ))}

        </div>
        <h3> name: {name}</h3>

      <h4> order no: {order}</h4>

      <p> €{price}</p>
      <p className={Style.pay} style={{color: payColor}}> payment: {pay}</p>

        <h5> status: {delivery} </h5>

 {/* <div className={Style.orderbtn}>
            <button className={Style.view}>View Order</button>
        <button style={style} className={Style.status}> {status} </button>
    </div> */}
            <button>View Order</button>   


    
            
    </Link>

    </div>
  );
}




const CatList = ({name,  img, id, link}) => {




    return (

 
       <div className={Style.cat}>
            <Link to={link}>

                <div className={Style.card}>
                <img className={Style['card-bg-img']} src={img} alt="" />
            
           
            <div className={Style['card-overlay']}>
              <h2 className={Style['card-title']}>{name}</h2>
            </div>
          </div>

            </Link>
  
        </div>
    )
}



const CardList = ({logo, name, category, to}) => {

    const link = name?.replaceAll(' ','-')


    return (
        <Link to={"/" + to + "/" + link} className={Style.a} >

        <div className={Style.main} >

        <div className={Style.logo}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={logo} />

        </div>
                

            
        <div className={Style.name}>

            <h3 > {category} </h3>

            <h2 >  {name}  </h2>
        </div>    
        


        </div>



        </Link>
        

    )
}


const CardList2 = ({logo, name, category, to}) => {

    const link = name.replaceAll(' ','-')


    return (
        <Link to={"/" + to + "/" + link} className={Style.a2} >

        <div className={Style.main2} >

        <div className={Style.logo2}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={logo} />

        </div>
                

            
        <div className={Style.name2}>

            <h3 > {category} </h3>

            <h2 >  {name}  </h2>
        </div>    
        


        </div>



        </Link>
        

    )
}



const CardList3 = ({logo, name, category, to, link,}) => {


    return (
        <Link to={ to + "/" + link  } className={Style.a3} >

        <div className={Style.main3} >

        <div className={Style.logo3}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                {/* <img src={logo} /> */}
                <FontAwesomeIcon icon={logo} />

        </div>
                

            
        <div className={Style.name3}>

            <h3 > {category} </h3>

            <h2 className={Style.cat}> {category} </h2>


            <h2 >  {name}  </h2>
        </div>    
        


        </div>



        </Link>
        

    )
}


const CardList3Edit = ({logo, name, category, to, link, id}) => {


  const idLink =id?.replaceAll('-',' ')



  return (
      <Link to={ to + "/" + link + "/" + idLink } className={Style.a3} >

      <div className={Style.main3} >

      <div className={Style.logo3}>
              {/* <img src={info?.imgUrl} alt=""/> */}
              {/* <img src={logo} /> */}
              <FontAwesomeIcon icon={logo} />

      </div>
              

          
      <div className={Style.name3}>

          <h3 > {category} </h3>

          <h2 className={Style.cat}> {category} </h2>


          <h2 >  {name}  </h2>
      </div>    
      


      </div>



      </Link>
      

  )
}






const CardList4 = ({logo, name, category, link}) => {

  const to = link.replaceAll(' ','-')


  return (
      <Link to={ to } className={Style.a4} >

      <div className={Style.main4} >

      <div className={Style.logo4}>
              {/* <img src={info?.imgUrl} alt=""/> */}
              <img src={logo} />

      </div>
     
              

          
      <div className={Style.name4}>

          <h3 > {category} </h3>

          <h2 >  {name}  </h2>
      </div>    
      


      </div>



      </Link>
      

  )
}





const PlayerBio = ({answer, topic,}) => {

    return (
        <div className={Style.biostat} >

    
            <h1 > {answer} </h1>

            <h3 >  {topic}  </h3>
        


        </div>


        

    )
}




const AlertSuccess = (message) => {


  return (
    toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    })




  
      

  )
}





const AlertError = (message ) => {


  
  return   toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    })
  
  
}





export {CardList, CartCard, CatList, ProductCard, OrderCard, PlayerBio, CheckoutCard, OrderCardAdmin, CardList2, CardList3, CardList3Edit, CardList4, HorizontalScroll, Inputs, AlertError, AlertSuccess }