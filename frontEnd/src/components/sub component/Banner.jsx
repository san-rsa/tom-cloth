import {React, useState, useEffect} from "react";
import  "../../styles/banner.css"
import Bannerlist from "./list/Bannerlist"



const Banner = ({ text, img}) => {

    const [banner, setbanner] = useState([])


    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/banner")
        .then((res) =>  res.json())
        .then((data) => setbanner(data.data));
    }, []);



    return (

         <div> 
          {banner.slice(0, -1).map((project) => (

            <div className='' key={project._id}> 
            
              <Bannerlist
                  text={project.head}
                  img={project.imgUrl.url}
                  link={"code-of-conduct"}
                />    
                </div>
            
            
            )   )   }
        </div>
    )
}





export default Banner