import logo from "../images/logo.svg";
import { Link, Route, Switch } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип" />
      <nav className="header__logged">
        <span className="header__email">{props.userEmail}</span>
        <Switch>
          <Route path="/" exact>
            <button onClick={props.signOut} className="header__sign-in">
              Выйти
            </button>
          </Route>
          <Route path="/sign-up" exact>
            <Link className="header__sign-in" to="/sign-in">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in" exact>
            <Link className="header__sign-in" to="/sign-up">
              Регистрация
            </Link>
          </Route>
        </Switch>
      </nav>
    </header>
  );
}

export default Header;
