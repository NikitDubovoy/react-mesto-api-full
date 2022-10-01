function PopupWithForm(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_${props.name} popup_opened`
          : `popup popup_${props.name}`
      }
    >
      <form
        name={props.nameForm}
        className={`popup__form popup__form_${props.name}`}
        onSubmit={props.onSubmit}
      >
        <button
          type="button"
          className="popup__closed"
          onClick={props.onOpen}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button className="popup__button" type="submit">
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
