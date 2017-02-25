const express  = require('express');
const router = express.Router();
const video = require('../models/video');
const Signup = require('../models/signup');

let loggedin = false;

router.get('/pictures', (req, res, next) => {
  if (!loggedin) {
    res.redirect('/logout.html')
  }else{
    res.redirect('/pictures.html')
  }
  next()
})

router.get('/getVideos', (req, res, next) => {
  video.find({}, (err, newVid) => {
    if(err)throw err;

    res.send(newVid)
    next()
  });
});
var w;
var x;
var z;
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

router.post('/login', (req, res, next) => {

  loggedin = false;


  for (var i = 0; i < req.body.length; i++) {
    w = req.body[i].name;
    x = req.body[i].email;
    z = req.body[i].pass;
  }
  Signup.findOne({'email' : x}, (err, newUser) => {
    if(err)throw err;

    if (!newUser) {
      console.log('Not Found');
      loggedin = falses
      return false
    }else {
      console.log('User Found!');
      Signup.findOne({'pass' : z}, (err, newPass) => {
        if(err)throw err;

        if(!newPass){
          console.log('Not Found');
          loggedin = false
          return false
        }else {
          console.log('Pass Found!');
          loggedin = true
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
  loggedin = false;
  for (var i = 0; i < req.body.length; i++) {
    var newSignup = Signup({
      name: req.body[i].name,
      email: req.body[i].email,
      pass: req.body[i].pass,
      subscribers: 0
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
router.post('/subz', (req, res, next) => {
  let username;
  for (var i = 0; i < req.body.length; i++) {
    username = req.body[i].username
    console.log(req.body[i].username);
  }
  Signup.findOne({'name' : username}, (err, data) => {
    console.log(data);
    if (err) {
      throw err;
      res.send(err)
      next()
    }
    if(!data){
      res.send('No Data recieved')
      next()
    }
    else{
      res.send(JSON.stringify({ 'subs' : data.subscribers }));
      next()
    }
  })
})
router.post('/subs', (req, res, next) => {
  let
  user,
  subs
  for (var i = 0; i < req.body.length; i++) {
    user = req.body[i].author;
    subs = req.body[i].subs;
  }
  console.log(user);
    Signup.findOne({'name' : user}, (err, data) => {
      console.log(data);
      if (err) {
        throw err;
        res.send(err)
        next()
      }
      if(!data){
        res.send('No Data recieved')
        next()
      }
      else{
        data.subscribers++;
        data.save(function(err){
          if(err) throw err;
          res.send('Data inputed!')
          next()
        })
      }
    })

})

module.exports = router;
