import { useState } from "react";
import plug from "../../../../images/plug.svg";
import "./MoviesCard.css";

const MoviesCard = ({ saved, movie, onCardClick, onCardLike, onCardDelete }) => {
  const [isLiked, setIsLiked] = useState(false);
  const movieLikeButton = `movies__button_like ${isLiked && "movies__button_like-active"}`;

  function handleClick() {}

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  function onImageErr(e) {
    e.target.src = plug;
  }

  return (
    <li className="movies__item" tabIndex={0}>
      <img className="movies__photo" src={movie.image ? movie.image : plug} onError={onImageErr} alt={movie.nameRU} onClick={handleClick} />
      <div className="movies__info">
        <h2 className="movies__title">{movie.nameRU}</h2>
        <button className={`movies__button ${saved ? "movies__button_deleet" : movieLikeButton}`} type="button" onClick={handleLikeClick} />
      </div>
      <p className="movies__duration">{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
    </li>
  );
};

export default MoviesCard;
