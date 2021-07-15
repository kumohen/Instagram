import React,{useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {findUserToFollow,followUser} from "../actions/user_action"
import {getAllPost} from "../actions/post_action"


const FollowUser = () => {
    const dispatch = useDispatch();
    const [show,setShow] = useState(false);
    const [id,setId] = useState(null);
    useEffect(()=>{
      dispatch(  findUserToFollow())
    },[dispatch])
    
    const {folllowUsers} = useSelector(state => state.followUserReducer)
    const handleFollow = item => {
       
        var fUser = []
      var  obj = {
            _id:item._id ,
            fullname:item.fullname ,
            username:item.username,
            profileImage:item.profileImage
        }
        fUser.push(obj) ;


       dispatch(followUser(fUser))
       dispatch(  findUserToFollow())
       setShow(true)
       setId(item._id);

    }
    return (
        <div style={{marginTop:"20px",position:"fixed"}}>
            <p style={{textAlign:"start",marginLeft:"20px"}}>Suggestions For You</p>
            {  folllowUsers && folllowUsers.map((item,index) => (
                <div key={index}>
                    <div className="col-md-12" style={{display:"flex",width:"100%"}}>
                                <div style={{flex:"1"}} >
                                <img src={item.profileImage} alt="dkkd" style={{height:"50px",width:"50px",borderRadius:"50%"}} />
                                </div>
                                <div  style={{marginLeft:"10px",flex:"2",textAlign:"start"}}>
                                <p>{item.username}</p>
                                <p style={{marginTop:"-20px",fontWeight:"200"}}>{item.fullname}</p>
                                </div>
                                <div  style={{marginTop:"7px",flex:"1",marginLeft:"50px",}}>
                                   
                                       {!show ? (
                                            <button  style={{height:"35px",borderBottomColor:"",fontWeight:"600", 
                                            borderColor:"gray",backgroundColor:"#3ab6bc",borderRadius:"5px"}} onClick={()=> handleFollow(item)}>Follow</button>
                                       ) : (
                                        <>   
                                          {id === item._id ? (
                                              <button  style={{height:"35px",borderBottomColor:"",fontWeight:"600", 
                                              borderColor:"gray",backgroundColor:"#3ab6bc",borderRadius:"5px"}} >Following</button>
                                          ) : (
                                            <button  style={{height:"35px",borderBottomColor:"",fontWeight:"600", 
                                            borderColor:"gray",backgroundColor:"#3ab6bc",borderRadius:"5px"}} onClick={()=> handleFollow(item)}>Follow</button>
                                          )}
                                          
                                        </>
                                       ) }
                                  
                                    
                                </div>
                     </div>
                </div>
            )) }
        </div>
    );
};

export default FollowUser;