import axios from 'axios';

export const registerUser = (user)=> async dispatch =>{
     dispatch({
         type:'USER_REGISTER_REQUEST'
     })
    
     try {
       const res =  await axios.post("/api/users/signup",user);
       console.log(res)
         dispatch({
            type:'USER_REGISTER_SUCCESS'
            
        })
     } catch (error) {
        dispatch({
            type:'USER_REGISTER_FAILED',
            payload:error
        })
     }
}

export const loginUser = (user)=> async dispatch =>{
    dispatch({
        type:'USER_LOGIN_REQUEST'
    })
   
    try {
      const res =  await axios.post("/api/users/login",user);
      
        dispatch({
           type:'USER_LOGIN_SUCCESS',
           payload:res.data
       })
       localStorage.setItem("jwt", res.data.token);
       localStorage.setItem('currentUser',JSON.stringify(res.data));
       window.location.href = "/";
    } catch (error) {
       dispatch({
           type:'USER_LOGIN_FAILED',
           payload:error
       })
    }
}


export const logoutUser = ()=> async dispatch =>{
    
       localStorage.removeItem('currentUser');
       window.location.href = "/login";
   
}


export const userProfile = (id)=> async dispatch =>{
    dispatch({
        type:'USER_PROFILE_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.get(`/api/users/profile/${id}` ,config);
      
        dispatch({
           type:'USER_PROFILE_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USER_PROFILE_FAILED',
           payload:error
       })
    }
}
export const    findUserToFollow = ()=> async dispatch =>{
    dispatch({
        type:'USER_TOFOLLOW_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.get(`/api/users/findFollower` ,config);
      
        dispatch({
           type:'USER_TOFOLLOW_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USER_TOFOLLOW_FAILED',
           payload:error
       })
    }
}
export const followUser = (user)=> async dispatch =>{
    dispatch({
        type:'FOLLOW_USER_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.put(`/api/users/follow` ,user,config);
      
        dispatch({
           type:'FOLLOW_USER_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'FOLLOW_USER_FAILED',
           payload:error
       })
    }
}