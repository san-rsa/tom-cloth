import {React, useState, useEffect} from "react";
import  "../../styles/banner.css"
import {SBanner} from "./list/Bannerlist"



const Banner = () => {

    const [banner, setbanner] = useState([])


    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/banner")
        .then((res) =>  res.json())
        .then((data) => setbanner(data.data));
    }, []);



    return (

         <div> 
          {banner.slice(0, 1).map((project) => (

            <div className='' key={project._id}> 
            
              <SBanner
                  head={project.head}
                  img={project.imgUrl.url}
                  body={project.body}
                  link={"/code-of-conduct"}

                />    
                </div>
            
            
            )   )   }
        </div>
    )
}





export default Banner