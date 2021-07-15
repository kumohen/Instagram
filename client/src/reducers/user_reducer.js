export const userRegisterReducer = (state={},action)=>{
    switch(action.type){
        case 'USER_REGISTER_REQUEST':
            return {
                loading:true
            }
        case 'USER_REGISTER_SUCCESS':
            return {loading:false,success:true}
        case 'USER_REGISTER_FAILED':          
            return {loading:false,error:action.payload}
       
        default:
            return state         
    }
}

export const userLoginReducer = (state={},action)=>{
    switch(action.type){
        case 'USER_LOGIN_REQUEST':
            return {
                loading:true
            }
        case 'USER_LOGIN_SUCCESS':
            return {loading:false,success:true,currentUser:action.payload}
        case 'USER_LOGIN_FAILED':          
            return {loading:false,error:action.payload}
       
        default:
            return state         
    }
}


export const userProfileReducer = (state={},action)=>{
    switch(action.type){
        case 'USER_PROFILE_REQUEST':
            return {
                loading:true
            }
        case 'USER_PROFILE_SUCCESS':
            return {loading:false,success:true,cUser:action.payload}
        case 'USER_PROFILE_FAILED':          
            return {loading:false,error:action.payload}
       
        default:
            return state         
    }
}

export const followUserReducer = (state={folllowUsers:[]},action)=>{
    switch(action.type){
        case 'USER_TOFOLLOW_REQUEST':
            return {...state,loading:true}
        case 'USER_TOFOLLOW_SUCCESS':
            return {
                folllowUsers:action.payload,loading:false
            }    
        case 'USER_TOFOLLOW_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}