import React from "react";
import { UserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const user = React.useContext(UserContext);
  const isOwn = props.card.owner._id === user._id;

  const itemsTrash = `items__trash ${
    isOwn ? "items__trash" : "items__trash_no-visible"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === user._id);

  const cardLikeButtonClassName = `items__like-button ${
    isLiked ? "items__like-button_active" : "items__like-button"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onLikeClick(props.card);
  }
  function handleCardDelete() {
    props.onCardDelete(props.card);
  }
  return (
    <div id="items__template">
      <div className="items__content">
        <img
          className="items__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
        <button
          className={itemsTrash}
          type="button"
          onClick={handleCardDelete}
        ></button>
        <h2 className="items__title">{props.card.name}</h2>
        <ul className="items__like-elements">
          <li className="items__like-element">
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
          </li>
          <li className="items__like-element">
            <span className="items__like-counter">
              {props.card.likes.length}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
