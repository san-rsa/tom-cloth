import {React, useState, useEffect} from "react";
import Style from "../styles/News.module.css"
import News, {Mininews3, Minivideo} from "./sub component/list/Newslist"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";





const Highlight = () => {

    const [banner, setbanner] = useState([])

    
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
      if (screenSize.width <= 900) {
        setwidth(2)
      } else if (screenSize.width <= 700) {
        setwidth(1)
      } else {
        setwidth(4)
      }
    }
  





    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/banner")
        .then((res) =>  res.json())
        .then((data) => setbanner(data.data));
    }, []);




    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: width,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,

        cssEase: "linear",

      };
    


    return (

         <div className={Style.top}> 
            <h1> HIGHLIGHT</h1>  

    
        <div className="slider-container">
          <Slider {...settings}>
    
                     {banner.map((project) => (

                <div className={Style.perone} key={project._id}> 

                <Minivideo
                    text={project.text}
                    img={project.imgUrl.url}
                    />    
                    </div>


                )   )   }
                </Slider>
    
    </div>
     


        </div>
    )
}





const Awards = () => {

    const [banner, setbanner] = useState([])

    
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
      if (screenSize.width <= 900) {
        setwidth(2)
      } else if (screenSize.width <= 700) {
        setwidth(1)
      } else {
        setwidth(4)
      }
    }
  





    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/banner")
        .then((res) =>  res.json())
        .then((data) => setbanner(data.data));
    }, []);




    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: width,
        slidesToScroll: 1,
        autoplay: false,
        speed: 500,

        cssEase: "linear",

      };
    


    return (

         <div className={Style.top}> 
            <h1> Awards</h1>  

    
        <div className="slider-container">
          <Slider {...settings}>
    
                     {banner.map((project) => (

                <div className={Style.perone} key={project._id}> 

                <Mininews3
                    text={project.text}
                    img={project.imgUrl.url}
                    link={project.text}
                    />    
                    </div>


                )   )   }
                </Slider>
    
    </div>
     


        </div>
    )
}




export {Highlight, Awards}