import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { AppContext } from "../contexts/AppContext";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import InfoToolTip from "./InfoToolTip.js";
import auth from "../utils/Auth.js";

function App() {
  const [isEditAvatarPopupOpen, setOpenAvatar] = useState(false);
  const [isEditProfilePopupOpen, setOpenProfile] = useState(false);
  const [isAddPlacePopupOpen, setOpenAddPhoto] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [authResult, setAuthResult] = useState({
    isSuccess: false,
    isOpen: false,
    message: "",
    onClose: handleClickClosePopup,
  });

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  function registerSubmit(data) {
    auth
      .signUp(data)
      .then((res) => {
        setAuthResult({
          isSuccess: true,
          isOpen: true,
          message: "Вы успешно зарегистрировались!",
          onClose: handleClickClosePopup,
        });
        navigate("/sign-in");
      })
      .catch((res) => {
        setAuthResult({
          isSuccess: false,
          isOpen: true,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
          onClose: handleClickClosePopup,
        });
      });
  }

  function LoginSubmit(data) {
    auth.signIn(data).then((res) => {
      localStorage.setItem("jwt", res.token);
      setLoggedIn(true);
    })
    .catch((res) => {
      setAuthResult({
        isSuccess: false,
        isOpen: true,
        message: "Что-то пошло не так! Попробуйте ещё раз.",
        onClose: handleClickClosePopup,
      });
    });
  }

  const tryAuth = async (jwt) => {
    auth.checkToken(jwt).then((res) => {
      if (res) {
        setLoggedIn(true);
        setEmail(res.data.email);
        navigate("/");
        api.setJwt(jwt);
        Promise.all([api.getUserInfo(), api.getCards()])
          .then(([info, initialsCards]) => {
            setCurrentUser(info);
            setCards(initialsCards);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      tryAuth(jwt);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setEmail("");
    removeItemLocalStorage("jwt");
  };

  function removeItemLocalStorage(item) {
    localStorage.removeItem(item);
  }

  function handleEditAvatarClick() {
    setOpenAvatar(true);
    document.addEventListener("keydown", handleClosePopupByEsc);
  }

  function handleEditProfileClick() {
    setOpenProfile(true);
    document.addEventListener("keydown", handleClosePopupByEsc);
  }

  function handleAddPlaceClick() {
    setOpenAddPhoto(true);
    document.addEventListener("keydown", handleClosePopupByEsc);
  }

  const closeAllPopups = () => {
    setOpenAvatar(false);
    setOpenProfile(false);
    setOpenAddPhoto(false);
    setSelectedCard({});
    setAuthResult({});
    document.removeEventListener("keydown", handleClosePopupByEsc);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    document.addEventListener("keydown", handleClosePopupByEsc);
  }

  function handleClosePopupByEsc(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  function updateUser(data) {
    api
      .saveProfileData(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addPlace(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateAvatar(url) {
    api
      .updateAvatar(url)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((data) => {
        setCards((state) =>
          state.filter((item) => {
            return item._id !== card._id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClickClosePopup(e) {
    if (e.target === e.currentTarget && e.target.type !== "submit") {
      closeAllPopups();
    }
  }

  return (
    <AppContext.Provider
      value={{ email, loggedIn, handleLogin, handleSignOut }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLikeClick={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onSubmit={registerSubmit} />}
            />
            <Route path="/sign-in" element={<Login onSubmit={LoginSubmit} />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleClickClosePopup}
            onUpdateUser={updateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleClickClosePopup}
            onUpdateAvatar={updateAvatar}
          />
          <PopupWithForm
            title={"Вы уверены?"}
            name={"delete-photo"}
            isOpen={false}
            buttonText={"Да"}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleClickClosePopup}
            onAddPlace={addPlace}
          />
          <ImagePopup card={selectedCard} onClose={handleClickClosePopup} />
          <InfoToolTip authResult={authResult} />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
