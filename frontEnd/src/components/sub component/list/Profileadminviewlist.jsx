import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/admin/Profile.module.css"
import { MininewsEdit } from "./Newslist";
import { CardList4, CatList, OrderCard, OrderCardAdmin, ProductCard } from "./Generallist";
import { FixtureToEdit } from "./Tournamentlist";
import Footer from "../Footer";
import Nav from "../Nav";




const AdminBannerList = () => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/banner/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.newsgrid}  >  


            {data.map((project) => (

                        
            <MininewsEdit
                head={project.head}
                img={project.imgUrl.url}
                category={"banner"}
                link={"./../" + project.head}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}



const AdminCategoryList = () => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/category/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>





         
                    <div className={Style.newsgrid} >



            <div className={Style.cat}>


                
            {data?.map((p) => (

            <CatList 
                key={p.id}
                    name={p.name}
                    price={p.price}
                    img={p.imgUrl?.url}
                    link={'./../' + p.name}

                    />  


  


            )   )   }






     </div>
                    

                    </div>







                    </div>

 

    )
}



const AdminProductList = () => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/clothes/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>





         
                    <div className={Style.newsgrid} >


            <div className={Style['product-grid']}>


                
            {data?.map((p) => (

            <ProductCard
                key={p.id}
                    name={p.name}
                    price={p.size[0]?.price}
                    image={p.img[0]?.url}
                    link={'./../' + p.name}

                    />  


  


            )   )   }






     </div>
                    

                    </div>







                    </div>

 

    )
}

const AdminNewsList = () => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



                {data.map((project) => (

                        
            <MininewsEdit
                head={project.head}
                img={project.imgUrl[0].url}
                link={"./../" + project.head}

                />  


            )   )   }
                    






                    </div>

 

    )
}






const AdminRegionList = () => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/competition/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <CardList4
                name={project.name}
                logo={project.logo[0].url}
                category={"region"}
                link={"./../" + project.name}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}



const AdminSubRegionList = () => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/sub-competition/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <CardList4
                name={project.name}
                logo={project.pictures[0]?.url}
                category={"sub region"}
                link={"./../" + project.name}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}







const AdminMatchRegionList = () => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/competition/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <CardList4
                name={project.name}
                logo={project.logo[0].url}
                category={"region"}
                link={"./../" + project.name+ "/list"}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}



const AdminMatchFixtureList = ({regionid}) => {

    const [data, setData] = useState({})
   

    const [showAll, setShowAll] = useState(false);

    function handleClick() {
      setShowAll(prevShowAll => !prevShowAll);
    }
  


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getone/fixtures/year/" + regionid )
            .then((res) =>  res.json())
            .then((data) => setData(data));
        }, []);


        const show = data && showAll ? data?.fixture : data.fixture?.slice(0, 1);



    




    return (
        <div className={Style.app}>


            <h2 > Fixtures </h2>




                    {show?.map((p) => (

                                        
        <div className={Style.fixture}>

            <h3 > matchday: {p.matchday} </h3>


                    <div className={Style.match} >


                        {p.teams.map((props) => (

                            <FixtureToEdit
                             Hname={props.home?.name}
                             Hlogo={props.home?.logo[0]?.url}
                             Hscore={props.home?.homeScore}

                             date={props.day?.date.slice(0, 10).replaceAll('-','/')} time={props.day?.time}

                             Ascore={props.away?.awayScore}
                             Alogo={props.away?.logo[0]?.url}
                             Aname={props.away?.name}

                            live={props?.live} start={props?.start} 
                            half={props?.half} minutes={props?.time.now}


                            _id={props._id}
                            regionId={data.competition}





                            />  



                        )
                        ) }
                    </div>







                        </div>


                    )   )   }
                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}

                    <button  onClick={handleClick}> {showAll ? "Showless" : "showAll" } </button>





                    </div>


         
                      

   

    )
}










