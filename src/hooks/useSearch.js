import { useEffect, useState } from "react";
import { SHORT_TIME, KEY_SEARCH, MESSAGE } from "../utils/constants";
import { useLocation } from "react-router-dom";

const useSearch = ({ movies, isSavedMoviesPage }) => {
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  const { SEARCH_EMPTY, NO_MOVIES } = MESSAGE;

  const [searchOptions, setSearchOptions] = useState({
    search: "",
    short: false,
    savedMovies: [],
  });

  const [searchResultsStatus, setSearchResultsStatus] = useState({
    statusMessage: "",
    isLoading: false,
    isFirstSearch: false,
  });

  const { pathname } = useLocation();

  const filterSearhMovie = (value) => {
    return movies.filter((movie) => movie.nameRU.trim().toLowerCase().includes(value.search.trim().toLowerCase()) || movie.nameEN.trim().toLowerCase().includes(value.search.trim().toLowerCase()));
  };

  const filterMoviesByDuration = (moviesList) => {
    return moviesList.filter((movie) => movie.duration <= SHORT_TIME);
  };

  const filterMoviesBySearchValue = (value) => {
    if (value.short) {
      return filterMoviesByDuration(filterSearhMovie(value));
    } else {
      return filterSearhMovie(value);
    }
  };

  useEffect(() => {
    if (isSavedMoviesPage && !searchResultsStatus.isLoading) {
      setFilteredMoviesList(filterMoviesBySearchValue(searchOptions));
    }
  }, [isSavedMoviesPage, searchOptions]);

  useEffect(() => {
    if (filteredMoviesList.length === 0) {
      setSearchResultsStatus((searchResultsStatus) => ({ ...searchResultsStatus, statusMessage: NO_MOVIES }));
    } else {
      resetStatus();
    }
  }, [filteredMoviesList]);

  useEffect(() => {
    if (KEY_SEARCH in localStorage && !isSavedMoviesPage) {
      const searchOptions = JSON.parse(localStorage.getItem(KEY_SEARCH));
      setSearchOptions({
        search: searchOptions.search,
        short: searchOptions.short,
        savedMovies: searchOptions.savedMovies,
      });
      setFilteredMoviesList(searchOptions.savedMovies);
    }

    if (!localStorage.getItem(KEY_SEARCH) && !isSavedMoviesPage) {
      setSearchResultsStatus((data) => {
        return {
          ...data,
          isFirstSearch: true,
          statusMessage: SEARCH_EMPTY,
        };
      });
    }
  }, [SEARCH_EMPTY, isSavedMoviesPage]);

  useEffect(() => {
    if (!isSavedMoviesPage && localStorage.getItem(KEY_SEARCH)) {
      setFilteredMoviesList(searchOptions.savedMovies);
    }
  }, [isSavedMoviesPage, searchOptions]);

  useEffect(() => {
    if (isSavedMoviesPage) setFilteredMoviesList(filterMoviesBySearchValue(searchOptions));
  }, [isSavedMoviesPage, movies]);

  const setSearchResultsLoading = (mode) => {
    setSearchResultsStatus((prev) => {
      return {
        ...prev,
        isLoading: mode,
        isFirstSearch: false,
      };
    });
  };

  useEffect(() => {
    resetStatus();
  }, [pathname]);

  const resetStatus = () => {
    setSearchResultsStatus({
      ...searchResultsStatus,
      statusMessage: "",
      isLoading: false,
    });
  };

  const handleSubmitSearch = (value) => {
    if (isSavedMoviesPage) {
      setSearchOptions({
        search: value.search,
        short: value.short,
      });
    }

    resetStatus();
    setSearchResultsLoading(true);
    const data = filterMoviesBySearchValue(value);
    setTimeout(
      () => {
        if (data.length === 0) {
          setSearchResultsStatus((data) => {
            return {
              ...data,
              statusMessage: NO_MOVIES,
            };
          });
        }
        setFilteredMoviesList(data);
        setSearchResultsLoading(false);
      },
      searchResultsStatus.isFirstSearch ? 2000 : 500
    );

    if (!isSavedMoviesPage) {
      localStorage.setItem(
        KEY_SEARCH,
        JSON.stringify({
          savedMovies: data,
          short: value.short,
          search: value.search,
        })
      );
    }
  };
  return { filteredMoviesList, searchOptions, searchResultsStatus, handleSubmitSearch, setSearchResultsStatus, resetStatus };
};

export default useSearch;
