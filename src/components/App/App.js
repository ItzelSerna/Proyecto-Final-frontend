import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import SuccessModal from '../SuccessModal/SuccessModal';
import SavedNews from '../SavedNews/SavedNews';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { CardsContext } from '../../contexts/CardsContext';
import api from '../../utils/ThirdPartyApi';
import { registerUser, getUser, saveArticles, getSavedArticles } from '../../utils/auth';
import { STORAGE_KEY_USER, STORAGE_KEY_ARTICLES } from '../../utils/config';

function App() {
  const [data, setData] = useState([]);
  const [preloaderState, setPreloaderState] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [typeError, setTypeError] = useState('');
  const [renderThree, setRenderThree] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY_USER);
    return savedUser ? JSON.parse(savedUser) : { email: '', name: '' };
});

  const [savedArticles, setSavedArticles] = useState(() => {
    if (currentUser.email) {
        const saved = localStorage.getItem(`${STORAGE_KEY_ARTICLES}${currentUser.email}`);
        return saved ? JSON.parse(saved) : [];
    }
    return [];
});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.email) {
        localStorage.setItem(`${STORAGE_KEY_ARTICLES}${currentUser.email}`, JSON.stringify(savedArticles));
    }
  }, [savedArticles, currentUser.email]);

  const [isPopupWithFormOpen, setIsPopupWithFormOpen] = useState(false);
  const [formType, setFormType] = useState('login');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const contextVariables = {
    renderThree,
    setRenderThree,
  };

  function getInfo(topic) {
    api.getCards(topic)
      .then((response) => {
        setPreloaderState(true);
        if (response.ok) {
          return response.json();
        } else {
          setNotFound(true);
          setPreloaderState(false);
          setTypeError('Error Server');
          throw new Error(`Error: ${response.status}`);
        }
      })
      .then((res) => {
        setPreloaderState(false);
        if (res.articles.length === 0) {
          setTypeError('not-found');
          setNotFound(true);
        } else {
          const validArticles = res.articles
            .filter((item) =>
              item.description !== '[Removed]' &&
              item.urlToImage !== null &&
              item.urlToImage !== ''
            )
            .map((item) => ({ ...item, keyword: topic }));

          setData(validArticles);
          setNotFound(false);
        }
      })
      .catch((err) => console.log(err.message));
  }

  function handleOpenFormPopupLogin() {
    setFormType('login');
    setIsPopupWithFormOpen(true);
  }

  function closeAllPopups() {
    setIsPopupWithFormOpen(false);
    setIsSuccessModalOpen(false);
  }

  function handleLoginSubmit({ email, password }) {
    console.log('Login con:', email, password);
    setIsLoggedIn(true);

    let user = getUser(email);

    if (!user.name || user.name === '') {
        user.name = 'Usuario';
        registerUser(email, user.name);
    }

    setCurrentUser(user);
    setSavedArticles(getSavedArticles(email));

    closeAllPopups();
}

  function handleSignupSubmit({ email, password, name }) {
    console.log('Registro con:', email, password, name);

    let existingUser = getUser(email);
    if (!existingUser || !existingUser.name) {
        registerUser(email, name); 
    }

    setCurrentUser({ email, name });
    setIsLoggedIn(true);

    setSavedArticles([]);
    saveArticles(email, []);

    setIsPopupWithFormOpen(false);
    setIsSuccessModalOpen(true);
}

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser({ email: '', name: '' });
    setSavedArticles([]);
    localStorage.removeItem(STORAGE_KEY_USER);
  }

  function handleSaveArticle(article) {
    if (!currentUser.email) return;

    const exists = savedArticles.some((a) => a.url === article.url);
    if (!exists) {
      const updatedArticles = [...savedArticles, article];
      setSavedArticles(updatedArticles);
      saveArticles(currentUser.email, updatedArticles);
    } else {
      const filteredArticles = savedArticles.filter((a) => a.url !== article.url);
      setSavedArticles(filteredArticles);
      saveArticles(currentUser.email, filteredArticles);
    }
  }

  return (
    <CardsContext.Provider value={contextVariables}>
      <Preloader state={preloaderState} />

      <PopupWithForm
        isOpen={isPopupWithFormOpen}
        onClose={closeAllPopups}
        formType={formType}
        setFormType={setFormType}
        onLoginSubmit={handleLoginSubmit}
        onSignupSubmit={handleSignupSubmit}
      />
      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeAllPopups} />

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Header 
                getInfo={getInfo} 
                onLogin={handleOpenFormPopupLogin} 
                onLogout={handleLogout} 
                isLoggedIn={isLoggedIn} 
                showSearchBar={true} 
                isSavedNews={false} 
              />
              <Main 
                articles={data} 
                failed={notFound} 
                type={typeError} 
                isLoggedIn={isLoggedIn} 
                onLogin={handleOpenFormPopupLogin} 
                onSaveArticle={handleSaveArticle} 
                savedArticles={savedArticles} 
              />
              <Footer />
            </>
          } 
        />

        <Route 
          path="/saved-news" 
          element={
            <ProtectedRoute 
              loggedIn={isLoggedIn} 
              element={() => (
                <>
                  <Header 
                    onLogin={handleOpenFormPopupLogin} 
                    onLogout={handleLogout} 
                    isLoggedIn={isLoggedIn} 
                    showSearchBar={false} 
                    isSavedNews={true} 
                    userName={currentUser.name} 
                  />
                  <SavedNews 
                    userName={currentUser.name} 
                    savedArticles={savedArticles} 
                    onCardDelete={(article) => 
                      setSavedArticles(
                        savedArticles.filter((a) => a.url !== article.url)
                      )
                    } 
                  />
                  <Footer />
                </>
              )} 
            />
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CardsContext.Provider>
  );
}

export default App;