const AdminTeamList = () => {
    const [mode, setInputs] = useState({uncompleted: true, completed: false, });
    const [status, setStatus] = useState('uncompleted');


    // const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle based on your auth state


    const [data, setData] = useState([])

    
//   let navigate = useNavigate()





        useEffect(() => {


          fetch(process.env.REACT_APP_API_LINK + 'getall/orders/' + status , {
            method: 'GET',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
             }).then((res) =>  res.json())
             .then((data) => setData(data.data));
                 
            
              
         },   [status]);





         console.log('====================================');
         console.log(data);
         console.log('====================================');




        const handleChange = (event) => {
            const name = event.target.innerHTML.toLowerCase();
    
            setInputs({complete: false, uncomplete: false, });

            
            setInputs(values => ({...values, [name]: true}))


            console.log('====================================');
            console.log(name);
            console.log('====================================');
            setStatus(name)
          }
            
    
    

         
        

        // useEffect(() => {
        //     fetch(process.env.REACT_APP_API_LINK  + "getall/product")
        //     .then((res) =>  res.json())
        //     .then((data) => setproduct(data.data));
        // }, []);
    
 

    //  useEffect(() => {
    //     fetch(process.env.REACT_APP_API_LINK  + "getone/wishlist/" + link, {
    //         credentials: "include",
    //         headers: { "Content-type": "application/json; charset=UTF-8", },
    //     }).then((res) =>  res.json())
    //     .then((data) =>  {
    //         if (data.data == "true") {
    //             setwish(faX)
    //             setset("active")
    //         } else {
    //             setwish(faHeart)
    //             setset("false")
    //         }
    //     } );
    // }, []);
    //      function wish(e) {
    //         e.preventDefault()
    //         const  mood = wishlist.iconName


    //         if (mood == "heart") {
    //             fetch(process.env.REACT_APP_API_LINK + "add/wishlist", {
    //             method: "POST",
    //             credentials: "include",
    //             headers: {
    //               "Content-type": "application/json",
    //             },
    //             body: JSON.stringify({productId: data._id }),
    //          }).then((res) =>  res.json())
    //          .then( ()=> setwish(faX))



    //         } else {
    //             fetch(process.env.REACT_APP_API_LINK + "del/wishlist", {
    //                 method: "DELETE",
    //                 credentials: "include",
    //                 headers: {
    //                   "Content-type": "application/json",
    //                 },
    //                 body: JSON.stringify({productId: data._id }),
    //              }).then((res) =>  res.json())
    //              .then( ()=> setwish(faHeart))
    //         }



    //    }



    return (
        <div>
         {/* <Nav loggedin={isLoggedIn} /> */}
            <div className={Style.app}>


                <div className={Style.top}>




                        <div className={Style.list}>
            
                    <ul >
                        <li onClick={handleChange} >Uncompleted</li>
                        <li onClick={handleChange}  >Completed</li>
    
                    </ul>
    
            
                </div>
                <hr/>

                <br/>
                </div>

         <div className={Style.section} >

            { mode.uncompleted ?     data === 'not found' ? <p> no order found </p>   : <div className={Style["product-grid"]}>
        {data?.map((p) => (
          <OrderCardAdmin
            key={p._id}
            name={p.userId?.name ? p.userId?.name.first + ' ' + p.userId?.name.last : p.guestId?.name.first + ' ' + p.guestId?.name.last }
            order={p._id}
            price={p.totalCost}
            pay={p?.paymentStatus}
            images={p.products}
            payColor={p.paymentStatus == 'completed' ? 'green' : p.paymentStatus == 'pending' ? '#a1a10a' : p.paymentStatus == 'failed' ? 'red' : null }
            link={'/admin/order/' + p._id}
            delivery={p.Delivered ? 'Delivered' : 'Not yet delivered'}
          />
        ))}
         </div> : null }



        { mode.completed ?   data === 'not found' ? <p> no order found </p> :  <div className={Style["product-grid"]}>
        {data?.map((p) => (
          <OrderCardAdmin
            key={p._id}
            name={p.userId?.name ? p.userId?.name.first + ' ' + p.userId?.name.last : p.guestId?.name.first + ' ' + p.guestId?.name.last }
            order={p._id}
            price={p.totalCost}
            pay={p?.paymentStatus}
            images={p.products}
            link={'/admin/order/' + p._id}
            delivery={p.Delivered ? 'Delivered' : 'Not yet delivered'}
          />
        ))}
         </div>  :null }
            {/* { mode.wishlist ? <ProfileWishlist isLoggedIn={isLoggedIn} />  : null }

            { mode.orders ? <ProfileOrder />  : null }

            { mode.admin ? user.admin ? <ProfileAdmin  /> : user.team ? <TeamAdmin  /> : null : null } */}



         </div>






     </div>

        </div>

    )
}











const AdminAdminList = ({event}) => {

    const [data, setData] = useState([])
   


    useEffect(() => {
     
      if (event.add ) {
        fetch(process.env.REACT_APP_API_LINK  + 'getall/user/', {
          method: "GET",
          credentials: "include",
          headers: {'Content-Type': 'application/json'},
        }  )
        .then((res) =>  res.json())
        .then((data) =>  setData(data.data))

    } else if (event.delete) {

      fetch(process.env.REACT_APP_API_LINK  + 'getall/admin/', {
        method: "GET",
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) =>  res.json())
      .then((data) =>  setData(data.data))

    }

      
      }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <CardList4
                name={project.name.first + " " + project.name.last}
                logo={project.imgUrl?.url}
                category={event.add ? "user" : event.delete ? "admin" : "error no category"}
                link={"./../" + project._id}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}
export {AdminBannerList, AdminCategoryList, AdminProductList, AdminNewsList, AdminRegionList, AdminSubRegionList, AdminAdminList, AdminMatchRegionList, AdminMatchFixtureList, AdminTeamList } 