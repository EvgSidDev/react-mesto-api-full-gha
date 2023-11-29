import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClickHandle, onCardLikeHandle, onCardDelete}) {
  function handleClick() {
    onCardClickHandle({ url: cardData.link, title: cardData.name });
  }

  function handleLikeClick() {
    onCardLikeHandle(cardData);
  }

  function handleDeleteClick() {
    onCardDelete(cardData);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = (cardData.owner._id === currentUser._id);
  const isLiked = cardData.likes.some((item) => item._id === currentUser._id);

  return (
    <li className="element">
      <img
        src={cardData.link}
        alt={cardData.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__caption">
        <h2 className="element__title">{cardData.name}</h2>
        <div className="element__like-section">
          <button
            type="button"
            className={`element__like ${isLiked && "element__like_dark"}`}
            onClick={handleLikeClick}
          ></button>
          <p className="element__likes">{cardData.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          onClick={handleDeleteClick}
          className="element__delete"
        ></button>
      )}
    </li>
  );
}

export default Card;
