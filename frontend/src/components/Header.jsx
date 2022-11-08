import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({onLogout, email}) {
  return (
    <header className="header">
          <img src={logo} alt="Логотип" className="header__logo" />
          <div className="header__container">
            <p className="header__email">{email}</p>
            <Routes>
              <Route path="/sign-up" element=
                {
                  <Link className="header__btn" to="/sign-in">Войти</Link>
                }
              />
              <Route path="/sign-in" element=
                {
                  <Link className="header__btn" to="/sign-up">Регистрация</Link>
                }
              />
              <Route path="/" element=
                {
                  <Link onClick={onLogout} className="header__btn" to="/sign-in">Выйти</Link>
                }
              />
            </Routes>
          </div>
      </header>
  )
}

export default Header;