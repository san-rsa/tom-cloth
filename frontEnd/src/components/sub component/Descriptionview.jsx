import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import Style from "../styles/Description.module.css"
import styles from "../../styles/Description.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';

import { faBars, faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'



import { ShoppingCart, Heart, BarChart2, Star, Check, HelpCircle } from "lucide-react";
import { AlertError, AlertSuccess, ProductCard } from "./list/Generallist";




function Detailimages({productData,}) {
    
  // {/* Gallery */}


  

    const [selectedImage, setSelectedImage] = useState( productData?.img[0]?.url);

    return (
             
                <div className={styles.mediaBlock}>
                  <div className={styles.thumbnailContainer}>
                    {productData?.img.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(img?.url)}
                        className={`${styles.thumbnailButton} ${selectedImage === img.url ? styles.thumbnailActive : ""}`}
                      >
                        <img src={img.url} alt={`Preview ${index + 1}`} className={styles.thumbnailImage} />
                      </button>
                    ))}
                  </div>
        
                  <div className={styles.heroWindow}>
                    <img src={selectedImage} alt={productData.title} className={styles.heroImage} />
                  </div>
                </div>
    )
}




function Detailbuypanelinfo({productData, loggedin}) {
    
  // {/* Gallery */}

    const [selectedSize, setSelectedSize] = useState({size: productData.size[0].size, price: productData.size[0].price, _id: productData.size[0]._id});
    const [selectedColor, setSelectedColor] = useState(productData?.color[0]);
    const [quantity, setQuantity] = useState(1);  
    const handleQuantityChange = (type) => {
      if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
      if (type === "inc") setQuantity(quantity + 1);
    };
  



  const addToCart = async ({product,}) => {

              console.log(loggedin);

    if (!loggedin) {
      // GUEST LOGIC: Save to Session / LocalStorage
      const updatedCart =   JSON.parse(localStorage.getItem('guest_cart')) || [] ;
      const existingItem = updatedCart?.find(
        
        
        
        item => item.productId === productData?._id && item?.color === selectedColor && item?.size === selectedSize._id );

      if (existingItem) {

            existingItem.quantity += quantity;

        AlertSuccess('succesfully added to cart');
      } else {
        updatedCart.push({ productId: productData._id, quantity: quantity, size: selectedSize._id, color: selectedColor, category: productData.categoryId[0] });

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
                productId: productData._id,
                quantity: quantity,
                size: selectedSize._id, 
                color: selectedColor,
                category: productData.categoryId[0],

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

  };

    return (
             
        <div className={styles.buyPanel}>
          <h1 className={styles.title}>{productData.name}</h1>
          
          {/* <div className={styles.metricsPanel}>  ratings
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <button className={styles.reviewLink}>Be the first to review this product</button>
            <span className={styles.dividerPipe}>|</span>
            <span className={styles.sku}>SKU: {productData.sku}</span>
          </div> */}

          <div className={styles.priceSection}>
            {/* <div className={styles.priceDisplay}>${productData.size[0].price.toFixed(2)}</div> */}
            <div className={styles.priceDisplay}>€{selectedSize.price.toFixed(2)}</div>
            <div className={styles.stockBadge}>

              <Check size={14} /> In stock & ready to ship
            </div>
          </div>

          <div className={styles.selectorsGroup}>
            {/* Sizes */}
            <div>
              <div className={styles.selectorLabelRow}>
                <span className={styles.groupLabel}>Size: <span className={styles.labelValue}>{selectedSize.size}</span></span>
                <button className={styles.textActionLink}>
                  {/* <HelpCircle size={12} /> Size Guide */}
                </button>
              </div>
              <div className={styles.sizeGrid}>
                {productData.size.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize({size: size.size, price: size.price, _id: size._id})}
                    className={`${styles.sizeBox} ${selectedSize.size === size.size ? styles.sizeBoxActive : ""}`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <span className={styles.groupLabel}>
                Color: <span className={styles.labelValue}>{selectedColor}</span>
              </span>
              <div className={styles.colorGrid}>
                {productData.color.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`${styles.colorCircle} ${selectedColor === color ? styles.colorCircleActive : ""}`}
                    title={color}
                  >
                    {selectedColor === color && <span className={styles.checkmark}>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className={styles.groupLabel}>Qty</span>
              <div className={styles.qtyContainer}>
                <button onClick={() => handleQuantityChange("dec")} className={`${styles.qtyBtn} ${styles.qtyBtnLeft}`}>-</button>
                <div className={styles.qtyDisplay}>{quantity}</div>
                <button onClick={() => handleQuantityChange("inc")} className={`${styles.qtyBtn} ${styles.qtyBtnRight}`}>+</button>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className={styles.actionSuite}>
            <button onClick={addToCart} className={styles.addToCartBtn}>
              <ShoppingCart size={18} /> Add to Cart
            </button>

            <div className={styles.metaActionsRow}>
              <button className={styles.metaBtn}>
                <Heart size={16} /> ADD TO WISH LIST
              </button>
              <button className={`${styles.metaBtn} ${styles.metaBtnCompare}`}>
                <BarChart2 size={16} /> ADD TO COMPARE
              </button>
            </div>
          </div>

        </div>
    )
}






export { Detailimages, Detailbuypanelinfo, }






