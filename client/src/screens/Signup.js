import React,{useState} from 'react';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {registerUser} from "../actions/user_action";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");

    const dispatch = useDispatch();
   
    const register = ()=>{
      var user = {
        email,password,fullname,username
      }
       dispatch(registerUser(user));
    }


    return (
       <div className="login_container">
           <div className="card shadow-lg p-3 mb-5 bg-body rounded">
               <h3>Instragram</h3>
               <div>
                         <input required type="text" placeholder="Fullname" className="form-control" 
                        value={fullname} onChange={(e)=> setFullname(e.target.value)}  />
                         </div>
                         <div>
                         <input required type="text" placeholder="Username" className="form-control" 
                        value={username} onChange={(e)=> setUsername(e.target.value)}  />
                         </div>
                         <div >
                            <input required type="text" placeholder="email" className="form-control" 
                            value={email} onChange={(e)=> setEmail(e.target.value)}  />
                         </div>
                         <div>
                         <input required type="text" placeholder="password" className="form-control" 
                        value={password} onChange={(e)=> setPassword(e.target.value)}  />
                         </div>
                      

                        
                       
                        <button onClick={register} className="btn btn-primary mt-3">Signup</button>
                        <br />
                        <Link to="/login">Go to login page</Link>
           </div>
       </div>
      
    );
};

export default SignUp;
