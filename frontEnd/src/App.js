import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from 'react'
import { ToastContainer, toast } from 'react-toastify';


import "./styles/style.css"

import Home from "./pages/Home";

import {Register, Login, ForgetPassword, ResetPassword,  EditUser,} from "./pages/user/security/Security";
import Profile from "./pages/user/Profile";

// import Admin from "./pages/user/admin/Admin";
// import Addadmin from "./pages/admin/sub/admin/Add";
// import Search from "./pages/admin/sub/ResultAdmin";


import 'react-toastify/dist/ReactToastify.css';


import "./styles/style.css"
import News from "./pages/News";


import AdminAdd from "./pages/user/admin/AdminAdd";

import AdminList from "./pages/user/admin/List";
import { Categories, Category, Search, } from "./pages/ListsAll";
import Description from "./pages/Description";





  

function Links() {
 
  return (
 
        <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/news/:id" element={<News />}/>



        <Route path="/user" element={<Profile />}/>

          <Route path="/user/edit" element={<EditUser />}/>





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


        <Route path="/product/:id" element={<Description />}/>






        {/* 
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