import React from "react";
import { UserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const user = React.useContext(UserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <a
            className="profile__avatar"
            alt="Аватар"
            onClick={props.onEditAvatar}
          >
            <img className="profile__img" src={user.avatar} />
          </a>
          <h1 className="profile__name-user">{user.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__description">{user.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <div className="items">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.handleCardClick}
            onLikeClick={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
