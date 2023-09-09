import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom'
import "../css/main.css"
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AnimeItem() {
  const {id} = useParams()
  const navigate = useNavigate();

    // Function to handle going back to the previous page
    const goBack = () => {
      navigate(-1); // Navigate back one step in the history stack
    };

  //state
  const [anime, setAnime] = React.useState({})
  const [characters, setCharacters] = React.useState([])
  const [showMore, setShowMore] = React.useState(false)

  //destructure anime
  const {
    title, synopsis, 
    trailer,duration,aired, 
    season, images, rank, 
    score,scored_by, popularity, 
    status, rating, source } = anime

  //get Anime based on id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
    const data = await response.json()
    setAnime(data.data)
}

  //get characters
  const getCharacters = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
    const data = await response.json()
    setCharacters(data.data)
    console.log(data.data)
}


// initial render
  useEffect(() => {
    getAnime(id)
    getCharacters(id)
  },[id])

  return (
    <AnimeItemStyled>
      <ArrowBackIcon onClick={goBack}/>
      <h1>{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt="" />
          </div>
          <div className="anime-details">
            <p><span>Aired:</span><span>{aired?.string}</span></p>
            <p><span>Rating:</span><span>{rating}</span></p>
            <p><span>Rank:</span><span>{rank}</span></p>
            <p><span>Score:</span><span>{score}</span></p>
            <p><span>Scored By:</span><span>{scored_by}</span></p>
            <p><span>Popularity:</span><span>{popularity}</span></p>
            <p><span>Status:</span><span>{status}</span></p>
            <p><span>Source:</span><span>{source}</span></p>
            <p><span>Season:</span><span>{season}</span></p>
            <p><span>Duration:</span><span>{duration}</span></p>
          </div>
        </div>
        <p className="description">
            {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}  
            <button onClick={() => {
                setShowMore(!showMore)
            }}>{showMore ? 'Show Less': 'Read More'}</button>
        </p>
      </div>
      <h3 className="head">Trailer</h3>
            <div className="trailer-con">
                {trailer?.embed_url ? 
                    <iframe 
                        src={trailer?.embed_url} 
                        title="Inline Frame Example"
                        width="800"
                        height="450"
                        autoplay="false"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen="true">
                    </iframe> :
                    <h3>Trailer not available</h3>
                }
            </div>
            <h3 className="head">Characters</h3>
            <div className="characters">
                {characters?.map((character, index) => {
                    const {role} = character
                    const {images, name, mal_id} = character.character
                    return <Link to={`/character/${mal_id}`} key={index}>
                        <div className="character">
                            <img src={images?.jpg.image_url} alt="" />
                            <h4>{name}</h4>
                            <p>{role}</p>
                        </div>
                    </Link>
                })}
            </div>
    </AnimeItemStyled>
  )
}

const AnimeItemStyled = styled.div`
  padding: 3rem;
  background-color: #ededed;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right,#f6004d,#c50171);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all .4s ease-in-out;
    
    &:hover {
      transform: skew(-3deg);
    }
  }

  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient(to right,#f6004d,#c50171);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 2rem;
    color: #6c7983;
    line-height: 1.7rem;

    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;

    iframe {
      outline: none;
      border: 5px solid #e5e7eb;
      padding: 1.5rem;
      border-radius: 10px;
      background-color: #fff;
    }
  }

  .details {
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #e5e7eb;

    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: center; /* Center the images vertically */
      gap: 1rem;

      img {
        width: 100%;
        border-radius: 7px;
      }
    }

    .anime-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        display: flex;
        gap: 0.5rem;
      }

      p span:first-child {
        font-weight: 600;
        color: #454e56;
      }
    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid #e5e7eb;

    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      background-color: #ededed;
      transition: all .4s ease-in-out;

      img {
        width: 100%;
        border-radius: 7px;
        max-height: 200px; /* Limit the maximum height of the images */
        object-fit: cover; /* Ensure the images maintain their aspect ratio */
      }

      h4 {
        padding: 0.5rem 0;
        color: #454e56;
      }

      p {
        color: var(--bg-primary);
      }

      &:hover {
        transform: translateY(-5px);
      }
    }
  }
`;


export default AnimeItem