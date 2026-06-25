 import {React, useState, useEffect} from "react";
 import "../../styles/style.css";
import Style from "../..//styles/General.module.css"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";
import { ProductCard } from "./list/Generallist";




function Trending({loggedin}) {


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none", background: "red" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none", background: "green" }}
            onClick={onClick}
          />
        );
      }

      


        const [product, setproduct] = useState([])
        const [width, setwidth] = useState(Number)
        const [screenSize, setScreenSize] = useState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      
        useEffect(() => {
          const handleResize = () => {
            setScreenSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });

            widths()
          };


          widths()

      
          window.addEventListener('resize', handleResize);

      
      
          // Clean up the event listener when the component unmounts
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);

        function widths() {
          if (screenSize.width <= 600) {
            setwidth(2)
          } else if (screenSize.width <= 300) {
            setwidth(1)
          } else {
            setwidth(4)
          }
        }
      


    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/clothes/most-recent")
        .then((res) =>  res.json())
        .then((data) => setproduct(data.data));
    }, []);


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: width,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (

        <div className="trending">

        <h1>LATEST</h1>

    <div className="slider-container">
      <Slider {...settings}>

            {product?.map((product) => (
 

              <div className={Style.trend}>
                <ProductCard
            key={product._id}
            name={product.name}
            price={product?.size[0]?.price}
            image={product?.img[0]?.url}
            link={'/product/' + product.name}
            id={product._id}
            color={product?.color[0]}
            size={product.size[0]?._id}
            loggedin={loggedin}
            category={product?.categoryId[0]}
            c={product.size[0]?.size}
        /> 
              </div>


            )   )   }      
            </Slider>

</div>
        </div>
  );
}

export default Trending;



