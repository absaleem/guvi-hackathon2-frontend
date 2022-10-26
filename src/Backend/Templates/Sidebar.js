import React from 'react';
import {  Link } from 'react-router-dom';

function Sidebar() {
  return (
    <>
     
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <Link to="/Dashboard" className="sidebar-brand d-flex align-items-center justify-content-center">
            {/*<div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
                </div>*/}
            <div className="sidebar-brand-text mx-3">Admin <sup></sup></div>
      </Link>  

        <hr className="sidebar-divider my-0"/>
      
        <li className="nav-item active">
        <Link to="/Dashboard" className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
                </Link>        
        </li>

        <hr className="sidebar-divider"/>

        <li className="nav-item">
                
                <Link to="/Createtheatre" className="nav-link"><i className="fas fa-building"></i>
                <span>Theatres</span></Link>
                
        </li>
        <li className="nav-item">
                
                <Link to="/Createmovie" className="nav-link" ><i className="fas fa-video"></i>
                <span>Movies</span>
                </Link>
                
        </li>

        <li className="nav-item">
                <Link to="/Createshows" className="nav-link" ><i className="far fa-clock"></i>
                <span>Shows</span></Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block"/>

        <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

        <div className="sidebar-card d-none d-lg-flex">
            <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..."/>
        </div>
    </ul>
 
    </>
  );
}

export default Sidebar;
