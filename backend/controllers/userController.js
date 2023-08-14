const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user 
// @route PUT /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // check if user exists 

  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10) // takes in a number of rounds
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if(user){
    res.status(201).json({ // 201 is a created success status
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id) // puts in the actual token from the generateToken const below for the user with _id
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Authenticate a user 
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body

    //check for user email 
  const user = await User.findOne({email})

  if (user && (await bcrypt.compare(password, user.password))){ // bcrypt.compare will compare the stored password with the typed in password
    res.json({ // sends back the id name and email
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id) // puts in the actual token from the generateToken const below for the user with _id
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc Get user daa
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
  const {_id,name,email} = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    name, 
    email
  })
})

// Generate JWT
const generateToken = (id) /* the id is going to be the payload*/ => {
  return jwt.sign({ id },process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


module.exports = {
  registerUser, 
  loginUser,
  getMe,
}