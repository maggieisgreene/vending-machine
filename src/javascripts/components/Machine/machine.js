import './machine.scss';
import smash from '../../helpers/data/smash';

const buildTheMachine = () => {
  smash.getCompleteMachine()
    .then(() => {
      console.error('hey');
    })
    .catch((error) => console.error(error, 'no likey'));
};

export default { buildTheMachine };
