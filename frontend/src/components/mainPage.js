import React, { useEffect, useRef } from "react";
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../Context/global';
import '../css/mainPage.css'
import "../css/main.css"
function Main() {
  return (
    <div className="main-page">
      <div className="trailer-block">
        <iframe src="https://www.youtube.com/embed/nNtVZxvfXCM?start=2&end=25&autoplay=1&mute=1&loop=1&rel=0&fs=0&controls=0&disablekb=1&playlist=nNtVZxvfXCM,2,25,N1lYe31b24E,rq1tllAUS1I,5,59,uZ7msg7gw-g,0,27,iNu4vs4fAn0,0,26&q=playlist" 
            title="Inline Frame Example"
            frameborder="=0"
            id="manual-trailer"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="true"></iframe>
      </div>
      <div className="bottom-fade">
      </div>
    </div>
  )
}

export default Main