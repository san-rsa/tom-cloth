import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/admin/Profile.module.css"
import { MininewsEdit } from "./Newslist";
import { CardList4 } from "./Generallist";
import { FixtureToEdit } from "./Tournamentlist";




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



const AdminCodeOfConductList = () => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/code-of-conduct/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>





         
                    <div className={Style.newsgrid} >



                {data.map((project) => (

                        
            <MininewsEdit
                head={project.title}
                // img={project.imgUrl[0].url}
                

                />  


            )   )   }
                    

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





         
                    <div className={Style.newsgrid} >



                {data.map((project) => (

                        
            <MininewsEdit
                head={project.head}
                img={project.imgUrl[0].url}
                link={"./../" + project.head}

                />  


            )   )   }
                    

                    </div>







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

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <CardList4
                name={project.name}
                logo={project.logo[0]?.url}
                category={"team"}
                link={"./../" + project.name}

                />  


            )   )   }


         
                      

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
export {AdminBannerList, AdminCodeOfConductList, AdminNewsList, AdminRegionList, AdminSubRegionList, AdminAdminList, AdminMatchRegionList, AdminMatchFixtureList, AdminTeamList } 