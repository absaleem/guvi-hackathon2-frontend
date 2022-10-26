import React,{useEffect,useState} from "react";
import {  Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Userlogin(){
  
    useEffect(() => {
        document.body.className = "bg-black";
        return () => {
          document.body.classList.remove('bg-black')
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
            const response = await axios.post("http://localhost:3001/register/signin",{...formData});
            console.log(response);
            if(response){
                localStorage.setItem("token",response.data);
                navigate("/Dashboard");
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
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                    <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Login</h1>
                        </div>
                        <form className="user" onSubmit={handleSubmit}>
                            
                            <div className="form-group">
                                <input type="email" className="form-control form-control-user" id="exampleInputEmail" name="email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})}  placeholder="Email address..." required/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-user"  id="exampleInputPassword" name="password" value={formData.password} onChange={(e)=>setFormData({...formData, password:e.target.value})}  placeholder="Password" required/>
                            </div>
                                                            
                          <div className="text-center">
                            <button className="btn btn-primary btn-user btn-block" type="submit">SignIn</button>
                        </div>
                        </form>
                        <hr/>
                        <div className="text-center"> Or <hr/>
                        <Link to="/Signup">
                            <a className="big">Signup to register</a>
                            </Link>                                   
                        </div>
                       
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

export default Userlogin;