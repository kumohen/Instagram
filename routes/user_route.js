const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require('../models/posts');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer')

const { v4: uuidv4 } = require('uuid');
const { JWT_SECRET } = require("../keys");

const requireLogin = require("../middleware/auth");

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post("/signup", (req, res) => {
  const {
    fullname,username,
    password,email
   
  } = req.body;
  if (!email || !password || !fullname) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
           fullname ,username
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
        
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
       
          res.json({
            token,
            user: savedUser
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/profile/:id", requireLogin, (req, res) => {
  
  User.find({ _id: req.params.id })
  .select("-password")
  .then((admins) => {
    res.json(admins);
  })
  .catch((err) => {
    console.log(err);
  });
  });


  router.get("/userList",(req, res) => {
  
    User.find()
    .select("_id fullname username profileImage ")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
    });

  router.put("/profilePic",upload.single("image"), requireLogin, (req, res) => {
    
    let reqFiles 
    const url = req.protocol + '://' + req.get('host')
    reqFiles =  url + '/public/' + req.file.filename ;
    
   
    User.findByIdAndUpdate(
      req.user._id,
      { $set: { profileImage: reqFiles } },
      { new: true },
      (err, result) => {
        if (err) {
          return res.status(422).json({ error: "pic canot post" });
        }
        res.json(result);
      }
    );
  });


  router.put("/follow", requireLogin, (req, res) => {
    const follower = {
      fullname: req.user.fullname,
      username:req.user.username ,
      followedBy: req.user._id,
      image: req.user.profileImage,
    };
    const following = {
      fullname: req.body[0].fullname,
      followingBy: req.body[0]._id,
      username:req.body[0].username ,
      image: req.body[0].profileImage,
    };
     

    User.findByIdAndUpdate(
      req.body[0]._id,
      {
        $push: {
          followers: follower,
        },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        }
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { following: following },
          },
          { new: true }
        )
          .select("-password")
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      }
    );
  });


  router.get("/findFollower", requireLogin, (req, res) => {
    
    let followings = [];
    for (let item of req.user.following) {
      followings.push(item.followingBy);
    }
    followings.push(req.user._id);
  
    User.find({ _id: { $nin: followings } }, (err, users) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(users);
    });
  });
  

module.exports = router;