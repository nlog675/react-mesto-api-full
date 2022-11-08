import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({onRegister}) => {
const [state, setState] = useState({
  email: '',
  password: '',
});

const handleChange = e => {
  const { name, value } = e.target;
  setState(old => ({
    ...state,
    [name]: value
  }));
};

const handleSubmit = e => {
  e.preventDefault();
  const { email, password } = state;

  if (!email || !password) return;

  onRegister(email, password)
    .catch((err) => console.log(err))
}

  return(
    <form 
      onSubmit={handleSubmit}
      className="auth-form"
    >
      <h3 className="auth-form__title">Регистрация</h3>
      <input 
        onChange={handleChange}
        className="auth-form__input"
        id="email"
        name="email"
        type="email"
        placeholder="Email" 
        value={state.email}
        required
      />
      <input 
        onChange={handleChange}
        className="auth-form__input"
        id="password"
        name="password"
        type="password"
        placeholder="Пароль" 
        value={state.password}
        required
      />
      <button type="submit" className="auth-form__submit-btn">
        Зарегистрироваться
      </button>
      <p className="auth-form__caption">
        Уже зарегистрированы?
        <Link to="/sign-in" className="auth-form__sign-in-link"> Войти</Link>
      </p>
    </form>

  );
};

export default Register;