import React,{useEffect,useState} from "react";
import {  Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup(){
  
    useEffect(() => {
        document.body.className = "bg-black";
        return () => {
          document.body.classList.remove('bg-black')
        }
      }, []);
      const [formData, setFormData]=useState({
        user_name:"",
        mobile_number:"",
        email:"",
        password:"",
        confirm_password:""
    });
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/register/signup",{...formData});
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

<div className="card o-hidden border-0 shadow-lg my-5">
    <div className="card-body p-0">
        <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
                <div className="p-5">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="text" className="form-control form-control-user" id="exampleInputname" name="user_name" value={formData.user_name} onChange={(e)=>setFormData({...formData, user_name:e.target.value})}  placeholder="User name" required/>
                              </div>
                            <div className="col-sm-6">
                            <input type="text" className="form-control form-control-user" id="exampleInputno" name="mobile_number" value={formData.mobile_number} onChange={(e)=>setFormData({...formData, mobile_number:e.target.value})}  placeholder="Mobile no" required/>
                            </div>
                        </div>
                        <div className="form-group">
                        <input type="email" className="form-control form-control-user" id="exampleInputEmail" name="email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})}  placeholder="Email address..." required/>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="password" className="form-control form-control-user"  id="exampleInputPassword" name="password" value={formData.password} onChange={(e)=>setFormData({...formData, password:e.target.value})}  placeholder="Password" required/>
                            </div>
                            <div className="col-sm-6">
                            <input type="password" className="form-control form-control-user"  id="exampleInputCPassword" name="confirm_password" value={formData.confirm_password} onChange={(e)=>setFormData({...formData, confirm_password:e.target.value})}  placeholder="Confirm Password" required/>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-user btn-block" type="submit">Signup</button>
                     </form>
                    <hr/>
                        <div className="text-center"> Or </div>
                    <hr/>
                    <div className="text-center">
                        <Link to="/">
                            <a className="big">Already have an account? Login!</a>
                            </Link>  
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

export default Signup;