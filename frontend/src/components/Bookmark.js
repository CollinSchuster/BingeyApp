import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux"
import Spinner from '../components/Spinner';
import { getBookmarks,createBookmark,deleteBookmark,reset } from '../features/bookmarks/bookmarkSlice'
import axios from 'axios';

function Bookmark({ anime }) { // Accepts anime as a prop
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { bookmarks, isLoading, isError, message } = useSelector((state) => state.bookmarks);
  // const bookmarkKey = `${anime.mal_id}`;

  // Get the initial bookmarked status from localStorage or default to false
  const initialIsBookmarked = JSON.parse(localStorage.getItem(anime.mal_id)) || false;
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const text = {
    mal_id: anime.mal_id,
    images: {
      jpg: {
        large_image_url: anime.images.jpg.large_image_url
      }
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    if (!isBookmarked){
      dispatch(createBookmark({text}))
    } else {
      const bookmarkToDelete = bookmarks.find((bookmark) => anime.mal_id); // you do not need === sign because we are not trying to make a true statement. it will come back undefined
      console.log(bookmarkToDelete)
      if (bookmarkToDelete) {
        dispatch(deleteBookmark(bookmarkToDelete._id));
      }
    }

    const updatedIsBookmarked = !isBookmarked;
    setIsBookmarked(updatedIsBookmarked);
    // Save the updated bookmarked status in localStorage
    localStorage.setItem(anime.mal_id, JSON.stringify(updatedIsBookmarked));

  };
  const iconStyle = {
    color: isBookmarked ? 'orange' : 'white'
  }

  return (
    <div onClick={onClick} style={iconStyle} className='bookmark-icon-container'>
      <i class="fa-solid fa-bookmark"></i>
    </div>
  )
}

export default Bookmark



// const onClick = (e) => {
//   e.preventDefault();
//   setIsBookmarked(!isBookmarked)

//   // Dispatch an action to update the bookmark status in your Redux store
//   // dispatch({
//   //   type: 'UPDATE_BOOKMARK',
//   //   payload: { malId: anime.mal_id, isBookmarked: !isBookmarked },
//   // });
// }
// const iconStyle = {
//   color: isBookmarked? 'orange' : 'white'
// }
// // Fetch initial bookmark status from the API when component mounts
// useEffect((/*anime*/) => {
//   // if (isBookmarked) {
//   //   // Make an API request to check if the anime is bookmarked
//   //   axios.get(`/api/bookmarks/${anime.mal_id}`)
//   //   .then(response => {
//   //     setIsBookmarked(response.data.isBookmarked);
//   //   })
//   //   .catch(error => {
//   //     console.error('Error fetching bookmark status:', error);
//   //   });
//   // }
// }, [/*isBookmarked*/]);