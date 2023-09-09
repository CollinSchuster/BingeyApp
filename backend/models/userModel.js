const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  // fullname:{
  //   type:String,
  //   // trim:true,
  //   required: false,
  //   // maxlength: 25, maybe
  // },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
},
{
  timestamps: true
}) 

module.exports = mongoose.model('User',userSchema )