import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  React.useEffect(() => {
    setUrl(currentUser.avatar);
  }, [currentUser]);

  const [avatar, setUrl] = React.useState("");

  function handleChangeAvatar() {
    setUrl(avatarRef.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"edit-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Обновить"}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="newAvatarLink"
        name="url-for-avatar"
        type="url"
        className="popup__type-input"
        required
        placeholder="Ссылка на аватар"
        onChange={handleChangeAvatar}
        value={avatar || ''}
      />
      <span className="popup__input-error input-status-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
