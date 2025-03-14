import { STORAGE_KEY_USER, STORAGE_KEY_ARTICLES } from './config';

export function registerUser(email, name) {
    const newUser = { email, name };
    localStorage.setItem(`${STORAGE_KEY_USER}_${email}`, JSON.stringify(newUser));
}

export function getUser(email) {
    const savedUser = localStorage.getItem(`${STORAGE_KEY_USER}_${email}`);
    return savedUser ? JSON.parse(savedUser) : { email, name: 'Usuario' }; 
}

export function saveArticles(email, articles) {
    localStorage.setItem(`${STORAGE_KEY_ARTICLES}${email}`, JSON.stringify(articles));
}

export function getSavedArticles(email) {
    const saved = localStorage.getItem(`${STORAGE_KEY_ARTICLES}${email}`);
    return saved ? JSON.parse(saved) : [];
}
