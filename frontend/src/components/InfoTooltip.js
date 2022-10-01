import Success from "../images/icons/success.svg";
import Faild from "../images/icons/Union.svg";

function InfoTooltip(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_message-faild popup_opened`
          : `popup popup_message-faild`
      }
    >
      <div className="popup_message">
        <button
          type="button"
          className="popup__closed"
          onClick={props.onOpen}
        ></button>
        <img
          className="popup_img-result"
          src={props.status ? Success : Faild}
        />
        <h2 className="popup__title">
          {props.status
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
