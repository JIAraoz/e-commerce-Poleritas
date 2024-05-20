import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faTwitter,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => (
	<footer className='footer-content'>
		<div className='social-buttons'>
			<a
				href='https://www.facebook.com'
				target='_blank'
				rel='noopener noreferrer'
			>
				<button>
					<FontAwesomeIcon icon={faFacebook} />
				</button>
			</a>
			<a
				href='https://www.twitter.com'
				target='_blank'
				rel='noopener noreferrer'
			>
				<button>
					<FontAwesomeIcon icon={faTwitter} />
				</button>
			</a>
			<a
				href='https://www.instagram.com'
				target='_blank'
				rel='noopener noreferrer'
			>
				<button>
					<FontAwesomeIcon icon={faInstagram} />
				</button>
			</a>
		</div>
		<p>© 2022 Nuestro Sitio Web. Todos los derechos reservados.</p>
	</footer>
);

export default Footer;
