import React,{useState,useEffect} from 'react';
import Topbar from '../Templates/Topbar_inner1';
import Footer from '../Templates/Footer_inner1';
import axios from 'axios';
import { useNavigate,useParams,Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Movieshows(){
  
    const navigate = useNavigate();
    const params = useParams();
    const token = localStorage.getItem("token");
    const [startDate, setStartDate] = useState(new Date());

    const handleLogout = () => {
      localStorage.removeItem("token"); 
       navigate('/')
   }
   
    const [formData,setFormdata]=useState({
      id:'',
      movie_id:'',
      movie_name:'',
      movie_genre:'',
      }); 

    const [showData,setShowdata]=useState([]); 

      async function handleDateSelect(){
        console.log(startDate);
        try {
          const response = await axios.post("http://localhost:3001/ticketbooking/getShowsbydatemovie",{
            movie_id:formData.movie_id,
            search_date:startDate,
          });
          console.log(response);
          if(response){
             // localStorage.setItem("token",response.data);
          }
         } catch (error) {
        }
      }

    useEffect(() => {

      async function getShows(movie_id){
        try {
          const response2 = await axios.get(`http://localhost:3001/ticketbooking/getMovieshows/${movie_id}`);
          if(response2){
            setShowdata(response2.data); 
          }
         } catch (error) {
        }
      }     
        
  async function getData(rowId){
    try{
        const response = await axios.get(`http://localhost:3001/ticketbooking/getMovie/${rowId}`);
          const response1 = response.data.movie_details;
          setFormdata({...formData,
                  id:response1._id,
                  movie_id:response1.movie_id,
                  movie_name:response1.movie_name,
                  movie_genre:response1.movie_genre,
          }); 
          //console.log(response1.movie_id);
        }   
      catch (error) {
       }
      }    
    
      getData(params.id);//call user data when loading the file
      getShows(params.movieid);//call user data when loading the file      
      console.log(params.movieid);
 },[]);

 const getDatatimeformated = (datetime) => {
  let date = new Date(datetime);
  let datestring = date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() 
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;            
}

return (
 <div id="wrapper">
  <div id="content-wrapper" className="d-flex flex-column">
   <div id="content">
    <Topbar/>

    <div className="container-fluid">
      <div style={{backgroundColor:"black",height:"100px"}} >
    <div className="d-sm-flex align-items-right justify-content-between mb-12">
        <h1 className="h3 mb-0" style={{color:"white",fontWeight:"bold",margin:"20px"}}>{formData.movie_name}</h1>
    </div>
    <p style={{color:"white",fontWeight:"bold",margin:"17px"}}>{formData.movie_genre}</p>
    </div>
    <div className="row">
    <div style={{paddingLeft:"500px"}}>    
            <DatePicker 
            onSelect={handleDateSelect} //when day is clicked
            selected={startDate} 
            onChange={(date:Date) => setStartDate(date)} 
            />
     </div>
    <div class="col-md-12">    
    <table className='table'>
      <thead>
      <th></th>
      <th></th>
      </thead>
      <tbody>
       {
       showData.length>0 ? ( 
       showData.map((rows) => (
      <tr key={rows._id}>
         <td style={{width:'100px'}}><h5 style={{color:"black"}}>{rows.theatre_name}</h5><p style={{color:"black"}}>{rows.theatre_city}</p></td>
         <td style={{width:'400px'}}>
          {
          rows.shows.map((rows1) => (
            <button key={rows1._id} style={{padding:"10px",margin:"2px"}} className="btn btn-secondary">{ getDatatimeformated(rows1.show_date_time) }</button>  
          ))          
          }
          </td>
       </tr>
       ))): <button style={{padding:"10px",margin:"20px"}} className="btn btn-danger">No Theatres found</button>
       }
   </tbody>
    </table>

      </div>
    </div>
  
    <Footer/>
    </div> 
   </div> 
  </div>
  </div>
   
    );
}

export default Movieshows;