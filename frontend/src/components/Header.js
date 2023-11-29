import React, { useContext } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../images/header__logo.svg";
import { AppContext } from "../contexts/AppContext";

function Header() {
  const { email, loggedIn, handleSignOut } = useContext(AppContext);
  const route = window.location.pathname;

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      <ul className="header__navbar">
        {!loggedIn && route !== "/sign-up" && (
          <li>
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </li>
        )}
        {!loggedIn && route !== "/sign-in" && (
          <li>
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </li>
        )}
        {loggedIn && <li className="header__text">{email}</li>}
        {loggedIn && (
          <li>
            <button
              onClick={handleSignOut}
              className="header__link header__button"
            >
              Выйти
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}
export default Header;
