const asyncHandler = require('express-async-handler')

const Bookmark = require('../models/bookmarkModel')
const User = require('../models/userModel')

// @desc Get bookmarks 
// @route GET /api/bookmarks
// @access Private
const getBookmarks = asyncHandler(async (req,res) => {
  const bookmarks = await Bookmark.find({ user: req.user.id })
  res.status(200).json(bookmarks)
})

// @desc Set bookmarks 
// @route POST /api/bookmarks 
// @access Private
const setBookmark = asyncHandler(async (req,res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const bookmark = await Bookmark.create({
    text: req.body.text,
    user: req.user.id,
  })
  res.status(200).json(bookmark)
})

// @desc Update bookmarks 
// @route PUT /api/bookmarks/:id
// @access Private
const updateBookmark = asyncHandler(async (req,res) => {
  const bookmark = await Bookmark.findById(req.params.id)

  if(!bookmark) {
    res.status(400)
    throw new Error('Bookmark not found')
  }

  // Check for user 
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matched bookmark user
  if (bookmark.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id,req.body, {
    new: true,
  })
  res.status(200).json(updateBookmark)
})

// @desc Delete bookmarks  
// @route DELETE /api/bookmarks/:id
// @access Private
const deleteBookmark = asyncHandler(async (req,res) => {
  const bookmark = await Bookmark.findById(req.params.id)

  if (!bookmark) {
    res.status(400)
    throw new Error('Bookmark not found')
  }

  // Check for user 
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Make sure the logged in user matched bookmark user
  if (bookmark.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await bookmark.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getBookmarks,
  setBookmark,
  updateBookmark,
  deleteBookmark,
}
