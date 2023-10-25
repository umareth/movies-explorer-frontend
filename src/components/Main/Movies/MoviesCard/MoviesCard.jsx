import plug from "../../../../images/plug.svg";
import "./MoviesCard.css";
import { BASE_URL_API_MOVIES } from "../../../../utils/constants";
import { Link } from "react-router-dom";

const MoviesCard = (props) => {
  const isLiked = !props.isSavedMoviesPage && props.savedMovies.some((item) => item.movieId === props.movie.id);
  const movieLikeButtonClass = `movies__button_like ${isLiked && "movies__button_like-active"}`;

  function handleLikeClick(e) {
    props.onMovieLike({
      country: props.movie.country,
      director: props.movie.director,
      duration: props.movie.duration,
      year: props.movie.year,
      description: props.movie.description,
      image: BASE_URL_API_MOVIES + props.movie.image.url,
      trailerLink: props.movie.trailerLink,
      nameRU: props.movie.nameRU,
      nameEN: props.movie.nameEN,
      thumbnail: BASE_URL_API_MOVIES + props.movie.image.formats.thumbnail.url,
      movieId: props.movie.id,
    });
  }

  function handleDeletClick() {
    props.onMoviedDelete(props.movie);
  }

  function onImageError(e) {
    e.target.src = plug;
  }

  return (
    <li className="movies__item">
      <Link className="movies__link" to={`${props.movie.trailerLink}`} target="_blank">
        <img className="movies__photo" src={props.isSavedMoviesPage ? props.movie.image : BASE_URL_API_MOVIES + props.movie.image.url ?? plug} onError={onImageError} alt={props.movie.nameRU} />
        <div className="movies__info">
          <h2 className="movies__title">{props.movie.nameRU || props.movie.nameEN}</h2>
        </div>
        <p className="movies__duration">
          {(props.movie.duration / 60) | 0}ч {props.movie.duration % 60}м
        </p>
      </Link>
      <button
        className={`movies__button ${props.isSavedMoviesPage ? "movies__button_deleet" : movieLikeButtonClass}`}
        type="button"
        onClick={!props.isSavedMoviesPage ? handleLikeClick : handleDeletClick}
      />
    </li>
  );
};

export default MoviesCard;
