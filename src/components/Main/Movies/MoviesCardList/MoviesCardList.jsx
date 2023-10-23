import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = (props) => {
  return (
    <section className="movies">
      <div className="movies__card-wrapper">
        <ul className="movies__card-list">
          {props.moviesList.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id || movie._id}
              onMovieLike={props.onMovieLike}
              onMoviedDelete={props.onMoviedDelete}
              isSavedMoviesPage={props.isSavedMoviesPage}
              currentUser={props.currentUser}
              savedMovies={props.savedMovies}
            />
          ))}
        </ul>
      </div>
      <div className="movies__wrapper">
        {props.showMoreButton && (
          <button className="movies__button-more" onClick={props.onSubmitMoreButton}>
            Ещё
          </button>
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
