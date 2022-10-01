import React from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  /*   const currentUser = React.useContext(UserContext); */
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.AddPlacePopup({
      title,
      link,
    });
  }

  React.useEffect(() => {
    setTitle(null);
    setLink(null);
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="items"
      title="Новое место"
      isOpen={props.isOpen}
      buttonText="Сохранить"
      onOpen={props.onOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        id="title-input"
        placeholder="Название"
        name="name"
        maxLength="30"
        minLength="2"
        value={title || ""}
        onChange={handleTitleChange}
        required
      />
      <span
        className="popup__error popup__error_visible"
        id="title-input-error"
      ></span>
      <input
        className="popup__input"
        type="url"
        id="link-input"
        placeholder="Ссылка на картинку"
        name="link"
        value={link || ""}
        onChange={handleLinkChange}
        required
      />
      <span
        className="popup__error popup__error_visible"
        id="link-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
