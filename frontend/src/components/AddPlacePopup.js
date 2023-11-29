import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name, link});
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-photo"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Создать"}
      onSubmit={handleSubmit}
    >
      <input
        id="newPhotoName"
        name="title-for-photo"
        type="text"
        className="popup__type-input"
        required
        minLength={2}
        maxLength={30}
        placeholder="Название"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error input-status-error"></span>
      <input
        id="newPhotoLink"
        name="url-for-photo"
        type="url"
        className="popup__type-input"
        required
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error input-status-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
