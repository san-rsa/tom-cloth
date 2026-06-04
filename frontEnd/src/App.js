import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from 'react'
import { ToastContainer, toast } from 'react-toastify';



import Home from "./pages/Home";
import Codeofconduct from "./pages/Codeofconduct";


import {Register, Login, ForgetPassword, ResetPassword,} from "./pages/user/security/Security";
import Profile from "./pages/user/Profile";

// import Admin from "./pages/user/admin/Admin";
// import Addadmin from "./pages/admin/sub/admin/Add";
// import Search from "./pages/admin/sub/ResultAdmin";


import 'react-toastify/dist/ReactToastify.css';


import "./styles/style.css"
import News from "./pages/News";
import Video from "./pages/Video";
import Team from "./pages/Team";
import Player from "./pages/Player";

import Competition from "./pages/competition/Competition";

import Fixtures from "./pages/competition/Fixtures";
import Fixture from "./pages/competition/match/Fixture";


import Results from "./pages/competition/Results";
import Result from "./pages/competition/match/Result";


// import Lives from "./pages/competition/Lives";


import Stats from "./pages/competition/Stats";
import TeamAdd from "./pages/user/adminteam/TeamAdd";
import AdminAdd from "./pages/user/admin/AdminAdd";

import TeamAdminList from "./pages/user/adminteam/List";
import AdminList from "./pages/user/admin/List";
import { MatchUpdate, MatchUpdateList, ResultUpdate, ResultUpdateList } from "./components/sub component/list/Matchupdateviewlist";
import { Competitions, Teams } from "./pages/ListsAll";





  

function Links() {
 
  return (
 
        <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/video/:id" element={<Video />}/>
        <Route path="/news/:id" element={<News />}/>

        <Route path="/teams" element={<Teams />}/>
        <Route path="/team/:id" element={<Team />}/>


        <Route path="/player/:id" element={<Player />}/>


        <Route path="/regions" element={<Competitions />}/>
        <Route path="/region/:id" element={<Competition />}/>

   
        <Route path="/region/:id/fixture/:matchday/:matchId" element={<Fixture />}/>
        <Route path="/region/:id/result/:matchday/:matchId" element={<Result />}/>

        <Route path="/region/:id/fixture/:matchday/:matchId/update" element={<MatchUpdateList />}/>
        <Route path="/region/:id/fixture/:matchday/:matchId/update/:type" element={<MatchUpdate />}/>


        <Route path="/region/:id/result/:matchday/:matchId/update" element={<ResultUpdateList />}/>
        <Route path="/region/:id/result/:matchday/:matchId/update/:type" element={<ResultUpdate />}/>





        <Route path="/team/:id/:event/:type" element={<TeamAdd />}/>
        <Route path="/team/:id/:event/:type/list" element={<TeamAdminList />}/>
        <Route path="/team/:id/:event/:type/:typeId" element={<TeamAdd />}/>


           {/*

        <Route path="/competition/:id/lives" element={<Lives />}/>
        <Route path="/competition/:id/live/:matchId" element={<Live />}/>


        <Route path="/competition/:id/stats/:type" element={<Stats />}/>
        <Route path="/competition/:id/standing" element={<Standing />}/>
 */}


        <Route path="/user" element={<Profile />}/>

        <Route path="/user/:event/match" element={<Profile />}/>
        <Route path="/user/:event/match/:region" element={<Profile />}/>
        <Route path="/user/:event/match/:region/list" element={<Profile />}/>
        <Route path="/user/:event/match/:region/:matchId" element={<Profile />}/>



        <Route path="/user/:event/:type" element={<AdminAdd />}/>
        <Route path="/user/:event/:type/list" element={<AdminList />}/>
        <Route path="/user/:event/:type/:typeId" element={<AdminAdd />}/>

        <Route path="/user/:event/:type/:typeId/list" element={<AdminList />}/>

        <Route path="/user/:event/:type/:typeId/:matchId" element={<AdminAdd />}/>

        <Route path="/user" element={<Profile />}/>
        
        {/* <Route path="/admin" element={<Admin />}/>

        
        <Route path="/admin/addtea/" element={<Addtea />}/>
        <Route path="/admin/edittea/:id" element={<Edittea />}/>
        <Route path="/admin/addnews/" element={<Addnews />}/>
        <Route path="/admin/editnews/:id" element={<Editnews />}/>
        <Route path="/admin/addadmin" element={<Addadmin />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/admin/editbanner/:id" element={<Editbanner />}/>
        <Route path="/admin/addbanner" element={<Addbanner />}/>
        <Route path="/admin/editcategory/:id" element={<Editcategory />}/>
        <Route path="/admin/addcategory" element={<Addcategory />}/> */}
        <Route path="/code-of-conduct" element={<Codeofconduct />} />


        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />



    </Routes>       

  </BrowserRouter>    
 
  );
}








function App() {
 
  return (
 
    <div >
          <Links />


<ToastContainer />
    </div>

 
 
  );
}
export default App;