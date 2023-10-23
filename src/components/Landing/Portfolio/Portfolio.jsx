import { Link } from "react-router-dom";
import Navigation from "../../Navigation/Navigation";
import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <Navigation className="portfolio__nav">
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <Link className="portfolio__link" to="https://github.com/Valerkamade/movies-explorer-frontend/" target="_blank">
              Статичный сайт
            </Link>
          </li>
          <li className="portfolio__item">
            <Link className="portfolio__link" to="https://umareth.github.io/russian-travel/" target="_blank">
              Адаптивный сайт
            </Link>
          </li>
          <li className="portfolio__item">
            <Link className="portfolio__link" to="http://shakh.eth.nomoredomainsicu.ru" target="_blank">
              Одностраничное приложение
            </Link>
          </li>
        </ul>
      </Navigation>
    </section>
  );
};

export default Portfolio;
