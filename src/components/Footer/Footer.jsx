import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";
import Navigation from "../Navigation/Navigation";

const Footer = () => {
  const { pathname } = useLocation();

  if (pathname !== "/profile" && pathname !== "/signup" && pathname !== "/signin") {
    return (
      <footer className={`footer${pathname === "/profile" ? " footer__profile" : ""}`}>
        <p className="footer__desc">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__wrapper">
          <Navigation className={"footer__nav"}>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="https://github.com/umareth" target="_blank" rel="noopener noreferrer">
                  Github
                </a>
              </li>
            </ul>
          </Navigation>
          <p className="footer__copyright">&copy; 2023</p>
        </div>
      </footer>
    );
  } else {
    return null;
  }
};

export default Footer;
