import React,{useEffect,useState} from "react";
import {  Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login(){
  
    useEffect(() => {
        document.body.className = "bg-gradient-info";
        return () => {
          document.body.classList.remove('bg-gradient-info')
        }
      }, []);

      const [formData, setFormData]=useState({
        email:"",
        password:""
       });
    const navigate = useNavigate();
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/admin/login",{...formData});
            console.log(response);
            if(response){
                localStorage.setItem("token_admin",response.data);
                navigate("/Createtheatre");
            }
           } catch (error) {
            toast(error.response.data.msg);            
          }
    };


    return (
            <>
              <div>
        <ToastContainer />
      </div>
      <div className="container">
            <div className="row justify-content-center">

<div className="col-xl-10 col-lg-12 col-md-9">

    <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
            <div className="row">
                <div className="col-lg-12">
                    <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-6">Admin Login</h1>
                        </div>
                        <form className="user" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="email" required className="form-control form-control-user" name="email" onChange={(e)=>setFormData({...formData, email:e.target.value})} id="exampleInputEmail" placeholder="Email Address"/>
                            </div>
                            <div className="form-group">
                                <input type="password" required className="form-control form-control-user" name="password" onChange={(e)=>setFormData({...formData, password:e.target.value})} id="exampleInputPassword" placeholder="Password"/>
                            </div>
                            
                            <button className="btn btn-primary btn-lg" type="submit">Login</button>                                  
                        </form>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

</div>
</div>
</>

    );
}

export default Login;