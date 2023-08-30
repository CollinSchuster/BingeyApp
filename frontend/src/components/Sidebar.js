import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useGlobalContext } from '../Context/global';
import "../css/navbar.css"
import Bookmark from "./Bookmark";


function Sidebar() {
    const {popularAnime} = useGlobalContext()

    const sorted = popularAnime?.sort((a,b) => {
        return b.score - a.score
    })

    return (
        <SidebarStyled>
            <h3>Top 5 Popular</h3>
            <div className="anime">
                {sorted?.slice(0,5).map((anime) => {
                    return (
                        <div>
                            <Bookmark anime={anime} />
                            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                                <img src={anime.images.jpg.large_image_url} alt="" />
                                <h5>
                                    {anime.title}
                                </h5>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </SidebarStyled>
    )
}

const SidebarStyled = styled.div`
    position: relative;
    overflow: visible;
    background: var(--bg-tertiary); 
    border: 5px solid #e5e7eb;
    border-right: none;
    color: var(--text-secondary);
    padding-left:min(26px,2rem); //the min will pick between the smallest of the two values
    padding-right:min(26px,2rem);
    padding-top:1rem;
    padding-bottom: 1rem;
    

    .bookmark-icon-container {
        z-index:1;
        position: relative;
        color: white;
        top: 70px;
        left: 75%;
    }
    i {
    font-size: 200%;
    }
    
    .anime{
        display: flex;
        flex-direction: column;
        width: 150px;
        margin-top:-2rem;
        img{
            width: 100%;
            border-radius: 5px;
        }
        a{
            margin-top: 1rem;
            border: 5px solid #e5e7eb;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            gap: .4rem;
            color: var(--text-secondary);
            h3{
                font-size: 1.1rem;
            }
            h5{
                text-align: center;
            }
        }
    @media screen and (max-width: 616px) {
        margin-left: 0;
        .upcoming-anime {
            padding-left: 2rem;       
            padding-right: min(1rem,10px);
            grid-template-columns: repeat(auto-fill, minmax(100px, 2fr));
        }
      }
        }
    }
`;

export default Sidebar
