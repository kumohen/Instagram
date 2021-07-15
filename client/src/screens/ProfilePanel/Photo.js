import React,{useEffect, useState} from 'react';
import { withRouter } from 'react-router';
import {useDispatch,useSelector} from "react-redux"
import {getuserAllPost} from "../../actions/post_action"

const Photo = ({match}) => {

    const dispatch = useDispatch();

    useEffect(()=>{
       
       dispatch( getuserAllPost(match.params.id))
     },[])

     const {userPosts} = useSelector(state => state.getUserAllPostReducer)

    return (
        <div>
             <div className="row" style={{marginBottom:"30px"}}>
               <div className="col-md-12" >
                   {userPosts && userPosts.map(item => (
                       <div key={item._id} style={{width:"31%" ,marginLeft:"2%" ,float:"left",marginBottom:"2%"}}>
                            <img  className="bg-image hover-overlay ripple" 
                            src={item.images[0]} alt="mohen mondal" style={{width:"100%" ,height:"250px"}} />
                       </div>
                   ))}
               </div>
               </div> 
        </div>
    );
};

export default withRouter(Photo);