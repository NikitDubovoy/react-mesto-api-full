function ImagePopup(props) {
  return (
    <div
      className={
        props.card
          ? `popup popup_${props.name} popup_opened`
          : `popup popup_${props.name}`
      }
    >
      <div className="popup__container">
        <img
          className="popup__image"
          src={props.card ? props.card.link : "null"}
          alt={props.card ? props.card.name : "null"}
        />
        <h2 className="popup__title-img">
          {props.card ? props.card.name : "null"}
        </h2>
        <button
          type="button"
          className="popup__closed"
          onClick={props.onOpen}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
