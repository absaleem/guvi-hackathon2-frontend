import React,{useState,useEffect} from 'react';
import Sidebar from '../Templates/Sidebar';
import Topbar from '../Templates/Topbar';
import Footer from '../Templates/Footer';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Edittheatre() {
const navigate = useNavigate();
const params = useParams();

let formValues={
    id:"",
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
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  try{
async function getData(rowId){
    const response = await axios.get(`http://localhost:3001/ticketbooking/getTheatre/${rowId}`);
    const response1 = response.data.theatre_details;
    //console.log(response1);
    setFormdata({...formData,
            id:response1._id,
            theatre_name:response1.theatre_name,
            theatre_address:response1.theatre_address,
            theatre_city:response1.theatre_city,
            theatre_state:response1.theatre_state,
            theatre_pincode:response1.theatre_pincode,
    }); 
    }     
    getData(params.id);//call user data when loading the file

  }catch(error){

  }
  
setLoading(false);
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
   //console.log(formData);
      const response=await axios.put(`http://localhost:3001/ticketbooking/updateTheatre/${formData.id}`,{
        theatre_details:{
        theatre_name:formData.theatre_name,
        theatre_address:formData.theatre_address,
        theatre_city:formData.theatre_city,
        theatre_state:formData.theatre_state,
        theatre_pincode:formData.theatre_pincode,
        }
        });
        toast(response.data.msg);   
        
        setTimeout(() => {
        navigate('/Createtheatre');
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
<h1 className="h3 mb-0 text-gray-800">Edit Theatre</h1>
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
                                                        <label for="theatre_name">Theatre name</label>
                                                        <input className="form-control" id="theatre_name" name="theatre_name" type="text" value={formData.theatre_name}  onChange={(e) => handleChange(e)}  placeholder="theatre name" required/>
                                                        <span style={{color:"red"}}> {formData.error.theatre_name}</span>
                                                    </div><br/>
                                                    <div className="mb-0">
                                                        <label for="theatre_address">Theatre address</label>
                                                        <textarea className="form-control" id="theatre_address" name="theatre_address" rows="3" required placeholder="theatre address" value={formData.theatre_address} onChange={(e) => handleChange(e)}>{formData.theatre_address}</textarea>
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
                           </div>

<Footer/>
</div> 
   </div> 
</div>
);
}

export default Edittheatre;