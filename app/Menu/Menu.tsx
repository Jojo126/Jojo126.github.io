import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
// import { faLinkedin, faGithub, faInstagram, faDeviantart, faYoutube } from '@fortawesome/free-brands-svg-icons';
import logo from '@/app/icon.svg';
import './Menu.css';

// Fontawesome core package currently incompatible with React v19 and NextJS v15. Waiting and following https://github.com/FortAwesome/Font-Awesome/issues/20399 for now.

type social = {
  url: string,
  label: string,
  // icon?: IconDefinition
  stayOnTab?: boolean,
};

function Menu() {
  const now = new Date();

  const socials: social[] = [
    {
      url: 'mailto:johannapalmkvist1@gmail.com',
      label: 'E-mail',
      stayOnTab: true,
      // icon: faEnvelope
    },
    {
      url: 'https://www.linkedin.com/in/johanna-palmkvist-a778a8154/',
      label: 'LinkedIn',
      // icon: faLinkedin
    },
    {
      url: 'https://github.com/Jojo126',
      label: 'GitHub',
      // icon: faGithub
    },
    {
      url: 'https://www.instagram.com/silentghost12/',
      label: 'Instagram',
      // icon: faInstagram
    },
    {
      url: 'https://www.deviantart.com/littlethings12',
      label: 'DeviantArt',
      // icon: faDeviantart
    },
    {
      url: 'https://www.youtube.com/channel/UCCf6IQKuXDrq3Q9OCvY7jSw',
      label: 'YouTube',
      // icon: faYoutube
    }
  ];

  return (
    <div className="Menu">
      <div>
        <div>
          <Image priority={true} src={logo} id="logo" alt="logotype" />
          <h1>Johanna Palmkvist</h1>
        </div>
        <div id="socials">
          {socials.map(social => {
            if(social.stayOnTab) {
              return (<a key={social.label} href={social.url} aria-label={social.label}>
                {/*social.icon ? <FontAwesomeIcon icon={social.icon} size='2xl' /> :*/ <span>{social.label}</span>}
              </a>);
            }
            else {
              return (<a key={social.label} href={social.url} target="_blank" rel="noreferrer noopener" aria-label={social.label}>
                {/*social.icon ? <FontAwesomeIcon icon={social.icon} size='2xl' /> :*/ <span>{social.label}</span>}
              </a>);
            }
          })}
        </div>
      </div>
      <div id="copyright">
        <span>&copy; {now.getFullYear()} Johanna Palmkvist. All rights reserved.</span>
      </div>
    </div>
  );
}

export default Menu;
