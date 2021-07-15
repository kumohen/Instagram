import React,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import {loginUser} from "../actions/user_action"

const Signin = () => {
    const [email, setEmail] = useState("mahen@gmail.com");
    const [password, setPassword] = useState("123456");


    const dispatch = useDispatch();
    useEffect(()=>{
       if( localStorage.getItem('currentUser')){
          window.location.href = "/"
        }
    },[])

    const login = ()=> {
       
            const user = {email,password};
            dispatch(loginUser(user));
        
  
    }
    return (
       <div className="login_container">
           <div className="card shadow-lg p-3 mb-5 bg-body rounded">
               <h3>Instragram</h3>
           <div className="mb-2">
                            <input required type="text" placeholder="email" className="form-control" 
                            value={email} onChange={(e)=> setEmail(e.target.value)}  />
                         </div>
                        
                         <div>
                         <input required type="text" placeholder="password" className="form-control" 
                        value={password} onChange={(e)=> setPassword(e.target.value)}  />
                         </div>

                        
                       
                        <button onClick={login} className="btn btn-primary mt-3">Login</button>
                        <br />
                        <Link to="/register">Go to register page</Link>
           </div>
       </div>
      
    );
};

export default Signin;
