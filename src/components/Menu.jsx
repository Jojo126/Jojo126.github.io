import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faInstagram, faDeviantart, faYoutube } from '@fortawesome/free-brands-svg-icons';
import logo from './../assets/logo.svg';

import './Menu.css';

function Menu() {
  const now = new Date();

  return (
    <div className="Menu">
      <div>
        <div>
          <img src={logo} id="logo" alt="logotype" />
          <h1>Johanna Palmkvist</h1>
        </div>
        <div id="socials">
          <a href="mailto:johannapalmkvist1@gmail.com" aria-label='E-mail'>
            <FontAwesomeIcon icon={faEnvelope} size='2xl' />
          </a>
          <a href="https://www.linkedin.com/in/johanna-palmkvist-a778a8154/" target="_blank" rel="noreferrer noopener" aria-label='LinkedIn'>
            <FontAwesomeIcon icon={faLinkedin} size='2xl' />
          </a>
          <a href="https://github.com/Jojo126" target="_blank" rel="noreferrer noopener" aria-label='GitHub'>
            <FontAwesomeIcon icon={faGithub} size='2xl' />
          </a>
          <a href="https://www.instagram.com/silentghost12/" target="_blank" rel="noreferrer noopener" aria-label='Instagram'>
            <FontAwesomeIcon icon={faInstagram} size='2xl' />
          </a>
          <a href="https://www.deviantart.com/littlethings12" target="_blank" rel="noreferrer noopener" aria-label='DeviantArt'>
            <FontAwesomeIcon icon={faDeviantart} size='2xl' />
          </a>
          <a href="https://www.youtube.com/channel/UCCf6IQKuXDrq3Q9OCvY7jSw" target="_blank" rel="noreferrer noopener" aria-label='YouTube'>
            <FontAwesomeIcon icon={faYoutube} size='2xl' />
          </a>
        </div>
      </div>
      <div id="copyright">
        <span>&copy; {now.getFullYear()} Johanna Palmkvist. All rights reserved.</span>
      </div>
    </div>
  );
}

export default Menu;
