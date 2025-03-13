import React, { useContext } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NotFound from '../NotFound/NotFound';
import About from '../About/About';
import { CardsContext } from '../../contexts/CardsContext';

export default function Main(props) {
  const { renderThree, setRenderThree } = useContext(CardsContext);

  const { articles = [], failed, type, savedArticles = [], isLoggedIn } = props;

  function renderThreeMore() {
    setRenderThree(prev => prev + 3);
  }

  return (
    <main id="main" className="main">
      {articles.length > 0 && (
        <h2 className="main__title">Resultados de la búsqueda</h2>
      )}

      <section className="main__content">
        {failed ? (
          <NotFound failed={failed} type={type} />
        ) : (
          articles.slice(0, renderThree).map((el) => {
            const isSaved = savedArticles.some(saved => saved.url === el.url);
            return (
              <NewsCard
                key={el.url} 
                item={el}
                isLoggedIn={isLoggedIn}
                isSaved={isSaved}
                onSaveArticle={props.onSaveArticle}
                onLogin={props.onLogin}
              />
            );
          })
        )}
      </section>

      {renderThree < articles.length && articles.length > 0 && (
        <button className="main__renderButton" onClick={renderThreeMore}>
          Mostrar más
        </button>
      )}

      <About />
    </main>
  );
}
