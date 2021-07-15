export const postReducer = (state={postItems:[]},action)=>{
    switch(action.type){
        case 'ADD_POST_REQUEST':
            return {...state , loading:true}    
        case 'ADD_POST_SUCCESS':
            return {...state,
                postItems:[...state.postItems ,action.payload ],
                loading:false
            }
       
           
       
        default:
            return state         
    }
}

export const getAllPostReducer = (state={posts:[]},action)=>{
    switch(action.type){
        case 'GET_POSTS_REQUEST':
            return {...state,loading:true}
        case 'GET_POSTS_SUCCESS':
            return {
                posts:action.payload,loading:false
            }    
        case 'GET_POSTS_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}

export const getUserAllPostReducer = (state={userPosts:[]},action)=>{
    switch(action.type){
        case 'GET_USER_POSTS_REQUEST':
            return {...state,loading:true}
        case 'GET_USER_POSTS_SUCCESS':
            return {
                userPosts:action.payload,loading:false
            }    
        case 'GET_USER_POSTS_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}

export const getPostByIdReducer = (state={},action)=>{
    switch(action.type){
        case 'GET_POST_BY_ID':
            return {...state,loading:true}
        case 'GET_POST_BY_ID_SUCCESS':
        case    "ADD_COMMENT":  
        case "LIKE_POST_SUCCESS":
       
            return {
                post:action.payload,loading:false
            }    
        case 'GET_POST_BY_ID_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}

export const savePostReducer = (state={savePosts:[]},action)=>{
    switch(action.type){
        case 'SAVE_POST_REQUEST':
            return {...state , loading:true}    
        case 'SAVE_POST_SUCCESS':
            return {...state,
                savePosts:[...state.savePosts ,action.payload ],
                loading:false
            }
       
           
       
        default:
            return state         
    }
}

export const getUserSavePostReducer = (state={userSavePosts:[]},action)=>{
    switch(action.type){
        case 'USERSAVE_POSTS_REQUEST':
            return {...state , loading:true}    
        case 'USERSAVE_POSTS_SUCCESS':
            return {...state,
                userSavePosts:action.payload,
                loading:false
            }
       
           
       
        default:
            return state         
    }
}