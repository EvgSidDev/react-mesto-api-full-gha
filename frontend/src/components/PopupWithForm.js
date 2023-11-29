function PopupWithForm({onClose, name, isOpen, title, children, buttonText, onSubmit}) {

  return (
    <div
      onClick={onClose}
      className={`popup popup_type_${name} ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          method="post"
          className="popup__form"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__submit">
              {buttonText}
            </button>
        </form>
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

export default PopupWithForm;
