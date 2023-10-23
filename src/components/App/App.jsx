import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Landing from "../Landing/Landing";
import Error from "../Main/Error/Error";
import Movies from "../Main/Movies/Movies";
import Profile from "../Main/Profile/Profile";
import SavedMovies from "../Main/Movies/SavedMovies/SavedMovies";
import Auth from "../Main/Auth/Auth";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { api } from "../../utils/MainApi";
import { apiMovies } from "../../utils/MoviesApi";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../contexts/MessageContext";
import { selectErrMessage, clearCookies } from "../../utils/utils";
import { DEVICE_SETTING, KEYWORD_MOVIES, KEYWORD_RESIZE, MESSAGE } from "../../utils/constants";

const App = () => {
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [isSendRequest, setIsSendRequest] = useState(false);
  const [isErrorPage, setIsErrorPage] = useState(false);

  const [device, setDevice] = useState(DEVICE_SETTING.desktop.device);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const { pathname } = useLocation();
  const [requestError, setRequestError] = useState({});
  const navigate = useNavigate();
  const resizeCooldown = useRef(null);
  const [isFormActivated, setIsFormActivated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
  });
  const [message, setMessage] = useState({
    isMessageShow: false,
    isError: false,
    text: "",
  });

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      checkToken();
      getAllMovies();
      getSaveMovies();
      if (KEYWORD_MOVIES in localStorage) {
        setAllMovies(JSON.parse(localStorage.getItem(KEYWORD_MOVIES)));
      }
    }
    setTimeout(() => {
      setIsLoadingContent(false);
    }, 500);
  }, [currentUser.isLoggedIn]);

  useEffect(() => {
    updateDeviceOnResize();
    window.addEventListener(KEYWORD_RESIZE, updateDeviceOnResize);

    return () => {
      clearTimeout(resizeCooldown.current);
      window.removeEventListener(KEYWORD_RESIZE, updateDeviceOnResize);
    };
  }, [device]);

  // Проверить токен
  const checkToken = () => {
    api
      .checkToken()
      .then((res) => {
        if (localStorage.getItem("isLoggedIn")) {
          setCurrentUser({
            name: res.name,
            email: res.email,
            isLoggedIn: true,
          });
        }
      })
      .catch((err) => {
        setCurrentUser({ isLoggedIn: false });
      });
  };

  // Получить сохраненные фильмы
  const getSaveMovies = async () => {
    try {
      const movies = await api.getMovies();
      setSavedMovies(movies);
    } catch (err) {
      setRequestError(err);
    }
  };

  // Получить каталог фильмов с апишки
  const getAllMovies = async () => {
    try {
      const allMovies = await apiMovies.getMovies();
      setAllMovies(allMovies);
      return allMovies;
    } catch (err) {
      setMessage({
        isMessageShow: true,
        isError: true,
        text: MESSAGE.SERVER_ERROR,
      });
    }
  };

  // авторизация пользователя
  const loginUser = async (value) => {
    setMessage({ isMessageShow: false, isError: false, text: "" });
    setIsSendRequest(true);

    try {
      const res = await api.login(value);
      document.cookie = `token=${res?.token}`;
      localStorage.setItem("isLoggedIn", true);
      navigate("/movies", { replace: true });
      setCurrentUser({ ...currentUser, isLoggedIn: true });
    } catch (err) {
      setIsFormActivated(true);
      const errMessage = selectErrMessage(err);
      setTimeout(() => {
        setMessage({ isMessageShow: true, isError: true, text: errMessage });
      }, 500);
    } finally {
      setTimeout(() => {
        setIsSendRequest(false);
      }, 500);
    }
  };

  // регистрация пользователя
  const registerUser = (value) => {
    setMessage({ isMessageShow: false, isError: false, text: "" });
    setIsSendRequest(true);
    api
      .register(value)
      .then(() => {
        setMessage({
          isMessageShow: true,
          isError: false,
          text: MESSAGE.REGISTRATION_SUCCESS,
        });
        setTimeout(() => {
          loginUser(value);
          setMessage({
            isMessageShow: false,
            isError: false,
            text: "",
          });
        }, 2000);
      })
      .catch((err) => {
        setIsFormActivated(true);
        setTimeout(() => {
          setMessage({
            isMessageShow: true,
            isError: true,
            text: selectErrMessage(err),
          });
        }, 500);
      })
      .finally(
        setTimeout(() => {
          setIsSendRequest(false);
        }, 500)
      );
  };

  // отрисовка добавлений карт в зависимости от разрешения экрана
  const updateDeviceOnResize = () => {
    clearTimeout(resizeCooldown.current);
    resizeCooldown.current = setTimeout(() => {
      switch (true) {
        case window.innerWidth < DEVICE_SETTING.mobile.maxSize:
          setDevice(DEVICE_SETTING.mobile.device);
          break;
        case window.innerWidth < DEVICE_SETTING.tablet.maxSize:
          setDevice(DEVICE_SETTING.tablet.device);
          break;
        default:
          setDevice(DEVICE_SETTING.desktop.device);
      }
    }, 500);
  };

  // Выставления лайка для карточки
  const handleMovieLike = async (movie) => {
    const isLiked = savedMovies.some((item) => item.movieId === movie.movieId);

    try {
      if (!isLiked) {
        const newMovie = await api.addSavedMovie(movie);
        setSavedMovies([...savedMovies, newMovie]);
      } else {
        const id = savedMovies.find((item) => item.movieId === movie.movieId)._id;
        await api.deleteMovie(id);
        setSavedMovies((movies) => movies.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err); // Обработка ошибок
    }
  };

  // Удаление  карточки
  const handleDeleteMovie = async (movie) => {
    try {
      await api.deleteMovie(movie._id);
      setSavedMovies((movies) => movies.filter((item) => item._id !== movie._id));
    } catch (err) {
      console.error(err); // Обработка ошибок
    }
  };

  // Обновление данных пользователя
  const handleProfileUpdate = async (value) => {
    setMessage({ isMessageShow: false, isError: false, text: "" });
    setIsSendRequest(true);

    try {
      const { name, email } = await api.updateUserInfo(value);
      setCurrentUser({ ...currentUser, name, email });
      setIsFormActivated(false);
      setTimeout(() => {
        setMessage({
          isMessageShow: true,
          isError: false,
          text: MESSAGE.PROFILE_UPDATED,
        });
      }, 500);
    } catch (err) {
      setIsFormActivated(true);
      const errMessage = selectErrMessage(err);
      setTimeout(() => {
        setMessage({ isMessageShow: true, isError: true, text: errMessage });
      }, 500);
    } finally {
      setTimeout(() => {
        setIsSendRequest(false);
      }, 500);
    }
  };
  // Выход и очистка кук
  const handleSignOut = async () => {
    try {
      await api.logout();
      localStorage.clear();
      clearCookies();
      setCurrentUser({ name: "", email: "", isLoggedIn: false });
      setSavedMovies([]);
      setRequestError({});
      setMessage({
        isMessageShow: false,
        isError: false,
        text: "",
      });
      setIsFormActivated(true);
      setAllMovies([]);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoadingContent(false);
      }, 500);
    }
  };

  useEffect(() => {
    setMessage((message) => ({ ...message, text: "" }));
  }, [pathname]);

  return isLoadingContent ? (
    <Preloader />
  ) : (
    <MessageContext.Provider value={message}>
      <CurrentUserContext.Provider value={currentUser}>
        {!isErrorPage && <Header />}
        <Routes>
          <Route path={"/"} element={<Landing isLoadingContent={isLoadingContent} />} />
          <Route
            path={"/movies"}
            element={
              <ProtectedRouteElement
                element={Movies}
                isLoggedIn={currentUser.isLoggedIn}
                movies={allMovies}
                onMovieLike={handleMovieLike}
                savedMovies={savedMovies}
                device={device}
                isFormActivated={isFormActivated}
                getMovies={getAllMovies}
              />
            }
          />
          <Route path={"/saved-movies"} element={<ProtectedRouteElement element={SavedMovies} onMoviedDelete={handleDeleteMovie} savedMovies={savedMovies} isLoggedIn={currentUser.isLoggedIn} />} />
          <Route
            path={"/profile"}
            element={
              <ProtectedRouteElement
                element={Profile}
                onSubmit={handleProfileUpdate}
                isLoggedIn={currentUser.isLoggedIn}
                onSignout={handleSignOut}
                isLoadingContent={isLoadingContent}
                setRequestError={setRequestError}
                requestError={requestError}
                isFormActivated={isFormActivated}
                setIsFormActivated={setIsFormActivated}
                isSendRequest={isSendRequest}
                setMessage={setMessage}
              />
            }
          />
          <Route
            path={"/signup"}
            element={
              currentUser.isLoggedIn ? (
                <Navigate to={"/"} replace />
              ) : (
                <Auth
                  onRegister={registerUser}
                  requestError={requestError}
                  setRequestError={setRequestError}
                  isLoadingContent={isLoadingContent}
                  message={message}
                  setMessage={setMessage}
                  setIsFormActivated={setIsFormActivated}
                  isFormActivated={isFormActivated}
                  isSendRequest={isSendRequest}
                />
              )
            }
          />
          <Route
            path={"/signin"}
            element={
              currentUser.isLoggedIn ? (
                <Navigate to={"/movies"} replace />
              ) : (
                <Auth
                  onLogin={loginUser}
                  requestError={requestError}
                  setRequestError={setRequestError}
                  isLoadingContent={isLoadingContent}
                  message={message}
                  setMessage={setMessage}
                  setIsFormActivated={setIsFormActivated}
                  isFormActivated={isFormActivated}
                  isSendRequest={isSendRequest}
                />
              )
            }
          />
          <Route path={"*"} element={<Error setIsErrorPage={setIsErrorPage} />} />
        </Routes>

        {!isErrorPage && pathname !== "/signin" && "/signup" && <Footer />}
      </CurrentUserContext.Provider>
    </MessageContext.Provider>
  );
};

export default App;
