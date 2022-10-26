import React,{useState,useEffect} from 'react';
import Sidebar from '../Templates/Sidebar';
import Topbar from '../Templates/Topbar';
import Footer from '../Templates/Footer';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Editshows() {
const navigate = useNavigate();
const params = useParams();

let formValues={
    id:"",
    theatre_id: "",
    movie_id: "",
    show_date_time: "",
    error:{
        theatre_id: "",
        movie_id: "",
        show_date_time: "",
    }
  }
 const [formData,setFormdata]=useState(formValues); 
 const [loading, setLoading] = useState(true);
 
 const convertISODATETIME=(str)=>{
  const event = new Date(str); //console.log(event.toISOString());
  return (event.toISOString());
 }
 const getDatatimeformated = (datetime) => {
 
  return new Date(datetime.slice(0, -1));
         
}

useEffect(() => {
  try{
    async function getData(rowId){
    const response = await axios.get(`http://localhost:3001/ticketbooking/getShows/${rowId}`);
    const response1 = response.data.show_details;
    //console.log(response1);
    setFormdata({...formData,
            id:response1._id,
            theatre_id:response1.theatre_id,
            movie_id:response1.movie_id,
            show_date_time:getDatatimeformated(response1.show_date_time),
    }); 
    }     
    getData(params.id);//call user data when loading the file

  }catch(error){

  }
  
},[]);

const handleChange =(e)=>{
  let error= { ...formValues.error };
  if(e.target.value === ""){
    error[e.target.name]=`${e.target.name} is required`;
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
      const response=await axios.put(`http://localhost:3001/ticketbooking/updateShows/${formData.id}`,{
        show_details:{
            theatre_id:parseInt(formData.theatre_id),
            movie_id:parseInt(formData.movie_id),
            show_date_time:convertISODATETIME(formData.show_date_time),
        }
        });
        toast(response.data.msg);   
        
        setTimeout(() => {
        navigate('/Createshows');
        }, 2000); 
    }catch(error){

    }
    setLoading(false);
    }
 } 

 return (
    <div id="wrapper">
<Sidebar/>  
<div id="content-wrapper" className="d-flex flex-column">
<div id="content">
<Topbar/>

<div className="container-fluid">

<div className="d-sm-flex align-items-right justify-content-between mb-4">
<h1 className="h3 mb-0 text-gray-800">Edit Shows</h1>
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
                                                            <label for="theatre_id">Select Theatre</label>
                                                            <select className="form-control"  name="theatre_id" id="theatre_id" value={formData.theatre_id} onChange={(e) => handleChange(e)} >
                                                                <option value="">Select</option>
                                                                <option value={1}>Jothi Theatres</option>
                                                                <option value={2}>AGS Cinemas</option>
                                                                <option value={3}>Sathyam Cinemas</option>
                                                                <option value={4}>KG Cinemas- Screen</option>
                                                                <option value={5}>Jazz Cinemas LUXE</option>
                                                            </select> 
                                                            <span style={{color:"red"}}> {formData.error.theatre_id}</span>
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="movie_id">Select Movie</label>
                                                            <select className="form-control"  name="movie_id" id="movie_id" value={formData.movie_id} onChange={(e) => handleChange(e)} >
                                                                <option value="">Select</option>
                                                                <option value={1}>Ponniyin Selvan - Part 1</option>
                                                                <option value={2}>Vikrams</option>
                                                            </select> 
                                                            <span style={{color:"red"}}> {formData.error.movie_id}</span>
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="movie_genre">Show Date & Time</label>
                                                            <input type='datetime-local' className="form-control" id="show_date_time" name="show_date_time" rows="3" required placeholder="" value={formData.show_date_time} onChange={(e) => handleChange(e)} />
                                                            <span style={{color:"red"}}> {formData.error.show_date_time}</span>
                                                        </div><br/>
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
                           </div>

<Footer/>
</div> 
   </div> 
</div>
);
}

export default Editshows;