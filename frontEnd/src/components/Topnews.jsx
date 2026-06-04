import {React, useState, useEffect} from "react";
import Style from "../styles/News.module.css"
import News, {Mininews} from "./sub component/list/Newslist"



const TopNews = () => {

    const [news, setnews] = useState([])


    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/news")
        .then((res) =>  res.json())
        .then((data) => setnews(data.data));
    }, []);



    return (

         <div className={Style.top}> 

            <h1> TOP NEWS</h1>  
          {news.slice(0, 1).map((project) => (

            <div className='' key={project._id}> 
            
              <News
                  head={project.head}
                  img={project.imgUrl[0].url}
                  link={project.head}
                />    
                </div>
            
            
            )   )   }




                {news.slice(1, 5).map((project) => (

                <div className={Style.perone} key={project._id}> 

                <Mininews
                    head={project.head}
                    img={project.imgUrl[0].url}
                    link={project.head}
                    />    
                    </div>


                )   )   }
        </div>
    )
}





export default TopNews