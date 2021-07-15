let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
     { v4: uuidv4 } = require('uuid');
    router = express.Router();
    auth = require("../middleware/auth")

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

// User model
let Post = require('../models/posts');



router.post('/cpost', upload.array('imgCollection', 6) ,auth , (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }
    
    const post = new Post({
     
        images: reqFiles,
        title:req.body.title,
        postedBy: {
            fullname:req.user.fullname,
            posterImg:req.user.profileImage,
            id:req.user._id
        }
    });

    post.save().then(result => {
        res.status(201).json({
            message: "Done upload!",
            
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/allPost", (req, res) => {
    Post.find().sort({ createdAt: -1 }).then(data => {
        res.status(200).json(
           data
        );
    });
});
router.get('/post/:id',(req,res)=>{
    
    Post.findById(req.params.id)
  
    .then(post=>{
        res.json(post)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put("/comment/:id", auth, (req, res) => {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
      comentor:req.user.fullname,
      comentorPic:req.user.profileImage
    };
   
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id name  ")
      .populate("postedBy", "_id name ")
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
           
        }
      });
   
  });

  router.put("/like", auth, (req, res) => {
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("postedBy", "_id ")
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
  });

module.exports = router;