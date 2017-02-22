const express  = require('express');
const router = express.Router();
const video = require('../models/video');
const Signup = require('../models/signup');

router.get('/getVideos', (req, res, next) => {
  video.find({}, (err, newVid) => {
    if(err)throw err;

    res.send(newVid)
    next()
  });
});
router.get('/getuserdata', (req, res, next) => {
  var data = [{
    name: w,
    email: x
  }];
  res.send(data)
  next()
})
router.post('/video', (req, res, next) => {
  for (var i = 0; i < req.body.length; i++) {
    var newVideo = video({
      title: req.body[i].title,
      src: req.body[i].src,
      author: req.body[i].author,
      date: req.body[i].date,
      description: req.body[i].description
    });
    newVideo.save(function(err){
      if(err) throw err;

      console.log('Video Created');
    })}
    res.send(newVideo)
    next()
});
var w;
var x;
var z;
router.post('/login', (req, res, next) => {
  for (var i = 0; i < req.body.length; i++) {
    w = req.body[i].name;
    x = req.body[i].email;
    z = req.body[i].pass;
  }
  Signup.findOne({'email' : x}, (err, newUser) => {
    if(err)throw err;

    if (!newUser) {
      console.log('Not Found');
      return false
    }else {
      console.log('User Found!');
      Signup.findOne({'pass' : z}, (err, newPass) => {
        if(err)throw err;

        if(!newPass){
          console.log('Not Found');
          return false
        }else {
          console.log('Pass Found!');
          res.send({
            email: x,
            pass: z,
            name: w
          })
          next()
          return true
        }
      })
    }

  });
});
router.post('/signup', (req, res, next) => {
  for (var i = 0; i < req.body.length; i++) {
    var newSignup = Signup({
      name: req.body[i].name,
      email: req.body[i].email,
      pass: req.body[i].pass
    })
    console.log(newSignup);
  }

  newSignup.save(function(err){
    if(err) throw err;

    console.log('Success');
  })

  res.send(newSignup)
  next()
});


module.exports = router;
