import React,{useState} from 'react';
import useKeypress from 'react-use-keypress';
import {Link} from "react-router-dom"
import {Modal} from "react-bootstrap"
import { useSelector,useDispatch } from 'react-redux';
import {logoutUser} from "../actions/user_action"
import Upload from './Upload';

const Navbar = () => {
  const[searchKey,setSearchKey] = useState("");
  const [show, setShow] = useState(false);
    const {currentUser} = useSelector(state => state.userLoginReducer) ;

    const userId =  currentUser ? currentUser.user._id : null ;
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    
    useKeypress('Enter', () => {
       console.log(searchKey)
    });
    
    return (
        <div style={{backgroundColor:"white",position:"absolute",width:"100%"}}>
             <Modal show={show} onHide={handleClose}>
                     <Modal.Header closeButton>
                    <Modal.Title>Create Your Post </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Upload show={show} onChange={handleClose} />
                    </Modal.Body>  
             </Modal>  
           
            <nav className="navbar fixed-top navbar-expand-lg  mb-5 navbar-white bg-white rounded "
             style={{width:"100%",margin:"auto",borderBottomColor:"1px solid black",marginBottom:"3px",height:"70px",}}>
  <div className="container-fluid" style={{width:"67%"}}>
    <Link className="navbar-brand" to="/" style={{fontFamily:"Yellowtail ",fontSize:"30px",color:"black"}}>Instragram</Link>
    {currentUser && (
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <img src={currentUser && currentUser.user.profileImage} alt="okk" style={{height:"60px",width:"60px",borderRadius:"50%",marginTop:"-20px"}} />
       </button>
    )}
    
    <div className="input-group" style={{width:"250px",marginLeft:"100px"}}>
        <span>
       
        </span>
        <input type="text" className="form-control" placeholder="Search"  value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
      </div>
      {/* <div className="container-fluid" style={{width:"60%",marginLeft:"10%"}}>
      <div style={{display:"flex",flexDirection:"rows"}}>
      <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
     <button className="btn btn-outline-success" onClick={()=> console.log("search")}>Search</button>
      </div>
   

 </div> */}
 
 

   
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <ul className="navbar-nav ml-auto ">
      
                  <div className="dropdown mt-2">
                 {currentUser && (
                   <>
                     <Link to="/" style={{color:"black"}}> <i className="far fa-home " style={{marginRight:"20px"}}></i>  </Link>
                     <i className="far fa-plus-square fa-2x" style={{marginRight:"20px"}} onClick={() => setShow(true)} ></i>
                      <i className="fal fa-paper-plane fa-2x" style={{marginRight:"20px"}} ></i>
                      <i className="fal fa-heart fa-2x" style={{marginRight:"20px"}}></i>
                      <Link className=" dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="">
                      <img src={currentUser && currentUser.user.profileImage} alt="okk" style={{height:"50px",width:"50px",borderRadius:"50%",marginTop:"-20px"}} />
                       
                      </Link>
                      </>
                 )}
                
                  {currentUser ? (
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                     <Link className="dropdown-item" to={`/profile/${userId}`}>
                        Profile
                     </Link>
                     
                     <Link className="dropdown-item" to="/login" > <li onClick={()=> dispatch(logoutUser())} >Logout</li></Link>
                   
                   </div>
                   ) : (
                    <li className="nav-item ">
                    <Link className="nav-link " aria-current="page" to="/login">Login</Link>
                    </li>
                   ) } 
                 
                </div>
          
              
      
       
      </ul>
    </div>
  </div>
</nav>

        </div>
    );
};

export default Navbar;