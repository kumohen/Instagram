import './App.css';
import Home from "./screens/Home"
import Signup from "./screens/Signup"
import Signin from "./screens/Signin"
import Profile from "./screens/Profile"
import Single from "./screens/Single"
import Navbar from "./components/Navbar"


import { BrowserRouter, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
           <BrowserRouter>
               <div style={{marginBottom:"70px"}}>
               <Navbar  />
               </div>
              
           
             <Route path="/"  exact component={Home} />
             <Route path="/profile/:id"   component={Profile} />
             <Route path="/login"  exact component={Signin} />
             <Route path="/register"  exact component={Signup} />
             <Route path="/post/:id"  exact component={Single} />
            
         
           </BrowserRouter>
      
    </div>
  );
}

export default App;