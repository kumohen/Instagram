const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  username: {
    type: String,
   
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
  },
 
  bio: {
    type: String,
  },
  followers: [
    {
      fullname:String ,
      username:String ,
      image: String,
      followedBy: { type: ObjectId, ref: "User" },
    },
  ],
  following: [
    {
      fullname:String ,
      username:String ,
      image: String,
      followingBy: { type: ObjectId, ref: "User" },
    },
  ],
  
},{timestamps:true});

  module.exports =  mongoose.model("User", userSchema);