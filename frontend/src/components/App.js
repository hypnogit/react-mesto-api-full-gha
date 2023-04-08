import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import { authorize, register, checkTokenValidity } from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfotooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [isFail, setIsFail] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkTokenValidity(token)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email);
          navigate('/');
        })
        .catch();
      api
        .getInitialCards()
          .then((initialCards) => {
            setCards(initialCards);
          })
          .catch();
      api
        .getUserInfo()
          .then((userInfo) => {
            setCurrentUser(userInfo);
          })
          .catch();
    }
  }, [loggedIn, navigate]);
  /*
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkTokenValidity(token)
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.email);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch();
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch();
    }
  }, [loggedIn]);
  /*

  /*
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch();
    }
  }, [loggedIn]);
  */


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch();
  }

  function handleCardDelete(card) {
    api
      .removeMyCard(card._id)
      .then(setCards(cards.filter((cardElem) => cardElem._id != card._id)))
      .catch();
  }

  const handleEditAvatarClick = function () {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = function () {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = function () {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const closeAllPopups = function () {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfotooltipOpen(false);
  };
  const handleCardClick = function (card) {
    setSelectedCard(card);
  };

  const handleUpdateUser = function (updatedUser) {
    api
      .editUserInfo(updatedUser.name, updatedUser.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch();
  };

  const handleUpdateAvatar = function (avatarLink) {
    api
      .editAvatar(avatarLink)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch();
  };

  const handleAddPlaceSubmit = function (placeName, placeLink) {
    api
      .addNewCard(placeName, placeLink)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch();
  };

  const handleLogin = function (email, password) {
    authorize(email, password).then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsFail(false);
        setLoggedIn(true);
        setEmail(email);
        navigate('/');
      }
    })
    .catch((error) => {
      setIsFail(true);
      setIsInfotooltipOpen(true);
      console.log(error);
  })
  }

  const handleRegister = function (email, password) {
    register(email, password).then((data) => {
      if (data) {
        setIsFail(false);
        setIsInfotooltipOpen(true);
        navigate('/signin');
      }
    })
    .catch((error) => {
      setIsFail(true);
      setIsInfotooltipOpen(true);
      console.log(error);
  })
  }

  const handleLogout = function () {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header handleLogout={handleLogout} email={email}/>
            <Routes>
              <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
              <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
              <Route path="/" element={
                <ProtectedRoute 
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  handleCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={loggedIn}
            />}/>
            </Routes>
            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isFail={isFail} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
