import React,{useState,useEffect} from "react";
import Sidebar from '../Templates/Sidebar';
import Topbar from '../Templates/Topbar';
import Footer from '../Templates/Footer';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Createmovie(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token_admin");
    
    let formValues={
        movie_id: "",
        movie_name: "",
        movie_genre: "",
        movie_director: "",
        movie_actors: [],
        movie_music: "",
        movie_descripton: "",
        movie_image: "",
        error:{
            movie_name: "",
            movie_genre: "",
            movie_director: "",
            movie_actors: [],
            movie_music: "",
            movie_descripton: "",
            movie_image: "",
        }
      }
      const [formData,setFormdata]=useState(formValues); 
      const [userdata,setUserdata]=useState([]);
      const [loading, setLoading] = useState(true);

      async function countMovies(){
        const countresponse= await axios.get("http://localhost:3001/ticketbooking/moviesCount");
        setFormdata({...formData, movie_id:countresponse.data.countsData});
        }
      
      useEffect(() => {

        async function getData(){
          setLoading(true);
            try {  
            const response=await axios.get("http://localhost:3001/ticketbooking/listMovies");
            setUserdata(response.data);  
            }catch(error){
            }
            setLoading(false);
        }
        
        getData();//call user data when loading the file
        countMovies();
        },[]);
        
      const listDatas= async function getData(){
        setLoading(true);
          try {  
          const response=await axios.get("http://localhost:3001/ticketbooking/listMovies");
          setUserdata(response.data);  
          }catch(error){
          }
          setLoading(false);
      }
      

      const handleChange =(e)=>{
        let error= { ...formValues.error };
        if(e.target.value === ""){
          error[e.target.name]=`${e.target.placeholder} is required`;
        }else{
          error[e.target.name]=""; 
        }
        setFormdata({...formData, [e.target.name]:e.target.value, error});
      }
      
      const handleSubmit= async (e)=>{
        e.preventDefault();
      
        const errorkeys=Object.keys(formData).filter((key)=>{
          if(formData[key] === "" && key!='error'){
            return key;
          }
        });
        
        if(errorkeys.length>0){
          alert('pls fill all the fields');
        }else{
          setLoading(true);
          try {
           const response=await axios.post("http://localhost:3001/ticketbooking/createMovie",{"movie_details":{
            movie_id:formData.movie_id,
            movie_name:formData.movie_name,
            movie_genre:formData.movie_genre,
            movie_director:formData.movie_director,
            movie_actors:formData.movie_actors,
            movie_music:formData.movie_music,
            movie_descripton:formData.movie_descripton,
            movie_image:formData.movie_image,
          }
          });
         
          setFormdata(formValues);
          toast(response.data.msg);    
          listDatas();
          countMovies();
    
        }catch(error){
      
        }
        setLoading(false);
        } 
      }
      const handleProceed = (id,status) => {
        if(status==1){  navigate(`/Editmovie/${id}`); }else{  }
      };
    
      async function onDeleteData(id){
        setLoading(true);
        try {
        const response = await axios.delete(`http://localhost:3001/ticketbooking/deleteMovie/${id}`);
        toast(response.data.msg);    
        listDatas();
        countMovies();
        }catch(error){
    
        }
        setLoading(false);
      }  
        
               
    return (
        <div id="wrapper">
 <Sidebar/>  
 <div id="content-wrapper" className="d-flex flex-column">
 <div id="content">
    <Topbar/>

<div className="container-fluid">

<div className="d-sm-flex align-items-right justify-content-between mb-4">
    <h1 className="h3 mb-0 text-gray-800">Create Movie</h1>
</div>

<div className="row">
<div className="col-lg-12">
                                <div id="default">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <div className="sbp-preview">
                                                <div className="sbp-preview-content">
                                                <div>
                                                  <ToastContainer />
                                                </div>
                                                <form  onSubmit={(e)=>handleSubmit(e)}>
                                                <div className="mb-0">
                                                            <label for="movie_id">Movie ID</label>
                                                            <input readOnly type='text' className="form-control" id="movie_id" name="movie_id" value={formData.movie_id} />
                                                        </div><br/>
                                              
                                                        <div className="mb-0">
                                                            <label for="movie_name">Movie name</label>
                                                            <input className="form-control" id="movie_name" name="movie_name" type="text" value={formData.movie_name}  onChange={(e) => handleChange(e)}  placeholder="movie name" required/>
                                                            <span style={{color:"red"}}> {formData.error.movie_name}</span>
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="movie_genre">Movie Genre</label>
                                                            <textarea className="form-control" id="movie_genre" name="movie_genre" rows="3" required placeholder="Movie Genre" value={formData.movie_genre} onChange={(e) => handleChange(e)}>{formData.movie_genre}</textarea>
                                                            <span style={{color:"red"}}> {formData.error.movie_genre}</span>
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="movie_director">Movie Director</label>
                                                            <input className="form-control" id="movie_director" name="movie_director" type="text" value={formData.movie_director}  onChange={(e) => handleChange(e)}  placeholder="movie director" required/>
                                                            <span style={{color:"red"}}> {formData.error.movie_director}</span>
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="movie_actors">Movie Actors</label>
                                                            <textarea className="form-control" id="movie_actors" name="movie_actors" rows="3" required placeholder="Movie Actors" value={formData.movie_actors} onChange={(e) => handleChange(e)}>{formData.movie_actors}</textarea>
                                                            <span style={{color:"red"}}> {formData.error.movie_actors}</span>
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="movie_music">Movie Music</label>
                                                            <input className="form-control" id="movie_music" name="movie_music" type="text" placeholder="Movie Music" value={formData.movie_music}  onChange={(e) => handleChange(e)} required/>
                                                        </div><br/>
                                                        <span style={{color:"red"}}> {formData.error.movie_music}</span>
                                                        <div className="mb-0">
                                                            <label for="movie_descripton">About Movie</label>
                                                            <textarea className="form-control" id="movie_descripton" name="movie_descripton" rows="3" value={formData.movie_descripton}  placeholder="About Movie" onChange={(e) => handleChange(e)} required>{formData.movie_descripton}</textarea>
                                                            <span style={{color:"red"}}> {formData.error.movie_descripton}</span>
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="movie_image">Movie Picture Link</label>
                                                            <input className="form-control" id="movie_image" name="movie_image" type="text" placeholder="Movie Picture Link" value={formData.movie_image}  onChange={(e) => handleChange(e)} required/>
                                                        </div><br/>
                                                        <span style={{color:"red"}}> {formData.error.movie_image}</span>
                                                        <div className="mb-0"><br/>
                                                        <button class="btn btn-primary btn-lg" type="submit">Save</button>
                                                        </div>
                                                    </form>
                                                </div>
                                                </div>   
                                                
                            </div>
                            </div>
                            </div>   
                            </div>
                            </div>  
                            <div className="row">
                            <div className="col-lg-12">
         <h2>List Movies</h2>
         {loading && <div className='loading'>Loading</div>}
    {!loading && (
         
  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">  
   <thead>
     <tr>
       <th>Name</th>
       <th>Genre</th>
       <th>Director</th>
       <th>Actors</th>
       <th>Music</th>
       <th>Action</th>
       </tr>
       </thead> 
       <tbody>   
       {userdata ? (
         userdata.map((row) => (   
       <tr key={row._id}>
       <td>{row.movie_name}</td>
       <td>{row.movie_genre}</td>
       <td>{row.movie_director}</td>
       <td>{row.movie_actors}</td>
       <td>{row.movie_music}</td>
       <td>
          <button className="btn btn-primary btn-sm" style={{margin:"2px"}}  onClick={(e)=>handleProceed(row._id,1)}><i className="fas fa-edit"></i></button>&nbsp;<br/>
          <button className="btn btn-primary btn-sm" style={{margin:"2px"}} onClick={()=>onDeleteData(row._id)}><i class="fas fa-trash"></i></button>
       </td>
       </tr>
     )))
     :" Loading..." }
     </tbody>
    </table>
    )}
                            </div>
                            </div>                            
                            </div>

    <Footer/>
    </div> 
       </div> 
    </div>
    );
}

export default Createmovie;