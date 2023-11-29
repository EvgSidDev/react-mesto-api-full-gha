import successAuth from "../images/successAuth.svg";
import errorAuth from "../images/errorAuth.svg";

function InfoToolTip(authResult) {
  const { isSuccess, isOpen, message, onClose } = authResult.authResult;
  return (
    <div
      onClick={onClose}
      className={`popup popup_type_tool-tip ${isOpen ? "popup_opened" : ""}`}
    >
      <div className={`info-tool-tip`} id="info-tool-tip" onClick={onClose}>
        <img
          src={isSuccess ? successAuth : errorAuth}
          alt="Картинка регистрации"
          className="info-tool-tip__image"
        />
        <p className="info-tool-tip__text">{message}</p>
        <button
        type="button"
        className="popup__close-button"
        id="close-edit-profile"
        onClick={onClose}
      ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
