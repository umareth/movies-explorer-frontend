import Main from "../../Main";
import SearchForm from "../SearchForm/SearchForm";
import useSearch from "../../../../hooks/useSearch";
import Preloader from "../../../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";

const SavedMovies = (props) => {
  const [valueSearch, setValueSearch] = useState({ search: "", short: false });
  const [isMessageShow, setMessageShow] = useState(false);
  const { filteredMoviesList, searchResultsStatus, handleSubmitSearch } = useSearch({
    movies: props.savedMovies,
    isSavedMoviesPage: true,
  });

  useEffect(() => {
    if (!!filteredMoviesList) {
      if (filteredMoviesList.length === 0) {
        setMessageShow(true);
      } else {
        setMessageShow(false);
      }
    }
  }, [filteredMoviesList]);

  return (
    <Main>
      <SearchForm
        isSavedMoviesPage={true}
        valueSerch={valueSearch}
        setValueSerch={setValueSearch}
        onSubmitSearch={handleSubmitSearch}
        searchResultsStatus={searchResultsStatus}
        isMessageShow={isMessageShow}
        isFormActivated={!searchResultsStatus.isLoading}
      />
      {searchResultsStatus.isLoading ? <Preloader /> : <MoviesCardList isSavedMoviesPage={true} moviesList={filteredMoviesList} onMoviedDelete={props.onMoviedDelete} />}
    </Main>
  );
};

export default SavedMovies;
