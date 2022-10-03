import Faild from "../images/icons/Union.svg";

function SignFaild(props) {
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
          src={Faild}
        />
        <h2 className="popup__title">
          {"Неверый логин или пароль."}
        </h2>
      </div>
    </div>
  );
}

export default SignFaild;
