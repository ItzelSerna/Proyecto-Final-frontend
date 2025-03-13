import React from 'react';
import ItzelSerna from '../../images/ItzelSerna.jpg';

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <img
          src={ItzelSerna}
          alt="Itzel Serna"
          className="about__image"
        />
        <div className="about__info">
          <h2 className="about__subtitle">Acerca del autor</h2>
          <p className="about__text">
            ¡Hola! Mi nombre es <strong> Itzel Serna, soy desarrolladora web </strong> con formación en el Bootcamp de TripleTen , donde adquirí habilidades sólidas en JavaScript, React y desarrollo full-stack . Durante mi formación, trabajé en proyectos prácticos que me permitieron dominar el desarrollo de aplicaciones dinámicas y responsivas, además de implementar soluciones eficientes para mejorar la experiencia del usuario.
          </p>
          <p className="about__text">
            Estoy en constante aprendizaje y siempre en busca de nuevas oportunidades para aplicar mis conocimientos en proyectos desafiantes. Si buscas a alguien apasionado/a por el código limpio, la experiencia de usuario y el desarrollo escalable, ¡me encantaría conversar! 
          </p>
        </div>
      </div>
    </section>
  );
}
