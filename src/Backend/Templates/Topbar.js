import React from "react";
import { BrowserRouter, Route, Routes, Link, useNavigate, Outlet, } from 'react-router-dom';

function Topbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token_admin"); 
         navigate('/admin')
      }
    return (
      <>    
       <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

<button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
    <i className="fa fa-bars"></i>
</button>

{/*<form style={{ textAlign:"right"}} className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <h4> Welcome to Ticket Booking System</h4>
    
    </form>*/}

<ul className="navbar-nav ml-auto">
   
    <div className="topbar-divider d-none d-sm-block"></div>

    <li className="nav-item dropdown no-arrow">
        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
            <img className="img-profile rounded-circle"
                src="img/undraw_profile.svg"/>
        </a>
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown">
            <div className="dropdown-divider"></div>
            
            <a onClick={handleLogout} className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
            </a>
           
        </div>
    </li>

</ul>

</nav>
      
      </>
    );
}

export default Topbar;