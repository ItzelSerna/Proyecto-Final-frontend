import React, { useState, useContext } from 'react';
import { CardsContext } from '../../contexts/CardsContext';

export default function SearchForm({ getinfo }) {
  const cardsNumber = useContext(CardsContext);

  const [topic, setTopic] = useState('');
  const [spanError, setSpanError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (topic !== '') {
      cardsNumber.setRenderThree(3);
      getinfo(topic);
      setSpanError(false);
    } else {
      setSpanError(true);
    }
  }
  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="search"
    >
      <input
        className="search__input"
        type="text"
        required
        placeholder="Introduce un tema"
        name="album"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        type="submit"
        className="search__button"
      >
        Buscar
      </button>
      <span className={`search__error-message ${spanError && 'active'}`}>
        Por favor, introduzca una palabra clave.
      </span>
    </form>
  );
}