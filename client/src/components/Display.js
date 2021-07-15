import React,{useEffect,useState} from 'react';

import axios from "axios";
import Post from "./Post"
const Display = () => {
    const [posts,setPosts] = useState([]);
    useEffect(()=> {
        axios.get("http://localhost:4000/api")
        .then(function (response) {
            // handle success
            setPosts([response.data.users])
          })
    },[])
  
    return (
        <div>
            <h2>display image</h2>
            {/* <img src="http://localhost:4000/public/6be3ca58-31d3-4658-81b3-fe38c4367a89-2.jpeg" alt="fkkfk" style= {{height:"100px",width:"100px"}}/> */}
            {posts && posts.map((post,index) => (
                <div key={index}>
                       <Post post ={post}  />
                </div> 
            ))}
        </div>
    );
};

export default Display;