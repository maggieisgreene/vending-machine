import './machine.scss';
import smash from '../../helpers/data/smash';

const buildTheMachine = () => {
  smash.getCompleteMachine()
    .then((singleMachine) => console.error('1 machine likey', singleMachine))
    .catch((error) => console.error(error, 'no likey'));
};

export default { buildTheMachine };
