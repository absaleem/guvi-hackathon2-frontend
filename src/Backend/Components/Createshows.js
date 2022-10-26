import React,{useState,useEffect} from "react";
import Sidebar from '../Templates/Sidebar';
import Topbar from '../Templates/Topbar';
import Footer from '../Templates/Footer';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Createshows(){
    const navigate = useNavigate();
    
    let formValues={
        show_id: "",
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
      const [userdata,setUserdata]=useState([]);
      const [options, setOptions] = useState([]);
      const [loading, setLoading] = useState(true);
     
      async function countShows(){
        const countresponse= await axios.get("http://localhost:3001/ticketbooking/showsCount");
        setFormdata({...formData, show_id:countresponse.data.countsData});
        }

      useEffect(() => {

        async function getData(){
          setLoading(true);
            try {  
            const response=await axios.get("http://localhost:3001/ticketbooking/listShows");
            setUserdata(response.data);  
            //console.log(response.data);
            }catch(error){
            }
            setLoading(false);
        }
        
      
       
       //call user data when loading the file 
          getData();
          countShows();       
        },[]);
     
        const convertISODATETIME=(str)=>{
          const event = new Date(str); //console.log(event.toISOString());
          return (event.toISOString());
        }
        const convertTime12to24 = (time12h) => {
          const [time, modifier] = time12h.split(' ');
        
          let [hours, minutes] = time.split(':');
        
          if (hours === '12') {
            hours = '00';
          }
        
          if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
          }
        
          return `${hours}:${minutes}:00`;
        }
      const convertdatetodbdate = (dt) => {
          const [date1, month1, year1] = dt.split('-');
          return `${year1}-${month1}-${date1}`;
        }
        
      const listDatas= async function getData(){
        setLoading(true);
          try {  
          const response=await axios.get("http://localhost:3001/ticketbooking/listShows");
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
           const response=await axios.post("http://localhost:3001/ticketbooking/createShows",{"show_details":{
            show_id:parseInt(formData.show_id),
            theatre_id:parseInt(formData.theatre_id),
            movie_id:parseInt(formData.movie_id),
            show_date_time:convertISODATETIME(formData.show_date_time), 
          }
          });
         
          setFormdata(formValues);
          toast(response.data.msg);     
          listDatas();
          countShows();
    
        }catch(error){
      
        }
        setLoading(false);
        } 
      }
      const handleProceed = (id,status) => {
        if(status==1){  navigate(`/Editshows/${id}`); }else{  }
      };
    
      async function onDeleteData(id){
        setLoading(true);
        try {
        const responseData=await axios.delete(`http://localhost:3001/ticketbooking/deleteShows/${id}`);
        toast(responseData.response.data.msg);     
        listDatas(); countShows();
        }catch(error){
          toast(error.response.data.msg);     
        }
        setLoading(false);
      }  
 
        async function getTheatres(){
        const listTheatresdata= await axios.get("http://localhost:3001/ticketbooking/listTheatres");
           listTheatresdata.data.length > 0 && listTheatresdata.data.map((item) => {
            //setOptions({id: item.theatre_id, name: item.theatre_name});
	     });   
        }
        
       const getDatatimeformated = (datetime) => {
            let date = new Date(datetime);
            let datestring = date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() 
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return datestring +" "+strTime;            
        }
       
    return (
        <div id="wrapper">
 <Sidebar/>  
 <div id="content-wrapper" className="d-flex flex-column">
 <div id="content">
    <Topbar/>

<div className="container-fluid">

<div className="d-sm-flex align-items-right justify-content-between mb-4">
    <h1 className="h3 mb-0 text-gray-800">Create Shows</h1>
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
                                                            <label for="show_id">Show ID</label>
                                                            <input readOnly type='text' className="form-control" id="show_id" name="show_id" value={formData.show_id} />
                                                        </div><br/>
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
                                                                <option value={2}>Sardar</option>
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
                            <div className="row">
                            <div className="col-lg-12">
         <h2>List Shows</h2>
      
         
  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">  
   <thead>
     <tr>
       <th>Theatre name</th>
       <th>Movie name</th>
       <th>Show Date & time</th>
       <th>Action</th>
       </tr>
       </thead> 
       <tbody>   
       {userdata ? (
         userdata.map((row) => (   
        
       <tr key={row._id}>
       <td>{row.shows_theatre_data.theatre_name}</td>
       <td>{row.movies_data.movie_name}</td>
       <td>{getDatatimeformated(row.show_date_time)}</td>
       <td>
          <button className="btn btn-primary btn-sm" style={{margin:"2px"}}  onClick={(e)=>handleProceed(row._id,1)}><i className="fas fa-edit"></i></button>&nbsp;<br/>
          <button className="btn btn-primary btn-sm" style={{margin:"2px"}} onClick={()=>onDeleteData(row._id)}><i class="fas fa-trash"></i></button>
       </td>
       </tr>
     )))
     :" Loading..." }
     </tbody>
    </table>

                            </div>
                            </div>                            
                            </div>

    <Footer/>
    </div> 
       </div> 
    </div>
    );
}

export default Createshows;