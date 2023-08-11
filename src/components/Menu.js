import { faHomeAlt, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Products from './Products';
import Home from './Home';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

function Menu() {

    const [currentRoute,setCurrentRoute] =useState();
    useEffect(()=>{
      const path=window.location.pathname.toLowerCase();
      if(path.length===1){
        setCurrentRoute("home");
      }else{
        setCurrentRoute(path.slice(1,path.length));
      }
      
    },[])
  return (
    <BrowserRouter>

      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
              onClick={()=>setCurrentRoute("home")}
              className={currentRoute==='home'? 'nav-link  joinBtn':'nav-link '} 
              to={"/Home"}><FontAwesomeIcon icon={faHomeAlt}></FontAwesomeIcon> Home</Link>
            </li>
            <li className="nav-item">
              <Link
              onClick={()=>setCurrentRoute("listProduct")} 
              className={currentRoute==='listProduct'? 'nav-link joinBtn':'nav-link'} 
              to={"/listProduct"}><FontAwesomeIcon icon={faListCheck}></FontAwesomeIcon> All Product</Link>
            </li>
          </ul>
        </div>

      </nav>
      <Routes>

        <Route path='/home'  element={<Home />}>Home</Route>
        <Route path='/listProduct' element={<Products />} >Product</Route>
        <Route path='/addProduct' element={<AddProduct />}>Add Product</Route>
        <Route path='/' element={<Home/>} >Home</Route>
        <Route path='/editProduct/:id' element={<EditProduct/>} ></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default Menu;