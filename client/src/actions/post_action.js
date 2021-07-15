import axios from "axios"

export const addPost = (post)=> async dispatch =>{
    dispatch({
        type:'ADD_POST_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.post('/api/posts/cpost',post,config);
      
        dispatch({
           type:'ADD_POST_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'ADD_POST_FAILED',
           payload:error
       })
    }
}

export const getAllPost = ()=> async dispatch =>{
    dispatch({
        type:'GET_POSTS_REQUEST'
    })
    try {
        const response = await axios.get('/api/posts/allPost');
     
        dispatch({
           type:'GET_POSTS_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_POSTS_FAILED',
           payload:error
       })
    }
}

export const getuserAllPost = (id)=> async dispatch =>{
    dispatch({
        type:'GET_USER_POSTS_REQUEST'
    })
    try {
        const response = await axios.get('/api/posts/allPost');
       const result = response.data.filter(item => item.postedBy.id === id);
     
        dispatch({
           type:'GET_USER_POSTS_SUCCESS',
           payload:result
       })
    } catch (error) {
       dispatch({
           type:'GET_USER_POSTS_FAILED',
           payload:error
       })
    }
}

export const getPostById = (id)=> async dispatch =>{
    dispatch({
        type:'GET_POST_BY_ID'
    })
    try {
        const response = await axios.get(`/api/posts/post/${id}`)
        dispatch({
           type:'GET_POST_BY_ID_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_POST_BY_ID_FAILED',
           payload:error
       })
    }
}


export const addComment = (text, id,user) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    dispatch({
        type: "ADD_COMMENT_REQUEST"
       
      });
    const response = await axios.put(`/api/posts/comment/${id}`, { text,user }, config);
  
    dispatch({
      type: "ADD_COMMENT",
      payload: response.data,
    });
     
  };

  
export const likePost = (postId)=> async dispatch =>{
    dispatch({
        type:'LIKE_POST_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.put('/api/posts/like',{postId},config);
      
        dispatch({
           type:'LIKE_POST_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'LIKE_POST_FAILED',
           payload:error
       })
    }
}

export const savePost = (post)=> async dispatch =>{
    dispatch({
        type:'SAVE_POST_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.post('/api/saves/savePost',{post},config);
      
        dispatch({
           type:'SAVE_POST_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'SAVE_POST_FAILED',
           payload:error
       })
    }
}

export const getUserSavePost = ()=> async dispatch =>{
    dispatch({
        type:'USERSAVE_POSTS_REQUEST'
    })
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
    try {
        const response = await axios.get('/api/saves/userSavePost',config);
     
        dispatch({
           type:'USERSAVE_POSTS_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'USERSAVE_POSTS_FAILED',
           payload:error
       })
    }
}