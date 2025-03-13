  export function registerUser(email, name) {
    const newUser = { email, name };
    localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
  }
  
  export function getUser(email) {
    const savedUser = localStorage.getItem(`user_${email}`);
    return savedUser ? JSON.parse(savedUser) : { email, name: 'Usuario' }; 
  }

  export function saveArticles(email, articles) {
    localStorage.setItem(`savedArticles_${email}`, JSON.stringify(articles));
  }
  
  export function getSavedArticles(email) {
    const saved = localStorage.getItem(`savedArticles_${email}`);
    return saved ? JSON.parse(saved) : [];
  }
  