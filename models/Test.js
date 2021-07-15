const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const saveSchema = new mongoose.Schema({

  saveItems: [],
  userId:{
      type:String 
  }
 
  
},{timestamps:true});

  module.exports =  mongoose.model("Test", saveSchema);