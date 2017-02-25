const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
var signupSchema = new Schema({
  name: String,
  email: String,
  pass: String,
  subscribers: Number
},
{
  collection: 'signups'
}
);

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
