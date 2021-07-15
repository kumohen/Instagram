import React,{useEffect,useState} from 'react';
import axios from "axios"
import {useSelector,useDispatch} from "react-redux"
import ScrollMenu from 'react-horizontal-scrolling-menu';

const UserList = () => {
     const [users,setUsers] = useState([]);

     useEffect(()=> {
       axios.get("/api/users/userList")
          .then ( response =>  setUsers(response.data))
          .catch( error => console.log(error))
     },[])
     const {currentUser,loading} = useSelector(state => state.userLoginReducer) ;

    return (
        <div>
            
            {/* <div style={{display:"flex",flexDirection:"row", 
             overflowX:"hidden",backgroundColor:"white",paddingTop:"10px",paddingLeft:"10px"}}>
            {users  && users.map(item => (
                <div key={item._id} >
                    {currentUser && currentUser.user._id !== item._id && (
                        <div style={{display:"flex",flexDirection:"column",marginRight:"40px"}}>
                       <img src={item.profileImage} 
                       alt="mohen" style={{height:'60px',width:"60px",borderRadius:"50%",border:"2px solid red"}} />
                       <p>{item.fullname.split(" ")[0]}</p>
                       </div>
                    )}
                    
                </div>
            ))}
            </div> */}
            <div className="left_arrow">  </div>
            <div className="right_arrow"></div>
            <div style={{display:"flex",flexDirection:"row", 
             overflowX:"hidden",backgroundColor:"white",paddingTop:"10px",paddingLeft:"10px"}}>

<ScrollMenu
      arrowLeft={<div style={{ fontSize: "25px",marginTop:"-35px",position:"absolute",zIndex:"99",
      borderRadius:"50%",height:"20px",width:"30px",zIndex:"999" }}>{" < "}</div>}
      arrowRight={<div style={{ fontSize: "25px",marginTop:"-35px",position:"absolute",zIndex:"99",marginLeft:"72px",
      borderRadius:"50%",height:"20px",width:"30px",zIndex:"999" }}>{" > "}</div>}
      data={users && users.map((item, index) => (
        <div key={item._id} >
        {currentUser && currentUser.user._id !== item._id && (
            <div style={{display:"flex",flexDirection:"column",marginRight:"40px"}}>
           <img src={item.profileImage} 
           alt="mohen" style={{height:'60px',width:"60px",borderRadius:"50%",border:"2px solid red"}} />
           <p style={{marginLeft:"5px"}}>{item.fullname.split(" ")[0]}</p>
           </div>
        )}
        
    </div>
      ))}
    />
     </div>
        </div>
    );
};

export default UserList;