const express = require("express");
const router = express.Router();
const   auth = require("../middleware/auth")
const Save = require("../models/Test");


router.post("/savePost",auth ,(req,res)=>{
   
    const newSave = new Save({
          userId:req.user._id,
          saveItems:req.body.post 
    })
    newSave.save().then(result => {
        res.status(201).json({
            message: "Done upload!",
            result
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/userSavePost",auth , (req, res) => {
    Save.find({userId:req.user._id}).then(data => {
        res.status(200).json(
           data
        );
    });
});

module.exports = router;