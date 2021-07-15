import React,{useState} from 'react';
import {useDispatch} from 'react-redux' 
import {addComment} from "../actions/post_action";


const CommentInput = ({id,user}) => {
   ;
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const commentSubmit = ()=>{
        dispatch(addComment(comment,id,user))
        handleClose();
        setComment("");
    }
    
    return (
        <div >
   
               <div className="mb-1">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" 
                onChange={e => setComment(e.target.value)}></textarea>
                </div>
      
            
              <div style={{marginLeft:"37%"}}>
            <button className="btn btn-primary btn-lg " type="button" onClick={()=> commentSubmit()}>Comment</button>
            </div>
           
              
              
    
        </div>
    );
};

export default CommentInput;