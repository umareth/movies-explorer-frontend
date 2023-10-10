import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./AboutMe.css";
import me from "../../../images/me.png";

const AboutMe = () => {
  return (
    <section className="aboutme main__wrap" id="about-me">
      <SectionTitle>Студент</SectionTitle>
      <div className="aboutme__wrapper">
        <div className="aboutme__info">
          <h3 className="aboutme__title">Виталий</h3>
          <p className="aboutme__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__desc">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании
            «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.{" "}
          </p>
          <Link className="aboutme__link" to="https://github.com/" target="_blank">
            Github
          </Link>
        </div>

        <img className="aboutme__img" src={me} alt="AboutMePhoto" />
      </div>
    </section>
  );
};

export default AboutMe;
