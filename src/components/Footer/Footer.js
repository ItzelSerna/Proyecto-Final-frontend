import React from 'react';
import GitHubLogo from '../../images/GitHubLogo.svg';
import LinkedinLogo from '../../images/LinkedinLogo.svg';

export default function Footer() {
  return (
    <div className="footer">
      <p className="footer__copyright">© 2021 Supersite | Itzel Serna</p>
      <div className="footer__contact">
        <a
          href="#top"
          className="footer__top"
        >
          Inicio
        </a>
        <a
          href="https://github.com/ItzelSerna"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={GitHubLogo}
            alt="GitHub icon"
            className="footer__social"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/itzel-concepci%C3%B3n-serna-gavilanes-8962a3177/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={LinkedinLogo}
            alt="Linkedin icon"
            className="footer__social"
          />
        </a>
      </div>
    </div>
  );
}