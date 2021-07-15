const  mongoose  = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;  

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  
   images: [],
   comments: [
    {
      text: String,
      comentor:String ,
      comentorPic:String,
      createdAt: {type: Date, default: Date.now},
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  likes: [{ type: ObjectId, ref: "User" }],
  postedBy: {
    fullname:String,
    id:String,
    posterImg:String
  }
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model('post', postSchema)