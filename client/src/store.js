import {combineReducers} from 'redux';
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


import {userRegisterReducer ,userLoginReducer,userProfileReducer,followUserReducer} from "./reducers/user_reducer"
import {postReducer,getAllPostReducer,getUserAllPostReducer,getPostByIdReducer,savePostReducer,getUserSavePostReducer} from "./reducers/post_reducer"


const rootReducer = combineReducers({
    userRegisterReducer,userLoginReducer,userProfileReducer,followUserReducer,
    postReducer,getAllPostReducer,getUserAllPostReducer,getPostByIdReducer,savePostReducer,getUserSavePostReducer
})


const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') ) : null

const initialState = {
  
    userLoginReducer:{currentUser}
}
const composedEnhancers = composeWithDevTools({})

const store = createStore(rootReducer, initialState, composedEnhancers(applyMiddleware(thunk)))

export default store ;