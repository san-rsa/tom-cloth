import Banner from "../components/sub component/Banner";
import Coming from "../components/sub component/Coming";
import Nav from "../components/sub component/Nav";
import Homet from "../components/HomeT";
import {Highlight, Awards} from "../components/Category"
import Carousel from "../components/sub component/Carousel"
import "../styles/style.css"
import TopNews from "../components/Topnews";
import Homehighlight from "../components/Homehighlight";
import { Mininews2, Mininews3 } from "../components/sub component/list/Newslist";
import Footer from "../components/sub component/Footer";
import {Competition, Team} from "../components/HCompetition";




function App() {
  return (
    <div>
           
        <Nav />
        <Coming/>

        <TopNews />

         {/* <Highlight /> */}
        {/* <Awards /> */}

        {/* <Homet /> */}

        
           
       
                          {/* <Carousel /> */}

{/* 
            <Banner /> */}

              {/* <Category /> */}

              {/* <Slist /> */}

              <Competition />

              <Team />


              <Footer />
    </div>
  );
}

export default App;
