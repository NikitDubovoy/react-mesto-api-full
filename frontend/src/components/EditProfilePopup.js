import React from "react";

import PopupWithForm from "./PopupWithForm";

import { UserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(UserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    if (Object.keys(currentUser).length) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      buttonText="Сохранить"
      onOpen={props.onOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input name-input"
        id="name-input"
        type="text"
        placeholder="Имя"
        name="name"
        maxLength="40"
        minLength="2"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span
        className="popup__error popup__error_visible"
        id="name-input-error"
      ></span>
      <input
        className="popup__input discription-input"
        type="text"
        id="discription-input"
        placeholder="О себе"
        name="discription"
        maxLength="200"
        minLength="2"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
      />
      <span
        className="popup__error popup__error_visible"
        id="discription-input-error"
      ></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
