import { useState, useEffect } from "react";
import { INPUT_NAME, INPUT_TYPE_NAME, MESSAGE, REGX_EMAIL, REGX_NAME } from "../utils/constants";

export function useValidate(inputs) {
  const initialInputState = inputs.reduce((acc, input) => ({ ...acc, [input.name]: false }), {});
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setInputValid] = useState(initialInputState);
  const [isFormValid, setFormValid] = useState(false);

  const resetInputState = () => {
    setErrors({});
    setInputValid(initialInputState);
    setValues({});
  };

  useEffect(() => {
    resetInputState();
  }, [inputs]);

  const handleInputChange = (evt) => {
    const { name, value, type } = evt.target;
    const isValid = evt.target.checkValidity();

    if (name === INPUT_NAME.emailInput && !REGX_EMAIL.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: MESSAGE.INVALID_EMAIL }));
    } else if (name === INPUT_NAME.nameInput && !REGX_NAME.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: MESSAGE.INVALID_NAME }));
    } else if (type === INPUT_TYPE_NAME.checkbox) {
      // Ничего не делать для чекбоксов
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: evt.target.validationMessage }));
      setInputValid((prevInputValid) => ({ ...prevInputValid, [name]: isValid }));
    }

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (Object.values(isInputValid).every((valid) => valid)) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [isInputValid]);

  return { values, handleChange: handleInputChange, errors, isInputValid, isFormValid, setValues, setInputValid, setFormValid };
}
