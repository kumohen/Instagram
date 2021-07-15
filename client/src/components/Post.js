import React,{useState} from 'react';
import {useSelector,useDispatch} from "react-redux"
import { withRouter } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from "react-router-dom"
import {likePost,addComment,savePost} from "../actions/post_action"


const Post = ({post,history}) => {
  const[comment,setComment] = useState("");
  
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

      const {currentUser} = useSelector(state => state.userLoginReducer)

      const dispatch = useDispatch();

      const handleSubmit = e => {
        e.preventDefault();
        dispatch(addComment(comment,post._id,currentUser.user))
        setComment("");
      
    }

    const handlePost = ()=> {
      var postArr = [] ;
      var obj = {
        images:post.images ,
        postedBy:post.postedBy ,
        title:post.title ,
        id:post._id 
      }
      postArr.push(obj) ;
    
       dispatch(savePost(postArr))
    }
    
    return (
        <div className="card" style={{marginBottom:"5px",marginTop:"5px"}}>
           <div>
               <div className="row" >
                 <div style={{display:"flex"}}>
                  <img src={ post.postedBy.posterImg ? post.postedBy.posterImg : null } alt="lsls" 
                  style={{height:"50px",width:"50px",borderRadius:"50%"}} />
                  </div>
                  <div style={{display:"flex",marginTop:"-35px",marginLeft:"66px"}}>
                  <p><b><Link to={`/profile/${post.postedBy.id}`} 
                  style={{ textDecoration: 'none' ,color:"black"}}>{post.postedBy.fullname}</Link></b></p>
                  </div>
                 
               </div>

               <div>
                   {post.images.length < 2 ? (
                        <img src={post.images[0]} alt="dkdld" style={{height:"540px",width:"100%"}} />
                   ):(
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

               <div className="row" style={{marginTop:"10px"}}>
               <div style={{display:"flex"}}>
               {post && post.likes && post.likes.includes(currentUser.user._id) ? (
                                  <i className="fas fa-heart fa-2x" style={{color:"red"}}
                                  ></i>
                          ):(
                            <i className="fal fa-heart fa-2x" style={{color:""}}
                            onClick={()=> dispatch(likePost(post._id))}></i>
                          )}
               </div>
               <div style={{display:"flex" ,marginTop:"-27px",marginLeft:"33px"}}>
                  <Link to={`/post/${post._id}`}> <i className="fal fa-comment fa-2x" style={{color:"black"}}></i> </Link>
               </div>
               <div style={{display:"flex" ,marginTop:"-27px",marginLeft:"67px"}}>
                  <i className="fal fa-paper-plane fa-2x" ></i>
               </div>

               <div style={{display:"flex" ,marginTop:"-27px",marginLeft:"570px"}}>
                   <i className="fal fa-bookmark fa-2x" onClick={() => handlePost()}></i> 
               </div>
              
               </div>

               <div className="row">
                   <p style={{textAlign:"start",fontWeight:"600"}}>{post && post.likes && post.likes.length} likes</p>
               </div>
               <div className="row">
                   <p style={{textAlign:"start"}}> <b>{post && post.postedBy && post.postedBy.fullname}</b> {post && post.title} </p>
               </div>
               <div >
            
            {post && post.comments && post.comments.slice(-2).map(item => {
                   return(
                       <div key={item.text}  style={{width:"100%",display:"flex"}}>
                           
                           <div style={{marginTop:"-15px",marginLeft:"5px",marginRight:"5px"}}>
                           <p style={{textAlign:"justify",wordSpacing:"0.5px"}}><b>{item.comentor} </b>{item.text}</p>
                          
                          
                           </div>
                         
                       </div>
                   )
               }) } 
              

               
               {/* // <HomePageComment id={post._id} /> */}
           
      
       </div>
               <div>
                       <form className="form-inline" onSubmit={handleSubmit}>
 
                        <div className="form-group mx-sm-3 mb-2">
                            
                            <input type="text" className="form-control" value={comment} style={{width:"90%",border:"none"}}
                             onChange={e => setComment(e.target.value)} placeholder="Add a comment" />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2" 
                        style={{float:"right",marginTop:"-47px",marginRight:"4px"}}>Post</button>
                        </form>
                       </div>
         
           </div>
           
           
               
        </div>
    );
};

export default withRouter(Post);