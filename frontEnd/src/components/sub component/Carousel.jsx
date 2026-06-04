//  import {Sty} from'bootstrap/dist/css/bootstrap.min.css';
import Bannerlist from "./list/Bannerlist"
import {React, useState, useEffect} from "react";
import Style from "../../styles/Carousel.module.css"
import Slider from "react-slick";




function Fade() {

  const [banner, setbanner] = useState([])

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

  useEffect(() => {
      fetch(process.env.REACT_APP_API_LINK + "getall/banner")
      .then((res) =>  res.json())
      .then((data) => setbanner(data.data));
  }, []);


  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 6000,
    slidesToShow: 2,
    slidesToScroll: 1,
    cssEase: "linear",
    waitForAnimate: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
          {banner.slice(0, 2).map((project) => (

            <div className={Style.carousel} key={project._id}> 
            
              <Bannerlist
                  text={project.text}
                  img={project.imgUrl.url}
                />    
                </div>
            
            
            )   )   }
      </Slider>
    </div>
  );
}

export default Fade;
