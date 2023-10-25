import Form from "../../Form/Form";
import Input from "../../Form/Input/Input";
import { searchForm } from "../../../../utils/utils";
import { INPUT_TYPE_NAME, DEVICE_SETTINGS } from "../../../../utils/constants";
import "./SearchForm.css";

const SearchForm = ({ isLoading, onSubmitSearch, isSavedMoviesPage, valueSerch, setValueSerch, searchResultsStatus, setMaxShowMovies, device, isErrorShow, isFormActivated }) => {
  const { name, buttonTextLoading, buttonTextDefault, validate, inputs } = searchForm;

  const handleChange = (evt) => {
    setValueSerch((valueSerch) => {
      return { ...valueSerch, [evt.target.name]: evt.target.value };
    });
  };

  const handleChangeCheckbox = (evt) => {
    setValueSerch((valueSerch) => {
      return { ...valueSerch, [evt.target.name]: evt.target.checked };
    });

    if (!isSavedMoviesPage && searchResultsStatus.isFirstSearch) {
      return;
    }
    onSubmitSearch({ ...valueSerch, [evt.target.name]: evt.target.checked });
    !isSavedMoviesPage && setMaxShowMovies(DEVICE_SETTINGS[device].maxMovies);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitSearch(valueSerch);
    !isSavedMoviesPage && setMaxShowMovies(DEVICE_SETTINGS[device].maxMovies);
  };

  return (
    <Form
      validate={validate}
      name={name}
      buttonText={isLoading ? buttonTextLoading : buttonTextDefault}
      onSubmit={handleSubmit}
      isFormActivated={isFormActivated}
      searchResultsStatus={searchResultsStatus}
      isErrorShow={isErrorShow}
      isFormValid={valueSerch.search.length !== 0}
    >
      {inputs.map((input) => (
        <Input
          key={input.name}
          value={valueSerch[`${input.name}`]}
          input={input}
          isChecked={valueSerch.short}
          handleChange={input.type === INPUT_TYPE_NAME.checkbox ? handleChangeCheckbox : handleChange}
          validate={validate}
          isSavedMoviesPage={isSavedMoviesPage}
          disabled={!isFormActivated}
        />
      ))}
    </Form>
  );
};

export default SearchForm;
