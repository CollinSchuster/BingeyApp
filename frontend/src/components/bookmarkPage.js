import React, {useEffect} from 'react'
import { useGlobalContext } from '../Context/global'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {getBookmarks, reset} from '../features/bookmarks/bookmarkSlice'
import BookmarkItem from '../components/bookmarkItem'
import Spinner from '../components/Spinner';
import styled from 'styled-components'

function BookmarkPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth);
  const { bookmarks, isLoading, isError, message } = useSelector((state) => state.bookmarks);

  useEffect(() => {
    if (isError) {
      console.error('An error occurred:', message);
    }

    if (!user) {
      navigate('/login');
    } else {
      dispatch(getBookmarks());
      console.log(user.token)
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    // Redirect to login if user is not logged in
    return navigate('/login');
  }

  return (
    <BookmarkPageStyled>
      <div className='bookmark-header'>
        {bookmarks.length > 0 ? (
            <div >
              {bookmarks.map((bookmark) => (
                <div>
                  <BookmarkItemMemo key={bookmark.mal_id} bookmark={bookmark} />
                </div>
              ))}
            </div>
          ) : (
            <h3>You have not set any bookmarks</h3>
          )}
      </div>
    </BookmarkPageStyled>
  )
}


const BookmarkPageStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));

  margin-top: -1.6rem;
  position: relative;
  background: var(--bg-tertiary); 
  
  padding-bottom: 2rem;
  width: 100%;
  background: var(--bg-tertiary); 
  border-top: 5px solid #e5e7eb;

  .bookmark-icon-container {
    z-index:1;
    position: relative;
    color: white;
    top: 50px;
    left: 75%;
  }
  i {
    font-size: 200%;
  }

  a {
    max-height: 330px;
    max-width: 210px;
    aspect-rato: 3/2
    border-radius: 7px;
    margin-right: min(2rem,15px);
    margin-left: min(2em,15px);
    border: 5px solid #e5e7eb;

    display: flex; /* Added to make the images centered */
    align-items: center; /* Added to make the images centered */
    justify-content: center; /* Added to make the images centered */
    overflow: hidden; /* Added to hide any overflowing content */
  }

  a img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  @media screen and (max-width: 600px) {
    margin-left: 0;
    padding-left: 2rem;
    padding-right:5rem;
    width: 90%;
    .popular-anime {
      padding-left: 2rem;
      padding-right: min(1rem,10px);
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
  }
`;
// // Memoize the BookmarkItem component to prevent unnecessary re-renders
const BookmarkItemMemo = React.memo(BookmarkItem);

export default BookmarkPage
