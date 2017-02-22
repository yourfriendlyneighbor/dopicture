const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
var videoSchema = new Schema({
  title: String,
  src: String,
  author: String,
  date: String,
  description: String
},
{
  collection: 'videos'
}
);

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
