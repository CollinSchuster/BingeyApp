import React from 'react'
import { deleteGoal } from '../features/goals/goalSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Bookmark from './Bookmark'
import { Link } from 'react-router-dom'

function BookmarkItem({bookmark }) {
  console.log(bookmark.text[0].mal_id)
  return (
     <>
      <Link to={`/anime/${bookmark.text[0].mal_id}`} key={bookmark.text[0].mal_id}>
        <img src={bookmark.text[0].images.jpg.large_image_url} alt="" />
      </Link>
    </>
  )
}

export default BookmarkItem

