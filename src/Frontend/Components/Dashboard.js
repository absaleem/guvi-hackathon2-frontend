import React,{useState,useEffect} from "react";
import Topbar from '../Templates/Topbar';
import Footer from '../Templates/Footer';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

function Dashboard(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [moviedata,setmoviedata]=useState([]);
    
    const handleLogout = () => {
        localStorage.removeItem("token"); 
         navigate('/')
     }
       

      useEffect(() => {

       
        async function getData(){
            try {  
            const response=await axios.get("http://localhost:3001/ticketbooking/listMovies");
            setmoviedata(response.data);  
            }catch(error){
            }
        }
         getData();//call user data when loading the file
        },[]);  
               
    return (
        <div id="wrapper">
 <div id="content-wrapper" className="d-flex flex-column">
 <div id="content">
    <Topbar/>

<div className="container-fluid">

<div className="d-sm-flex align-items-right justify-content-between mb-4">
    <h1 className="h3 mb-0 text-gray-800">Recommened Movies</h1>
</div>

<div className="row">
    
                                                    {
                                                        moviedata.map((movie_row) => (
                                                                <div className="col-md-3" style={{flex:"0 0 20%"}} key={movie_row._id}>
                                                                    <Link to={{ pathname: `/moviedetail/${movie_row._id}` }}>
                                                                     <img className="img-fluid img-thumbnail" style={{height:"400px"}} src={movie_row.movie_image} alt="harry potter"/>
                                                                     </Link>
                                                                     <div className="caption">
                                                                    <h4 style={{fontWeight:"bold",color:"black"}}>{movie_row.movie_name}</h4>
                                                                    <h6>{movie_row.movie_genre}</h6>
                                                                 </div>
                                                                </div>
                                                                ))
                                                        
                                                    }
                                               
                            </div>  
                                    
                            </div>

    <Footer/>
    </div> 
       </div> 
    </div>
    );
}

export default Dashboard;