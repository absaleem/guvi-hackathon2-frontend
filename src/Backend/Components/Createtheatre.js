import React,{useState,useEffect} from "react";
import Sidebar from '../Templates/Sidebar';
import Topbar from '../Templates/Topbar';
import Footer from '../Templates/Footer';
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Createtheatre(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token_admin");
    
    let formValues={
      theatre_id:"",
      theatre_name:"",
        theatre_address:"",
        theatre_city:"",
        theatre_state:"",
        theatre_pincode:"",
        error:{
            theatre_name:"",
            theatre_address:"",
            theatre_city:"",
            theatre_state:"",
            theatre_pincode:"",
            }
      }
      const [formData,setFormdata]=useState(formValues); 
      const [userdata,setUserdata]=useState([]);
      const [loading, setLoading] = useState(true);

      async function countTheatres(){
        const countresponse= await axios.get("http://localhost:3001/ticketbooking/theatresCount");
        setFormdata({...formData, theatre_id:countresponse.data.countsData});
        }
      

      useEffect(() => {

        async function getData(){
          setLoading(true);
            try {  
            const response=await axios.get("http://localhost:3001/ticketbooking/listTheatres");
            setUserdata(response.data);  
            }catch(error){
            }
            setLoading(false);
        }
        
        getData();//call user data when loading the file
        countTheatres();        
        },[]);
        
      const listDatas= async function getData(){
        setLoading(true);
          try {  
          const response=await axios.get("http://localhost:3001/ticketbooking/listTheatres");
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
           const response=await axios.post("http://localhost:3001/ticketbooking/createTheatre",{"theatre_details":{
            theatre_id:formData.theatre_id,
            theatre_name:formData.theatre_name,
            theatre_address:formData.theatre_address,
            theatre_city:formData.theatre_city,
            theatre_state:formData.theatre_state,
            theatre_pincode:formData.theatre_pincode,
          }
          });
         
          //setUserdata([...userdata, response.data]); 
          setFormdata(formValues);
          toast(response.data.msg);    
          listDatas();
          countTheatres();
        }catch(error){
      
        }
        setLoading(false);
        } 
      }
      const handleProceed = (id,status) => {
        if(status==1){  navigate(`/Edittheatre/${id}`); }else{  }
      };
    
      async function onDeleteData(id){
        setLoading(true);
        try {
        const response= await axios.delete(`http://localhost:3001/ticketbooking/deleteTheatre/${id}`);
        toast(response.data.msg);    
        listDatas();
        countTheatres();
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
    <h1 className="h3 mb-0 text-gray-800">Create Theatre</h1>
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
                                                            <label for="movie_id">Theatre ID</label>
                                                            <input readOnly type='text' className="form-control" id="theatre_id" name="theatre_id" value={formData.theatre_id} />
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="theatre_name">Theatre name</label>
                                                            <input className="form-control" id="theatre_name" name="theatre_name" type="text" value={formData.theatre_name}  onChange={(e) => handleChange(e)}  placeholder="theatre name" required/>
                                                            <span style={{color:"red"}}> {formData.error.theatre_name}</span>
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="theatre_address">Theatre address</label>
                                                            <textarea className="form-control" id="theatre_address" name="theatre_address" rows="3" required placeholder="theatre address" onChange={(e) => handleChange(e)}>{formData.theatre_address}</textarea>
                                                            <span style={{color:"red"}}> {formData.error.theatre_address}</span>
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="theatre_city">City</label>
                                                            <input className="form-control" id="theatre_city" name="theatre_city" type="text" value={formData.theatre_city}  onChange={(e) => handleChange(e)}  placeholder="theatre city" required/>
                                                            <span style={{color:"red"}}> {formData.error.theatre_city}</span>
                                                        </div><br/>
                                                        <div className="mb-0">
                                                            <label for="theatre_state">State</label>
                                                            <input className="form-control" id="theatre_state" name="theatre_state" type="text" placeholder="theatre state" value={formData.theatre_state}  onChange={(e) => handleChange(e)} required/>
                                                            <span style={{color:"red"}}> {formData.error.theatre_state}</span>
                                                      </div><br/>
                                                        <div className="mb-0">
                                                            <label for="theatre_pincode">Pincode</label>
                                                            <input className="form-control" id="theatre_pincode" name="theatre_pincode" type="text" placeholder="theatre pincode" value={formData.theatre_pincode}  onChange={(e) => handleChange(e)} required/>
                                                        </div><br/>
                                                        <span style={{color:"red"}}> {formData.error.theatre_pincode}</span>
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
         <h2>List Theatres</h2>
         {loading && <div className='loading'>Loading</div>}
    {!loading && (
         
  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">  
   <thead>
     <tr>
       <th>Theatre name</th>
       <th>Theatre address</th>
       <th>Theatre city</th>
       <th>Theatre state</th>
       <th>Theatre pincode</th>
       <th>Action</th>
       </tr>
       </thead> 
       <tbody>   
       {userdata ? (
         userdata.map((row) => (   
       <tr key={row._id}>
       <td>{row.theatre_name}</td>
       <td>{row.theatre_address}</td>
       <td>{row.theatre_city}</td>
       <td>{row.theatre_state}</td>
       <td>{row.theatre_pincode}</td>
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

export default Createtheatre;