import SectionTite from "../SectionTitle/SectionTitle";
import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section className="about main__wrap" id="about">
      <SectionTite>О проекте</SectionTite>
      <ul className="about__list">
        <li className="about__item">
          <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about__item">
          <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <dl className="about__result">
        <div className="about__result-wrap">
          <dt className="about__result-duration">1 неделя</dt>
          <dd className="about__result-name">Back-end</dd>
        </div>
        <div className="about__result-wrap">
          <dt className="about__result-duration">4 недели</dt>
          <dd className="about__result-name">Front-end</dd>
        </div>
      </dl>
    </section>
  );
};

export default AboutProject;
