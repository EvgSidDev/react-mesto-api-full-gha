import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sign({ name, title, buttonText, onSubmit, visibleSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handelChangePassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="sign">
      <h1 className="sign__title">{title}</h1>
      <form
        name={name}
        method="post"
        className="sign__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          id="signEmail"
          name="sign-email"
          type="email"
          className="sign__input"
          required
          placeholder="Email"
          onChange={handleChangeEmail}
          value={email || ""}
        />
        <input
          id="signPassword"
          name="sign-password"
          type="password"
          className="sign__input"
          required
          placeholder="Password"
          onChange={handelChangePassword}
          value={password || ""}
        />
        <button type="submit" className="sign__button">
          {buttonText}
        </button>
      </form>
      {visibleSignIn && (
        <p className="sign__login-label">
          Уже зарегистрированы?&nbsp;
          <Link to="/sign-in" className="sign__login-link">
            Войти
          </Link>
        </p>
      )}
    </div>
  );
}

export default Sign;
