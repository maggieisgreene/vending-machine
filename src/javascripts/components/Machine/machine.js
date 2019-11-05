import './machine.scss';
import smash from '../../helpers/data/smash';
import snack from '../Snacks/snacks';
import utilities from '../../helpers/utilities';

const buildTheMachine = () => {
  smash.getCompleteMachine()
    .then((positions) => {
      let domString = '<h2>VENDING MACHINE</h2>';
      domString += '<div id="snack-section" class="d-flex flex-wrap">';
      positions.forEach((position) => {
        domString += snack.snackCardBuilder(position);
      });
      domString += '</div>';
      utilities.printToDom('stock', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildTheMachine };
