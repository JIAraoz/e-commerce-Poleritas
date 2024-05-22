import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<Auth0Provider
					domain={domain}
					clientId={clientId}
					redirectUri={window.location.origin}
				>
					<App />
				</Auth0Provider>
			</BrowserRouter>
		</React.StrictMode>
		,
	</Provider>,
);
