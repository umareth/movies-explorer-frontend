import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = ({ saved, moviesList, onClickMore, ...restProps }) => {
  return (
    <section className="movies">
      <ul className="movies__card-list">
        {moviesList.map((movie) => (
          <MoviesCard movie={movie} key={movie.movieId} saved={saved} {...restProps} />
        ))}
      </ul>
      <div className="movies__wrapper">
        {!saved && (
          <button className="movies__button-more" onClick={onClickMore}>
            Ещё
          </button>
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
