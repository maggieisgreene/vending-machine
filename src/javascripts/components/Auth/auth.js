import buttonImg from './google-sign-in-two.png';
import utilities from '../../helpers/utilities';

const loginButton = () => {
  const domString = `<button>
    <img src="${buttonImg}"></img>
  </button>`;
  utilities.printToDom('auth', domString);
};

export default { loginButton };
