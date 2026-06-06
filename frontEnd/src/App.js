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
import { Categories, Category, Competitions, Search, Teams } from "./pages/ListsAll";





  

function Links() {
 
  return (
 
        <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/video/:id" element={<Video />}/>
        <Route path="/news/:id" element={<News />}/>



        <Route path="/user" element={<Profile />}/>


        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />




        <Route path="/user/:event/:type" element={<AdminAdd />}/>
        <Route path="/user/:event/:type/list" element={<AdminList />}/>
        <Route path="/user/:event/:type/:typeId" element={<AdminAdd />}/>

        <Route path="/user/:event/:type/:typeId/list" element={<AdminList />}/>

        <Route path="/user/:event/:type/:typeId/:matchId" element={<AdminAdd />}/>





        <Route path="/search/:id" element={<Search />}/>

        <Route path="/category" element={<Categories />}/>
        <Route path="/category/:id" element={<Category />}/>








        {/* 
        <Route path="/product/:id" element={<Description />}/>
        <Route path="/list" element={<Menu />}/>


        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/payment" element={<Payment />}/>


        <Route path="/admin" element={<Admin />}/>

        
        <Route path="/admin/addtea/" element={<Addtea />}/>
        <Route path="/admin/edittea/:id" element={<Edittea />}/>
        <Route path="/admin/addadmin" element={<Addadmin />}/>
        <Route path="/order" element={<Orders />}/>
        <Route path="/admin/editbanner/:id" element={<Editbanner />}/>
        <Route path="/admin/addbanner" element={<Addbanner />}/>
        <Route path="/admin/editcategory/:id" element={<Editcategory />}/>
        <Route path="/admin/addcategory" element={<Addcategory />}/>
        <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />} /> */}


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