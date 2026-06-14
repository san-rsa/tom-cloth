 import {React, useState, useEffect} from "react";
 import "../../styles/style.css";
import Style from "../..//styles/General.module.css"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";
import { ProductCard } from "./list/Generallist";


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
      

    console.log( process.env.REACT_APP_API_LINK)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/product")
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

            {products?.map((project) => (
 

              <div className={Style.trend}>
                <ProductCard
               id={project._id}
              price={project.price}
              name={project.name}
              image={project.image}
              link={'/product/' + product.name}
              // size={project.size[0]._id}
        /> 
              </div>


            )   )   }      
            </Slider>

</div>
        </div>
  );
}

export default Trending;



