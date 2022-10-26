import React,{useState,useEffect} from 'react';
import Topbar from '../Templates/Topbar_inner';
import Footer from '../Templates/Footer_inner';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

function Moviedetail() {
const navigate = useNavigate();
const params = useParams();

const handleLogout = () => {
  localStorage.removeItem("token"); 
   navigate('/')
}

  const [formData,setFormdata]=useState({
    id:"",
    movie_id: "",
    movie_name: "",
    movie_genre: "",
    movie_director: "",
    movie_actors: "",
    movie_music: "",
    movie_descripton: "",
    movie_image: "",
  }); 
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  try{
async function getData(rowId){
    const response = await axios.get(`http://localhost:3001/ticketbooking/getMovie/${rowId}`);
    //console.log(response);
    const response1 = response.data.movie_details;
    setFormdata({...formData,
            id:response1._id,
            movie_id:response1.movie_id,
            movie_name:response1.movie_name,
            movie_genre:response1.movie_genre,
            movie_director:response1.movie_director,
            movie_actors:response1.movie_actors,
            movie_music:response1.movie_music,
            movie_descripton:response1.movie_descripton,
            movie_image:response1.movie_image,
    }); 
    }     
    getData(params.id);//call user data when loading the file

  }catch(error){

  }
  
setLoading(false);
},[]);
const handlepagenavigate = () => {
     navigate('/movieshows/'+formData.id+'/'+formData.movie_id)
 }

 return (
    <div id="wrapper">
 <div id="content-wrapper" className="d-flex flex-column">
 <div id="content">
    <Topbar/>

<div className="container-fluid" style={{margin:"20px"}}>

         <div className="row">
                      <div class="col-md-3" style={{flex:"0 0 20.33333%"}}>
                            <img style={{height:"400px"}} class="img-fluid" src={formData.movie_image} />
                        </div>
                        <div class="col-md-3" style={{flex:"0 0 20%"}}>
                        <h1 style={{fontWeight:"bold",color:"black",margin:"10px"}}>{formData.movie_name}</h1>
                        <h4 style={{fontWeight:"bold",color:"black",margin:"10px"}} class="subheading">{formData.movie_genre}</h4>
                        <button onClick={handlepagenavigate} style={{fontWeight:"bold",margin:"10px"}}  className="btn btn-primary">Book your tickets</button>
                        </div>
                        <div class="col-md-6 bg-advertisment-image">
                        </div>
                        
        </div>
        <div className="row">
                        <div class="col-md-8">
                        <h3 style={{fontWeight:"bold",color:"black",margin:"10px"}}>About Movie</h3>
                        <h6 style={{color:"black",margin:"10px"}}>{formData.movie_descripton}</h6>
                        </div>
                        <div class="col-md-8">
                        <h3 style={{fontWeight:"bold",color:"black",margin:"10px"}}>Cast</h3>
                        <h6 style={{color:"black",margin:"10px"}}><b>Actors</b> : {formData.movie_actors}
                        </h6>
                        </div>
                        <div class="col-md-8">
                        <h3 style={{fontWeight:"bold",color:"black",margin:"10px"}}>Crew</h3>
                        <h6 style={{color:"black",margin:"10px"}}><b>Director</b> : {formData.movie_director}</h6>
                        <h6 style={{color:"black",margin:"10px"}}><b>Music director</b> : {formData.movie_music}</h6>
                        </div>
                    
        </div>
        </div>
    <Footer/>
    </div> 
       </div> 
    </div>
);
}

export default Moviedetail;