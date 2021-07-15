import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Modal} from "react-bootstrap"
import {Switch,Route,Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import {userProfile,followUser} from "../actions/user_action"
import{getuserAllPost} from "../actions/post_action"
import Loading from "../components/Loading"
import Photo from "./ProfilePanel/Photo"
import Igtv from "./ProfilePanel/Igtv"
import Tagged from "./ProfilePanel/Tagged"
import Saved from "./ProfilePanel/Saved"

const Profile = ({match}) => {
    const [image,setImage] = useState("");
    const [show, setShow] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [select,setSelect] = useState(null)

     
    const dispatch = useDispatch();
     useEffect(()=>{
        dispatch(userProfile(match.params.id))
       dispatch( getuserAllPost(match.params.id))
     },[])
      const visitedUserId = match.params.id ;

        const onFileChange = (e)=> {
       
            setImage(e.target.files[0]);
           
     }


     const {cUser} = useSelector(state => state.userProfileReducer)
     const {userPosts} = useSelector(state => state.getUserAllPostReducer)
     const {currentUser,loading} = useSelector(state => state.userLoginReducer) ;

     const loginuserId =  currentUser ? currentUser.user._id : null ;

     var followersId = []
 

     const fun = ()=> {
        if(cUser && cUser.length > 0){
           
                cUser[0].followers.forEach(item => {
                    followersId.push(item.followedBy)
                })
            
           
        }
     }
     fun();

    
            
        
     const handleClose = () => setShow(false);
     const handleEditForm = ()=> setShowEditForm(false);
     const handleShow = (item) => {
         setShow(true);
         setSelect(item);
     };

     const onSubmit = (e)=> {
         e.preventDefault()
         const config = {
             headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + localStorage.getItem("jwt"),
             },
           };
         var formData = new FormData();
        
             formData.append('image', image)
         
         axios.put("http://localhost:4000/api/users/profilePic", formData, config , {
         }).then(res => {
             console.log(res.data)
             window.location.reload()
         })
     }
     
    
    return (
        <div style={{backgroundColor:"rgb(244 244 245)",paddingTop:"14px"}}>
            <div className="col-md-7" style={{margin:"auto"}}>
              {loading && <Loading/>}
          
            <Modal show={showEditForm} onHide={handleEditForm}>
                    <Modal.Header closeButton>
                    <Modal.Title>Upload Your Profile Photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
             <form onSubmit ={onSubmit}>
                   
                         <div className="form-group">
                            <input type="file" name="imgCollection" onChange={onFileChange}  />
                         </div>
                        <div className="form-group mt-2">
                             <button className="btn btn-primary" type="submit">Submit</button>
                         </div>
             </form> 
             </Modal.Body>
             <br />
             <br />
             </Modal>

           
               <div className="row" style={{display:"flex",marginLeft:"130px"}}>

                     
                    <div className="col-md-3" style={{display:"flex"}}>
                         <img  src={cUser && cUser[0].profileImage}  alt="kll"
                          style={{height:"140px",width:"140px",borderRadius:"50%",marginTop:"10px"}} />
                    </div>

                    <div className="col-md-5" style={{display:"flex",flexDirection:"column",marginTop:"20px"}}>
                          <div style={{display:"flex"}}>
                              <h3>{cUser && cUser[0].username }</h3>
                              {visitedUserId === loginuserId ? (
                                     <button className="ml-2"  style={{height:"35px",borderBottomColor:"gray",fontWeight:"600",
                                     borderColor:"gray",backgroundColor:"white",borderRadius:"5px",marginLeft:"40px"}}
                                      onClick={() => setShowEditForm(true)} >Edit  Profile</button>
                              ):(
                                <>  
                                {followersId.includes(loginuserId) ? (
                                  <button className="ml-2" style={{height:"35px",borderBottomColor:"gray",fontWeight:"600",
                                  borderColor:"gray",backgroundColor:"white",borderRadius:"5px",marginLeft:"40px"}}  >Following</button>
                                ):(
                                    <button className="ml-2 btn btn-primary" style={{height:"35px",borderBottomColor:"gray",fontWeight:"600",
                                    borderColor:"gray",borderRadius:"5px",marginLeft:"40px"}}  onClick={()=> dispatch(followUser(cUser))} >Follow</button>
                                )}
                                
                                </>
                              )}
                          
                         </div>

                         <div style={{display:"flex",marginTop:"10px",}}>
                              <p><b>{userPosts && userPosts.length} </b>posts</p>
                              <p style={{marginLeft:"30px"}}>
                                  <button onClick={() => handleShow("followers")}
                                   style={{outline: "none",backgroundColor:"rgb(244 244 245)",border:"none",fontWeight:"600"}}>{ cUser &&  cUser[0].followers.length} </button>followers</p>
                              <p style={{marginLeft:"30px"}}><button onClick={() => handleShow("following")}  
                              style={{outline: "none",backgroundColor:"rgb(244 244 245)",border:"none",fontWeight:"600"}}>
                                  { cUser &&  cUser[0].following.length} </button>following</p>
                          </div>

                          <div>
                              <p style={{textAlign:"start",fontWeight:"600"}}>{cUser && cUser[0].fullname }</p>
                          </div>

                    </div>

               </div>

          
               <hr />
         
              {/* <div className="row" style={{marginBottom:"30px"}}>
               <div className="col-md-12" >
                   {userPosts && userPosts.map(item => (
                       <div key={item._id} style={{width:"31%" ,marginLeft:"2%" ,float:"left",marginBottom:"2%"}}>
                            <img  className="bg-image hover-overlay ripple" 
                            src={item.images[0]} alt="mohen mondal" style={{width:"100%" ,height:"250px"}} />
                       </div>
                   ))}
               </div>
               </div> */}
                    <div className="row justify-content-center">
                <div className="col-md-12">
              
            <ul className="profilefunction">
                <li> <Link to={`/profile/${visitedUserId}/photo`} style={{color:"black",textDecoration:"none"}}>
                <i className="far fa-th"></i> Posts</Link> </li>
                <li> <Link to={`/profile/${visitedUserId}/igtv`} style={{color:"black",textDecoration:"none"}}>
                <i className="fal fa-file-video"></i>IGTV</Link> </li>
                <li> <Link to={`/profile/${visitedUserId}/saved`} style={{color:"black",textDecoration:"none"}}>
                     <i className="fal fa-bookmark"></i> SAVED</Link> </li>
                <li> <Link to={`/profile/${visitedUserId}/tagged`} style={{color:"black",textDecoration:"none"}}>
                <i className="far fa-portrait"></i> TAGGED</Link> </li>
            </ul>  
            <Switch>
            <Route path="/profile/:id" component={Photo} exact />
                <Route path="/profile/:id/photo" component={Photo} exact />
                <Route path="/profile/:id/igtv" component={Igtv} exact />
                <Route path="/profile/:id/saved" component={Saved} exact />
                <Route path="/profile/:id/tagged" component={Tagged} exact />
               
            </Switch>   
                </div>
            </div>

               </div>

         


           <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
           <Modal.Title>{select}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
               {select  === "following" ? (
                 <div>
                     {cUser && cUser[0].following && cUser[0].following.map((item,index) =>(
                            <div key={index}>
                            <div className="row">
                                <div className="col-md-12" style={{display:"flex"}}>
                                <div  className="md-col-3">
                                <img src={item.image} alt="dkkd" style={{height:"50px",width:"50px",borderRadius:"50%"}} />
                                </div>
                                <div className="md-col-3 ml-1" style={{marginLeft:"10px"}}>
                                <p>{item.username}</p>
                                <p style={{marginTop:"-20px",fontWeight:"200"}}>{item.fullname}</p>
                                </div>
                                <div className="md-col-3 ml-1" style={{marginLeft:"370px",marginTop:"10px",position:"absolute"}}>
                                    <button style={{height:"35px",borderBottomColor:"gray",fontWeight:"600",
                                    borderColor:"gray",backgroundColor:"white",borderRadius:"5px"}} >Following</button>
                                </div>
                                </div>
                            </div>
                         
                       
                        </div>
                     ))}
                 </div>
               ):(
                <div>
                {cUser && cUser[0].followers && cUser[0].followers.map((item,index) =>(
                    <div key={index}>
                        <div className="row">
                            <div className="col-md-6" style={{display:"flex"}}>
                            <div  className="md-col-3">
                            <img src={item.image} alt="dkkd" style={{height:"50px",width:"50px",borderRadius:"50%"}} />
                            </div>
                            <div className="md-col-3 ml-1" style={{marginLeft:"10px"}}>
                            <p>{item.username}</p>
                            <p style={{marginTop:"-20px",fontWeight:"200"}}>{item.fullname}</p>
                            </div>
                            </div>
                        </div>
                     
                   
                    </div>
                ))}
            </div>
               )}
         </Modal.Body>
         
             </Modal>


          
            
        </div>
    );
};

export default Profile;