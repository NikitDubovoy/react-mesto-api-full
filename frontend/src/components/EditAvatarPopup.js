import React from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      buttonText="Сохранить"
      onOpen={props.onOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="url"
        id="avatar-input"
        placeholder="Ссылка на картинку"
        name="avatar"
        ref={avatarRef}
        required
      />
      <span
        className="popup__error popup__error_visible"
        id="avatar-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
