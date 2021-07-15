import React, { useEffect } from 'react';
import Upload from "../components/Upload";
import {getAllPost} from "../actions/post_action";
import { useDispatch ,useSelector} from 'react-redux';
import HomeCard from "../components/HomeCard";
import FollowUser from "../components/FollowUser"
import Loading from "../components/Loading"
import UserList from "../components/UserList"

const Home = () => {
    const dispatch = useDispatch();
    const {posts,loading} = useSelector(state => state.getAllPostReducer)
    useEffect(()=>{
        dispatch(getAllPost())
    },[posts])
   
    return (
        <div style={{backgroundColor:"rgb(244 244 245)",paddingTop:"14px"}}>
             {/* {loading && <Loading   />} */}
            <div className="row">
                <div className="col-md-2">
                    {/* <Upload />  */}
                </div>
                <div className="col-md-5">
                    <UserList  />
                    <HomeCard posts={posts} />

                </div>
                <div className="col-md-3" >
                     <FollowUser  />
                </div>
                <div className="col-md-2">
                  
                </div>
            </div>
        </div>
    );
};

export default Home;