import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import { useEffect, useState } from "react";
import Main from "../Main";
import useSearch from "../../../hooks/useSearch";
import Preloader from "../../Preloader/Preloader";
import { DEVICE_SETTINGS } from "../../../utils/constants";

const Movies = ({ movies, onMovieLike, savedMovies, device, setMessage }) => {
  const { filteredMoviesList, searchOptions, searchResultsStatus, handleSubmitSearch } = useSearch({
    movies: movies,
    isSavedMoviesPage: false,
  });

  const [valueSerch, setValueSerch] = useState({
    search: searchOptions.search ?? "",
    short: savedMovies.short ?? false,
  });

  const [isShowButtonMore, setShowButtonMore] = useState(false);
  const [moreMovies, setMoreMovies] = useState("");
  const [maxShowMovies, setMaxShowMovies] = useState("");

  const handleClickMoreMovies = () => {
    setMaxShowMovies((maxMovies) => maxMovies + moreMovies);
  };

  useEffect(() => {
    if ("search" in localStorage) {
      const { search, short } = JSON.parse(localStorage.getItem("search"));
      setValueSerch({
        search: search,
        short: short,
      });
    }
  }, []);

  useEffect(() => {
    setMaxShowMovies(DEVICE_SETTINGS[device].maxMovies);
    setMoreMovies(DEVICE_SETTINGS[device].moreMovies);
  }, [device, movies]);

  useEffect(() => {
    if (!!filteredMoviesList) {
      if (!(filteredMoviesList.length <= maxShowMovies)) {
        setShowButtonMore(true);
      } else {
        setShowButtonMore(false);
      }
    }
  }, [filteredMoviesList, maxShowMovies]);

  return (
    <Main>
      <SearchForm
        onSubmitSearch={handleSubmitSearch}
        isSavedMoviesPage={false}
        valueSerch={valueSerch}
        setValueSerch={setValueSerch}
        searchResultsStatus={searchResultsStatus}
        searchOptions={searchOptions}
        setMaxShowMovies={setMaxShowMovies}
        device={device}
        setMessage={setMessage}
        isFormActivated={!searchResultsStatus.isLoading}
      />
      {searchResultsStatus.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isSavedMoviesPage={false}
          moviesList={filteredMoviesList.slice(0, maxShowMovies)}
          searchResultsStatus={searchResultsStatus}
          onMovieLike={onMovieLike}
          savedMovies={savedMovies}
          isShowMoreButton={isShowButtonMore}
          onSubmitMoreButton={handleClickMoreMovies}
          showMoreButton={isShowButtonMore}
        />
      )}
    </Main>
  );
};

export default Movies;
