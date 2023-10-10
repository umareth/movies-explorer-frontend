import "./Header.css";
import logo from "../../images/logo.svg";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const Header = ({ loggedIn }) => {
  const [menuActive, setMenuActive] = useState(false);
  const { pathname } = useLocation();
  const pathAuth = pathname === "/signup" || pathname === "/signin";

  const classNameHeader = () => {
    const classes = ["header"];

    if (menuActive) {
      classes.push("header_active");
    }
    if (loggedIn) {
      classes.push("header_login");
    }
    if (pathname === "/") {
      classes.push("header_cover");
    }
    if (pathAuth) {
      classes.push("header_auth");
    }

    return classes.join(" ");
  };

  function handleMenuOpen() {
    setMenuActive(true);
  }

  function handleMenuClose() {
    setMenuActive(false);
  }

  return (
    <header className={classNameHeader()}>
      <Link className="header__link header__link_logo" to="/">
        <img className="header__logo" src={logo} alt="HeaderLogo" />
      </Link>
      {!pathAuth &&
        (!loggedIn ? (
          <Navigation>
            <Link className="header__link" to="/signup">
              Регистрация
            </Link>
            <Link className="header__button" to="/signin">
              Войти
            </Link>
          </Navigation>
        ) : (
          <>
            <div className="header__wrapper">
              <Navigation>
                <ul className="header__list">
                  <li className="header__item">
                    <NavLink className="header__link" to="/">
                      Главная
                    </NavLink>
                  </li>
                  <li className="header__item">
                    <NavLink className="header__link" to="/movies">
                      Фильмы
                    </NavLink>
                  </li>
                  <li className="header__item">
                    <NavLink className="header__link" to="/saved-movies">
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
              <button className="header__button-close" type="button" onClick={handleMenuClose} />
            </div>
            <button className="header__button-menu" type="button" onClick={handleMenuOpen} />
          </>
        ))}
    </header>
  );
};

export default Header;
