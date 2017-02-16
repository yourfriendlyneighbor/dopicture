const express  = require('express');
const router = express.Router();
const video = require('../models/video');


router.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
  next()
});

router.get('/logout', (req, res, next) => {
  res.send('Logged out');
  next()
});
router.get('/getVideos', (req, res, next) => {
  video.find({}, (err, newVid) => {
    if(err)throw err;

    res.send(newVid)
    next()
  });
});
router.post('/video', (req, res, next) => {
  for (var i = 0; i < req.body.length; i++) {
    var newVideo = video({
      title: req.body[i].title,
      src: req.body[i].src,
      author: req.body[i].author,
      date: req.body[i].date,
      description: req.body[i].description
    });
    video.find({}, (err, newVid) => {
      if(err)throw err;

      res.send(newVid)
    })

    newVideo.save(function(err){
      if(err) throw err;

      console.log('Video Created');
    })}
    next()
});

module.exports = router;
