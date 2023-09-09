import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context/global'
import Popular from './Popular'
import styled from 'styled-components'
import Upcoming from './Upcoming'
import Airing from './Airing'

function SearchPage() {

  const {handleSubmit, 
      search, 
      searchAnime,
      handleChange ,
      getUpcomingAnime,
      getAiringAnime,
      getPopularAnime,
   } = useGlobalContext()

  const [rendered,setRendered] = React.useState('popular')
  const [backgroundColor, setBackgroundColor] = React.useState("white");

  const switchComponent = () => {
    switch(rendered){
        case 'popular':
            return <Popular rendered={rendered} />
        case 'airing':
            return <Airing rendered={rendered} />
        case 'upcoming':
            return <Upcoming rendered={rendered} />
        default:
            return <Popular rendered={rendered} />
    }
}
  const handleButtonClick = (category) => {
        setRendered(category);
        setBackgroundColor('lightblue'); // Set the background color to lightblue on button click
        switch (category) {
            case 'popular':
                getPopularAnime();
                break;
            case 'airing':
                getAiringAnime();
                break;
            case 'upcoming':
                getUpcomingAnime();
                break;
            default:
                break;
    }
  };
   // Add a new state to track the window width
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   // Use useEffect to update windowWidth on window resize
   useEffect(() => {
     const handleResize = () => {
       setWindowWidth(window.innerWidth);
     };
     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
   }, []);

  return (
    <HomepageStyled>
        <header>
            <div className="logo">
                <h1>
                    {rendered === 'popular' ? 'Popular Anime' : 
                    rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
                </h1>
            </div>
            <div className="search-container">
                {windowWidth >= 700 ? <div className="filter-btn popular-filter">
                    <button onClick={() => {
                        handleButtonClick('popular')
                        setRendered('popular')
                    }} style={{ backgroundColor: rendered === 'popular' ? backgroundColor : 'white' }} >Popular
                    </button> 
                </div> : <></>}
                <form action="" className="search-form" onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
                        <button type="submit">Search</button>
                    </div>
                </form>
                <div className='grid-container'>
                  {windowWidth <= 700 ? <div className="filter-btn popular-filter">
                      <button onClick={() => {
                          handleButtonClick('popular')
                          setRendered('popular') // something here is different from the other two
                      }} style={{ backgroundColor: rendered === 'popular' ? backgroundColor : 'white' }} >Popular
                      </button> 
                  </div> : <></>}
                  <div className="filter-btn airing-filter">
                      <button onClick={() => {
                          handleButtonClick('airing')
                          setRendered('airing')
                          getAiringAnime()
                      }} style={{ backgroundColor: rendered === 'airing' ? backgroundColor : 'white' }}>Airing</button>
                  </div>
                  <div className="filter-btn upcoming-filter">
                      <button onClick={() => {
                          handleButtonClick('upcoming')
                          setRendered('upcoming')
                          getUpcomingAnime()
                      }} style={{ backgroundColor: rendered === 'upcoming' ? backgroundColor : 'white' }} >Upcoming</button>
                  </div>
                </div>
            </div>
        </header>
        {switchComponent()}
    </HomepageStyled >
)
}

const HomepageStyled = styled.div`
  background: var(--bg-tertiary); 

  h1 {
    font-family: 'Bangers', cursive;
  }
  header {
    padding: 2rem;
    transition: all 0.4s ease-in-out;
  }

    .logo {
      margin-top: -0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      border-radius:30px
    }

    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      .grid-container {
        display: flex;
      }
      .filter-btn {
        font-family: 'Bangers', cursive;
      }

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        outline: none;
        border-radius: 30px;
        font-size: 1.2rem;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: 5px solid #e5e7eb;
      }

      form {
        position: relative;
        width: 50%;

        .input-control {
          position: relative;
          font-family: 'Bangers', cursive;
          transition: all 0.4s ease-in-out;
        }

        .input-control input {
          width: 80%;
          font-family: 'Bangers', cursive;
          padding: 0.5rem 1.5rem;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 5px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
        }

        .input-control button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
    }
  }
  @media screen and (max-width: 600px) {
    padding-bottom: 2rem;
    .search-container {
      display: grid;
      gap: 0.25rem;
      button {
        width: auto;
      }
      form {
        width: 100%;
      }
      div {
        /* Center the grid horizontally and vertically */
        justify-content: center;
        align-items: center;
      }
    }
    .grid-container {
      display: flex;
    }
  }
`;

export default SearchPage