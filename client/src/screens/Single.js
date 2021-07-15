import React,{useEffect,useState} from 'react';
import {getPostById,addComment,likePost} from "../actions/post_action";
import { useDispatch ,useSelector} from 'react-redux';
import Comment from "../components/Comment"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Single = ({match}) => {
    const[comment,setComment] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPostById(match.params.id))
    },[])

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
    const {post} = useSelector(state => state.getPostByIdReducer)
    const {currentUser} = useSelector(state => state.userLoginReducer)
    
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addComment(comment,match.params.id,currentUser.user))
        setComment("");
    }
    
    return (
        <div className="card" style={{marginTop:"100px",padding:"10px",backgroundColor:"#fefdfc"}}>
             <div className="col-md-9" style={{display:"flex",margin:"auto",backgroundColor:"white",border:"1px solid black"
            }}>
                 <div className="col-md-7">
                 {/* {post && post.images &&  post.images.length < 2 ? ( */}
                  {post && post.images && post.images.length < 2 &&  (
                        <img src={post.images[0]} alt="dkdld" style={{height:"540px",width:"100%"}} />
                  )}
                  {post && post.images && post.images.length > 1 && (
                     <Carousel
                     responsive={responsive}
                     infinite={true}
                     autoPlay={false}
                     showDots={true}
                     removeArrowOnDeviceType={["tablet", "mobile",]}
                     autoPlaySpeed={5000}
                     itemClass="carousel-item-padding-20-px"
                   >
                                {post && post.images.map((image,index)=>(
                                   <div key={index} >
                                    <img src={image} alt="dkdld" style={{height:"540px",width:"100%"}} />
                               </div>    
                                ))}
                                </Carousel>
                  )}
                    
                  
                 </div>
               
             
                 <div className="col-md-5" style={{padding:"15px"}}>
                       <div style={{display:"flex",flexDirection:"column"}}>

                       <div style={{display:"flex", flexDirection:"column", height:"480px",overflowY:"scroll",}}>

                  
                        <div style={{width:"100%",display:"flex"}}>
                        <div style={{width:"20%"}}>
                        <img src={post && post.postedBy && post.postedBy.posterImg }
                        alt="dkdld" style={{height:"60px",width:"60px",borderRadius:"50%"}} />
                        </div>
                        <div style={{width:"75%"}}>
                            <p style={{textAlign:"justify",wordSpacing:"0.5px"}}> <b>{post && post.postedBy && post.postedBy.fullname }</b> {post  && post.title} </p>
                        </div>
                        </div>

                        <div>
                            <Comment id={match.params.id}  />
                        </div>
                       
                        </div>
                           
                          
                        <div className="row" style={{marginTop:"5px",marginLeft:"10px"}}>
                          <div style={{display:"flex"}}> 
                          {post && post.likes && post.likes.includes(currentUser.user._id) ? (
                                  <i className="fas fa-heart fa-2x" style={{color:"red"}}
                                  ></i>
                          ):(
                            <i className="fal fa-heart fa-2x" style={{color:""}}
                            onClick={()=> dispatch(likePost(match.params.id))}></i>
                          )}
                      
                          </div>
                          <div style={{display:"flex" ,marginTop:"-25px",marginLeft:"47px"}}>
                             <i className="fal fa-comment fa-2x"></i>
                          </div>
                          <div style={{display:"flex" ,marginTop:"-25px",marginLeft:"91px"}}>
                              <i className="far fa-paper-plane fa-2x"></i>
                          </div>
                         
                          </div>
                          
                          <div >
                            <p style={{textAlign:"left",marginLeft:"25px",fontWeight:"600"}}> {post && post.likes && post.likes.length} likes</p>
                          </div>
                         
                       </div>

                       <div>
                       <form className="form-inline" onSubmit={handleSubmit}>
 
                        <div className="form-group mx-sm-3 mb-2">
                            
                            <input type="text" className="form-control" value={comment} style={{width:"90%"}}
                             onChange={e => setComment(e.target.value)} placeholder="Add a comment" />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2" 
                        style={{float:"right",marginTop:"-47px",marginRight:"4px"}}>Post</button>
                        </form>
                       </div>

                    </div>
             </div>
        </div>
    );
};

export default Single;