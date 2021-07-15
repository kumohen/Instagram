import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getUserSavePost} from "../../actions/post_action"

const Saved = () => {

    const {userSavePosts} = useSelector(state =>  state.getUserSavePostReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserSavePost())
    },[])

    return (
        <div>
            <div className="row" style={{marginBottom:"30px"}}>
               <div className="col-md-12" >
                   {userSavePosts && userSavePosts.map(item => (
                       <div key={item._id} style={{width:"31%" ,marginLeft:"2%" ,float:"left",marginBottom:"2%"}}>
                            <img  className="bg-image hover-overlay ripple" 
                            src={item.saveItems[0].images[0]} alt="mohen mondal" style={{width:"100%" ,height:"250px"}} />
                       </div>
                   ))}
               </div>
               </div>
        </div>
    );
};

export default Saved;