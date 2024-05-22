import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faTshirt,
	faUser,
	faMapMarkerAlt,
	faPhone,
	faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
	faFacebook,
	faTwitter,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';
const Footer = () => (
	<div className='wrapper'>
		<footer>
			<div className='footer-container'>
				<div className='logo-section'>
					<img src='./OIG2.jpg' alt='Logo' className='logo' />
					<p>POLERIITAS</p>
				</div>
				<div className='links-section'>
					<h4>Links</h4>
					<ul>
						<li>
							<a href='/home'>
								<FontAwesomeIcon icon={faHome} /> Home
							</a>
						</li>
						<li>
							<a href='#'>
								<FontAwesomeIcon icon={faTshirt} /> Products
							</a>
						</li>
						<li>
							<a href='#'>
								<FontAwesomeIcon icon={faUser} /> About
							</a>
						</li>
					</ul>
				</div>
				<div className='social-section'>
					<h4>Follow us</h4>
					<ul>
						<li>
							<a href='https://www.facebook.com/tuNombreDeUsuario'>
								<FontAwesomeIcon icon={faFacebook} /> Facebook
							</a>
						</li>
						<li>
							<a href='https://twitter.com/tuNombreDeUsuario'>
								<FontAwesomeIcon icon={faTwitter} /> Twitter
							</a>
						</li>
						<li>
							<a href='https://www.instagram.com/tuNombreDeUsuario'>
								<FontAwesomeIcon icon={faInstagram} /> Instagram
							</a>
						</li>
					</ul>
				</div>
				<div className='contact-section'>
					<h4>Address</h4>
					<p>
						<FontAwesomeIcon icon={faMapMarkerAlt} /> Avenida Inventada, calle
						falsa #1234
					</p>
					<p>
						<FontAwesomeIcon icon={faPhone} /> +52 638 123 4567
					</p>
					<p>
						<a href='mailto:CorreoFalso@Dominio.com'>
							<FontAwesomeIcon icon={faEnvelope} /> CorreoFalso@Dominio.com
						</a>
					</p>
				</div>
			</div>
			<div className='footer-bottom'>
				<p>© lorem ipsum lorem ipsum 2022 Powered by lorem ipsum</p>
			</div>
		</footer>
	</div>
);

export default Footer;
