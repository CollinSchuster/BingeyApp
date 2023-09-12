import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context/global'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import Bookmark from "./Bookmark";

function Airing({rendered}) {
    const {airingAnime ,isSearch, searchResults} = useGlobalContext()

    const conditionalRender = () => {
        if(!isSearch && rendered === 'airing'){
            return airingAnime?.map((anime) => {
                return (
                    <div>
                        <Bookmark anime={anime}  />
                        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                            <img src={anime.images.jpg.large_image_url} alt="" />
                        </Link>
                    </div>)
            })
        }else{
            return searchResults?.map((anime) => {
                return (
                    <div>
                        <Bookmark anime={anime}  />
                        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                            <img src={anime.images.jpg.large_image_url} alt="" />
                        </Link>
                    </div>)
            })
        }
    }

    return (
        <AiringStyled>
            <div className="airing-anime">
                {conditionalRender()}
            </div>
            <Sidebar />
        </AiringStyled>
    )
}

const AiringStyled = styled.div`
    display: flex;
    margin-top: -1.6rem;
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
    .airing-anime{
        position absolute;
        background: var(--bg-tertiary); 
        padding-top: -1rem;
        padding-right: min(1rem,10px);
        padding-bottom: 2rem;
        padding-left:6rem;  
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        grid-gap: 2rem;
        border-top: 5px solid #e5e7eb;
        a{
            max-height: 330px;
            max-width: 210px;
            aspect-rato: 3/2
            border-radius: 7px;
            border: 5px solid #e5e7eb;
            display: flex; /* Added to make the images centered */
            align-items: center; /* Added to make the images centered */
            justify-content: center; /* Added to make the images centered */
            overflow: hidden; /* Added to hide any overflowing content */
        }
        a img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
    }
    @media screen and (max-width: 616px) {
        margin-left: 0;
        .airing-anime {
            padding-left: 2rem;
            padding-right: min(1rem,10px);
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        }
      }
`;


export default Airing