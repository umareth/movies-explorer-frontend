import { useState } from "react";
import { formProfile } from "../../utils/data-list";
import "./Profile.css";
import Form from "../Main/Form/Form";
import Input from "../Main/Form/Input/Input";
import { useNavigate } from "react-router-dom";

const Profile = ({ isLoading, onSubmit, setLoggedIn }) => {
  const { validate, name, buttonTextDefault, inputs } = formProfile;
  const [value, setValue] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <main className="main">
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <Form validate={validate} name={name} buttonText={buttonTextDefault} onSubmit={handleFormSubmit}>
          <ul className={`form__list form__list_type_${name}`}>
            {inputs.map((input) => (
              <li className={`form__item form__item_type_${name}`} key={input.name + name}>
                <Input value={value[input.name] || input.placeholder} input={input} handleChange={handleInputChange} form={name} validate={validate} />
              </li>
            ))}
          </ul>
        </Form>
        <button className="profile__button-exit" onClick={handleSignOut}>
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
};

export default Profile;
