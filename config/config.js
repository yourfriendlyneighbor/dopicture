const mongoose = require('mongoose');
const express = require('express');

function cnnMongodb(){
  mongoose.connect('mongodb://localhost:27017/videos');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connecion error:'));
  db.once('open', () => {
    console.log('Connected to db');
  })
}

module.exports = cnnMongodb()

//Username mythicalnaturecom
//Password nysw4052
//mongodb://mythicalnaturecom:nysw4052@ds054999.mlab.com:54999/videos
