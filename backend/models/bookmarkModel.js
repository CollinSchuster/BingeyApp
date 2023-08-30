const mongoose = require('mongoose')

const bookmarkSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: [
      {
        mal_id: String,
        images: {
          jpg: {
            large_image_url: String,
          }
        }
      }
    ],
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Bookmark',bookmarkSchema)