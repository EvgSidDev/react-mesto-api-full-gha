function ImagePopup({card, onClose}) {

  return (
    <div
      className={`popup popup_opacity_dark ${card.url !== undefined  ? "popup_opened" : ""}`}
      id="view-photo"
      onClick={onClose}
    >
      <div className="view">
        <img
          src={card.url}
          alt={card.title}
          className="view__photo"
        />
        <p className="view__title">{card.title}</p>
        <button
          type="button"
          className="popup__close-button"
          id="close-view-photo"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
