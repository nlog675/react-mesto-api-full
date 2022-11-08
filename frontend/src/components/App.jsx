import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmationPopup from './ConfirmationPopup';
import { api, register, authorize, getContent } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [cardForDelete, setCardForDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
      if (loggedIn) {
      Promise.all([api.getProfile(), api.getCard()])
          .then(([user, data]) => {
              setCurrentUser(user)
              setCards(data);
          })
          .catch((err) => console.log(err))
        }
  }, [loggedIn]);

    function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      
      if (!isLiked) {
        api.likeCard(card._id)
          .then((res) => {
            setCards((state) => state.map((c) => c._id === card._id ? res : c));
          })
          .catch((err) => console.log(err))
      } else {
        api.dislikeCard(card._id)
          .then((res) => {
            setCards((state) => state.map((c) => c._id === card._id ? res : c));
          })
          .catch((err) => console.log(err))
      }
    }

    function handleCardDelete(card) {
      setIsLoading(true);

      api.deleteCard(card._id)
        .then((res) => {
          setCards((state) => state.filter((c) => c._id !== card._id));
          closeAllPopups()
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }; 

    function handleConfirmationClick(card) {
      setCardForDelete(card)
    };

    function handleCardClick(card) {
        setSelectedCard(card)
    };

    function handleUpdateUser(data) {
      setIsLoading(true);

      api.editProfile(data)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }

    function handleUpdateAvatar(data) {
      setIsLoading(true);

      api.changeAvatar(data)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }

    function handleAddPlaceSubmit(data) {
      setIsLoading(true);

      api.addCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups()
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setCardForDelete(null);
        setIsInfoTooltipOpen(false)
    };

    const handleLogin = (email, password) => {
      return authorize(email, password)
        .then((data) => {
          
          if (!data?.token) return;
          
          localStorage.setItem('jwt', data.token)
          setLoggedIn(true);
          setUserEmail(email)
          navigate('/')
        })
        .catch(() => {
          setIsInfoTooltipOpen(true);
        })
    }

    const handleRegister = (email, password) => {
      return register(email, password)
        .then(() => {
          setRegistered(true);
          setIsInfoTooltipOpen(true);
          navigate('/sign-in');
        })
        .catch(() => {
          setRegistered(false);
          setIsInfoTooltipOpen(true);
        })
    };

    useEffect(() => {
      if (!loggedIn) return

      navigate('/');
    }, [loggedIn]);

    useEffect(() => {
      const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) return;
        
        getContent(jwt)
          .then((res) => {
            setUserEmail(res?.data?.email);
            if (res) {
              setLoggedIn(true);
              navigate('/');
            };
          })
          .catch((err) => {
            console.log(err);
          })
      };

      tokenCheck()
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('jwt');
      setLoggedIn(false);
      setUserEmail('');
    };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        
        <Header onLogout={handleLogout} email={userEmail}/>

        <Routes>

          <Route
            path="/"
            element={
              <ProtectedRoute 
                path="/"
                loggedIn={loggedIn}>
                {
                  <Main 
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleConfirmationClick}
                  />
                } 
              </ProtectedRoute>
            }
            />
              
          <Route 
            path="/sign-up"
            element=
            {
              <Register 
                onRegister={handleRegister}
              />
            } 
          />

          <Route 
            path="/sign-in" 
            element=
            {
              <Login 
                  onLogin={handleLogin}
                />
            }
          />

        </Routes>

        <Footer />

        <InfoTooltip 
          isOpen={isInfoTooltipOpen}
          loggedIn={loggedIn}
          onClose={closeAllPopups}
          registered={registered}
          positiveResultText={'Вы успешно зарегистрировались!'}
          negativeResultText={'Что-то пошло не так! Попробуйте ещё раз.'}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoad={isLoading}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoad={isLoading}
        />
        
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoad={isLoading}
        />

        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <ConfirmationPopup
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          card={cardForDelete}
          onLoad={isLoading}
        />
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
