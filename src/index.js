import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './index.scss';

import "jquery/dist/jquery.min.js";
import { AuthContextProvider } from './AuthContext';
import { GamesDataContextProvider } from './GamesData';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <GamesDataContextProvider>
    <App />
    </GamesDataContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);