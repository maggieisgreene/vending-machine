import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';
import 'bootstrap';
import '../styles/main.scss';
import login from './components/Auth/auth';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  console.error('hi', apiKeys.firebaseKeys);
  login.loginButton();
};

init();
