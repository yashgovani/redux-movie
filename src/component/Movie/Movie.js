import React from 'react';
import './Movie.css';

const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

const movie = (props) => (
  <div>
    {props.data.map((move) => {
      return (
        <div className="flip-card" key={move.id}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                className="MovieImage"
                src={POSTER_URL + move.backdrop_path}
                alt={move.title}
              />
              <h1>{move.title}</h1>
              <h4>Release Date : {move.release_date}</h4>
              <h4>Ratings : {move.vote_average}</h4>
            </div>
            <div className="flip-card-back">
              <p>{move.overview}</p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default movie;
