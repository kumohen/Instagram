import React from 'react';
import Post from "./Post"

const HomeCard = ({posts}) => {
   
    return (
        <div >
             {posts && posts.map((post,index) => (
                <div key={index}>
                       <Post post ={post}  />
                </div> 
            ))}
        </div>
    );
};

export default HomeCard;