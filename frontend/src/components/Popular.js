import React from "react";
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/global'
import styled from "styled-components"
import Bookmark from "./Bookmark";

function Popular(rendered) {
  const {popularAnime,isSearch,searchResults} = useGlobalContext()

  const conditionalRender = () => {
      if (!isSearch){
        return popularAnime.map((anime) => {
          return (
            <div>
              <Bookmark anime={anime} />
              <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <img src={anime.images.jpg.large_image_url} alt="" />
              </Link>
            </div>)
        })
      }else{
        return searchResults?.map((anime) => {
            return (
              <div className="img-container">
                <Bookmark anime={anime}  />
                <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
                </Link>
              </div>)
        })
    }
}


  return (
      <PopularStyled >
          {conditionalRender()}
      </PopularStyled>
  )
}

const PopularStyled = styled.div`
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
    left: 65%;
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
  div {
    max-height: 330px;
    max-width: 210px;
    aspect-rato: 3/2
    border-radius: 7px;
    margin-right: min(2rem,15px);
    margin-left: min(2em,15px);
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
    .bookmark-icon-container {
    }
  }
`;


export default Popular