import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'  ;
import {getPostById} from "../actions/post_action";

const Comment = ({id}) => {
    const {post} = useSelector(state => state.getPostByIdReducer);

  
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch( getPostById(id))
    },[id])

    return (
        <div >
            
             {post && post.comments && post.comments.reverse().map((item,index) => {
                    return(
                        <div key={item.text}  style={{width:"100%",display:"flex"}}>
                            
                          
                            
                                <div style={{width:"20%"}}>
                                <img src={ item &&  item.comentorPic} alt="skkdk" 
                                 style={{height:'50px',width:"50px",borderRadius:"50%",}} />
                                </div>
                                <div style={{width:"80%",marginTop:"15px"}}>
                                <p style={{textAlign:"justify",wordSpacing:"0.5px"}}><b>{item.comentor} </b>{item.text}</p>
                               
                               
                                </div>
                               
                           
                          
                        </div>
                    )
                }) } 
       
        </div>
    );
};

export default Comment;