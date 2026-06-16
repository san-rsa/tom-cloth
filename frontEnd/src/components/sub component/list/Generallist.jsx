import React, { useState, useEffect, useRef, useContext  } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/General.module.css"
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

const Inputs = ({label, type, name, onchange, value, disabled, placeholder, required  }) => {



  return (
      <div className={Style.formlist} >
      <label >{label}</label>
      <input type={type} disabled={disabled} name={name} onChange={onchange} value={value} id={name} placeholder={placeholder} required={required} />
      </div>

  )
}


const ProductCard = ({id, color, size, image, name, price, link, loggedin, category} ) => {

       
  const [cart, setCart] = useState([]);

//  const { addToCart } = useCart();

  // const { total } = useContext(CartIcon);



  

  // // Fetch from Mongoose via API
  // const fetchUserCartFromDatabase = async () => {
  //   try {
  //     const response = await  fetch(process.env.REACT_APP_API_LINK + 'getone/user/isloggedin', {
  //                     method: 'GET',
  //                     credentials: "include",
  //                     headers: {'Content-Type': 'application/json'},});

  //     const data = await response.json();
  //     setCart(data.products || []);
  //   } catch (err) {
  //     console.error('Error fetching cart:', err);
  //   }
  // };

  // 2. Add Item Function
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
        updatedCart.push({ productId: id, quantity: 1, size: size, color: color, category: category });

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

      <p>{price}</p>
      </Link>

      <button onClick={() => addToCart({ id: id })} >Add to Cart</button>
    </div>
  );


}



const OrderCard = ({id, size, image, name, price, link} ) => {
  return (
    <div className={Style.order_card}>

      <Link to={link}>
            <img src={image} alt={name} />

      <h4>{name}</h4>

      <p>{price}</p>
      </Link>

    <div className={Style.orderbtn}>
            <button>View Order</button>    </div>
    </div>
  );
}



const OrderCardAdmin = ({id, size, image, name, price, link, style, status, } ) => {
  return (
    <div className={Style.order_card}>

      <Link to={link}>
            <img src={image} alt={name} />

      <h4>{name}</h4>

      <p>{price}</p>
      </Link>

    <div className={Style.orderbtn}>
            <button className={Style.view}>View Order</button>
        <button style={style} className={Style.status}> {status} </button>
    </div>
    </div>
  );
}

const CatList2 = ({name,  img, id}) => {




    return (

 
       <div className="cat">
            <Link to={"/category/" + id}>
              <div className="img">
                    <img src={img} alt="" />
              </div>
              
              <div className="cardText">
                <h2>{name}</h2>
              </div>

            </Link>
  
        </div>
    )
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





export {CardList, CatList, ProductCard, OrderCard, PlayerBio, OrderCardAdmin, CardList2, CardList3, CardList3Edit, CardList4, HorizontalScroll, Inputs, AlertError, AlertSuccess }