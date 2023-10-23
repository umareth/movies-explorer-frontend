import "./Auth.css";
import { Link, useLocation } from "react-router-dom";
import Form from "../Form/Form";
import { registerForm, loginForm } from "../../../utils/utils";
import Input from "../Form/Input/Input";
import Main from "../Main";
import { useValidate } from "../../../hooks/useValidate";

const Auth = (props) => {
  const { pathname } = useLocation();

  const formData = {
    "/signup": {
      form: registerForm,
      link: "/signin",
      linkText: "Войти",
      text: "Уже зарегистрированы?",
      onSubmit: props.onRegister,
    },
    "/signin": {
      form: loginForm,
      link: "/signup",
      linkText: "Регистрация",
      text: "Ещё не зарегистрированы?",
      onSubmit: props.onLogin,
    },
  };

  const authData = formData[pathname] || {
    form: {},
    link: "",
    linkText: "",
    text: "",
    onSubmit: () => {},
  };

  const { name, title, buttonTextLoading, buttonTextDefault, inputs } = authData.form;

  const { values, handleChange, errors, isInputValid, isFormValid } = useValidate(inputs);

  const handleChangeAuth = (e) => {
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setIsFormActivated(false);
    authData.onSubmit(values);
  };

  return (
    <Main>
      <section className="auth">
        <h1 className="auth__title">{title}</h1>
        <Form
          name={name}
          buttonText={props.isLoading ? buttonTextLoading : buttonTextDefault}
          onSubmit={handleSubmit}
          isFormActivated={props.isFormActivated}
          requestError={props.requestError}
          message={props.message}
          isSendRequest={props.isSendRequest}
          isFormValid={isFormValid}
        >
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li className={`form__item form__item_type_${name}`} key={input.name}>
                <Input value={values[input.name]} input={input} handleChange={handleChangeAuth} isInputValid={isInputValid} form={name} disabled={!props.isFormActivated} errors={errors} />
              </li>
            ))}
          </ul>
        </Form>
        {!props.isSendRequest && (
          <div className="auth__wrapper">
            <p className="auth__text">{authData.text}&nbsp;</p>
            <Link className="auth__link" to={authData.link}>
              {authData.linkText}
            </Link>
          </div>
        )}
      </section>
    </Main>
  );
};

export default Auth;
