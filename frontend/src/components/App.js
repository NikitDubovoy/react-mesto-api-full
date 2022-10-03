import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";
import "../page/index.css";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { UserContext } from "../contexts/CurrentUserContext";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import SignFaild from "./SignFaild";
import * as Auth from "./Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(null);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [isSignFaild, setIsSignFaild] = React.useState(false);
  const [statusInfoTooltip, setStatusInfoTooltip] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [emailUser, setEmailUser] = React.useState(null);
  const history = useHistory();
  const [email, setEmail] = React.useState(currentUser.email);
  const [password, setPassword] = React.useState(currentUser.password);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleLoggedIn() {
    setLoggedIn(!loggedIn);
  }

  function handleSetIsInfoTooltip() {
    setIsInfoTooltip(!isInfoTooltip);
  }

  function handlesetSetIsSignFaild() {
    setIsSignFaild(!isSignFaild);
  }


  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoTooltip(false);
    setIsSignFaild(false);
  } 

  React.useEffect(() => {
    if (Object.keys(currentUser).length) {
      setPassword(currentUser.password);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  function handleSubmitSignIn(e) {
    e.preventDefault();
    Auth.authorize(email, password)
      .then((data) => {
          handleLoggedIn();
      })
      .catch((err) => {
        handlesetSetIsSignFaild();
      });
  }

  React.useEffect(() => {
    if(loggedIn){
    api.getUser()
      .then((user) => {
        setCurrentUser(user)
        history.push("/");
        setLoggedIn(true);
        setEmailUser(user.email);
      })
      .catch((err) => console.log(err))
    }
  }, [history, loggedIn]);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmitRegister(e) {
    e.preventDefault();
    Auth.register(password, email)
      .then((res) => {
        if (res) {
          history.push("/sign-in");
          handleSetIsInfoTooltip();
          setStatusInfoTooltip(true);
        } else {
          handleSetIsInfoTooltip();
          setStatusInfoTooltip(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignOut() {
    api.logout()
    .then(() => setLoggedIn(false))
  }

  function handleUpdateUser(user) {
    api
      .setUser(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if(loggedIn) {
      api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deletedCard(card._id)
      .then(() => {
        setCards((cardList) => cardList.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="page">
        <Header signOut={handleSignOut} userEmail={emailUser} />
        <Switch>
          <Route path="/sign-in">
            <Login
              onSubmit={handleSubmitSignIn}
              onEmail={handleEmailChange}
              onPassword={handlePasswordChange}
              valueEmail={email}
              valuePassword={password}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              onSubmite={handleSubmitRegister}
              onEmail={handleEmailChange}
              onPassword={handlePasswordChange}
              valueEmail={email}
              valuePassword={password}
            />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onOpen={closeAllPopups}
          AddPlacePopup={handleAddPlaceSubmit}
          form="add-place"
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onOpen={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          form="edit-profile"
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onOpen={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          form="edit-avatar"
        />
        <ImagePopup
          name="over-img"
          card={selectedCard}
          onOpen={closeAllPopups}
          form="over-image"
        />
        <InfoTooltip
          status={statusInfoTooltip}
          isOpen={isInfoTooltip}
          onOpen={closeAllPopups}
        />
        <SignFaild
          isOpen={isSignFaild}
          onOpen={closeAllPopups}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
