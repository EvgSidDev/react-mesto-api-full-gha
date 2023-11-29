import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit-profile"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        id="nameUser"
        name="name-for-profile"
        type="text"
        className="popup__type-input"
        required
        minLength={2}
        maxLength={30}
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__input-error input-name-error"></span>
      <input
        id="statusUser"
        name="status-for-profile"
        type="text"
        className="popup__type-input"
        required
        minLength={2}
        maxLength={200}
        onChange={handleChangeDescription}
        value={description || ''}
      />
      <span className="popup__input-error input-status-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
