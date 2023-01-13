import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ link: '', description: '' });
  const [toDeleteCard, setToDeleteteCard] = useState({id: ''})
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentLogin, setCurrentLogin] = useState({ email: '', token: '', _id: '' });
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const history = useHistory();

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link;

  const getAppData = () => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user)
        setCards(cards)
      })
      .catch(api.catchError); 
  }

  useEffect(() => {
    getAppData();
  }, [])

  const handleUpdateUser = ({ name, about }) => {
    return api.setUserInfo(name, about)
      .then((user) => {
        setCurrentUser(user);
        setIsEditProfilePopupOpen(false);
      })
      .catch(api.catchError);
  }

  const handleUpdateAvatar = ({ avatar }) => {
    return api.setAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        setIsEditAvatarPopupOpen(false);
      })
    .catch(api.catchError);
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    return api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false)
      })
      .catch(api.catchError);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    return api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(api.catchError);
  } 

  const handleCardDelete = (card) => {
    setToDeleteteCard({
      ...toDeleteCard,
      id: card._id,
    });
  }

  const handleAcceptCardDelete = () => {
    return api.deleteCard(toDeleteCard.id)
      .then(() => { 
        setCards(cards.filter((c) => c._id !== toDeleteCard.id));
        closeAllPopups();
        })
      .catch(api.catchError); 
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  } 

  const handleCardClick = (link, description) => {
    setSelectedCard({
      ...selectedCard,
      link: link,
      description: description,
    });
  }

  const handleMessage = (success) => {
    setRegisterSuccess(success);
    setIsMessagePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setToDeleteteCard({ id: '' })
    setSelectedCard({ link: '', description: '' });
    setIsMessagePopupOpen(false);
  }

  const checkPass = (token) => {
    auth.checkToken(token)
      .then((data) => {
        setCurrentLogin({ ...currentLogin, email: data.email, _id: data._id });
        setLoggedIn(true);
        history.push('/');
      })
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      checkPass(localStorage.getItem('jwt'))
    }
  }, [])

  const logIn = (password, email) => {
    auth.authorize(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setCurrentLogin({ ...currentLogin, token: res.token });
        checkPass(res.token);
      })
      .catch(() => {
        handleMessage(false);
    })
  }

  const logOut = () => {
    setCurrentLogin({ email: '', token: '', _id: '' });
    localStorage.removeItem('jwt');
    setLoggedIn(false)
  }
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} currentLogin={currentLogin} logOut={logOut} />  
                    
      <Switch>
        <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick ={handleCardClick}
            component={Main} />        

        <Route path="/sign-up">
          <Register handleMessage={handleMessage} />
        </Route>

        <Route path="/sign-in">
          <Login logIn={logIn} />
        </Route>   
        
      </Switch>

      <InfoTooltip isOpen={isMessagePopupOpen} onClose={closeAllPopups} success={registerSuccess} />

      <ImagePopup name="preview" card={selectedCard} onClose={closeAllPopups} />
            
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <DeleteCardPopup card={toDeleteCard} onClose={closeAllPopups} onAccept={handleAcceptCardDelete} />      

      {loggedIn && <Footer />}
        
    </CurrentUserContext.Provider>      
  );
}

export default App;

