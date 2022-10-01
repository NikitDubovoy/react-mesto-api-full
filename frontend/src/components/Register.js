import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  return (
    <section className="sign-up">
      <form name="sigh-up" onSubmit={props.onSubmite}>
        <h1 className="sign-up__title">Регистрация</h1>
        <input
          className="sign-up__input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={props.onEmail}
          value={props.valueEmail || ""}
        />
        <input
          className="sign-up__input"
          type="password"
          placeholder="Пароль"
          name="password"
          onChange={props.onPassword}
          value={props.valuePassword || ""}
        />
        <button className="sign-up__button">Зарегистрироваться</button>
        <p className="sign-up__text">
          Уже зарегистрированы?
          <Link className="sign-up__link" to="/sign-in">
            &nbsp; Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
