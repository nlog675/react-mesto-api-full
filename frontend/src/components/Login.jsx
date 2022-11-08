import React from "react";
import { useState } from "react";

const Login = ({onLogin}) => {
  const initValues = {
    email: '',
    password: '',
  }
  const [state, setState] = useState(initValues);

  const handleChange = e => {
    const { name, value } = e.target;
  setState(old => ({
    ...old,
    [name]: value
  }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = state;

    if (!email || !password) return;

    onLogin(email, password)
      .catch((err) => console.log(err))
  }

  return(
    <form 
      onSubmit={handleSubmit}
      className="auth-form"
    >
      <h3 className="auth-form__title">Вход</h3>
      <input 
        onChange={handleChange}
        className="auth-form__input"
        id="email"
        name="email"
        type="text"
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
        Войти
      </button>
    </form>

  );
};

export default Login;