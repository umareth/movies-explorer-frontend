import "./Header.css";
import logo from "../../images/logo.svg";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { pathname } = useLocation();
  const pathAuth = pathname === "/signup" || pathname === "/signin";
  const { isLoggedIn } = useContext(CurrentUserContext);

  const classNameHeaderContainer = () => {
    let className = "header";
    if (menuActive) {
      className = `${className} header_active`;
    }
    if (isLoggedIn) {
      className = `${className} header_login`;
    }
    if (pathname === "/") {
      className = `${className} header__cover`;
    }
    if (pathAuth) {
      className = `${className} header_auth`;
    }
    return className;
  };

  function handleMenuClick() {
    setMenuActive(true);
  }

  function handleCloseClick() {
    setMenuActive(false);
  }

  useEffect(() => {
    setMenuActive(false);
  }, [pathname]);

  return (
    <header className="header">
      <div className={classNameHeaderContainer()}>
        <Link className="header__link header__link_logo" to={"/"}>
          <img className="header__logo" src={logo} alt="SaveMovie" />
        </Link>
        {!pathAuth &&
          (!isLoggedIn ? (
            <Navigation>
              <Link className="header__link" to={"/signup"}>
                Регистрация
              </Link>
              <Link className="header__button" to={"/signin"}>
                Войти
              </Link>
            </Navigation>
          ) : (
            <>
              <div className="header__wrapper">
                <Navigation>
                  <ul className="header__list">
                    <li className="header__item">
                      <NavLink className="header__link" to={"/"}>
                        Главная
                      </NavLink>
                    </li>
                    <li className="header__item">
                      <NavLink className="header__link" to={"/movies"}>
                        Фильмы
                      </NavLink>
                    </li>
                    <li className="header__item">
                      <NavLink className="header__link" to={"/saved-movies"}>
                        Сохранённые фильмы
                      </NavLink>
                    </li>
                  </ul>
                </Navigation>
                <Navigation>
                  <NavLink className="header__link header__link-profile" to="/profile">
                    <div className="header__link-name">Аккаунт</div>
                    <div className={`header__link-icon ${pathname === "/" ? "header__link-icon-login" : ""}`}></div>
                  </NavLink>
                </Navigation>
                <button className="header__button-close" type="button" aria-label="Закрыть меню" onClick={handleCloseClick} />
              </div>
              <button className="header__button-menu" type="button" aria-label="Окрыть меню" onClick={handleMenuClick} />
            </>
          ))}
      </div>
    </header>
  );
};

export default Header;
