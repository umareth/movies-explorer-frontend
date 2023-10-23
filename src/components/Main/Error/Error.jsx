import { useEffect } from "react";
import Main from "../Main";
import "./Error.css";
import { Link } from "react-router-dom";

export default function Error(props) {
  useEffect(() => {
    props.setIsErrPage(true);
  }, [props.setIsErrPage]);

  return (
    <Main className="error">
      <h1 className="error__title">404</h1>
      <p className="error__subtitle">Страница не найдена</p>
      <Link className="error__link" to={-1} onClick={() => props.setIsErrPage(false)}>
        Назад
      </Link>
    </Main>
  );
}
