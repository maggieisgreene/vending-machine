import './machine.scss';
import $ from 'jquery';
import smash from '../../helpers/data/smash';
import snack from '../Snacks/snacks';
import utilities from '../../helpers/utilities';
import snackData from '../../helpers/data/snackData';

const buySnack = (event) => {
  event.stopImmediatePropagation();
  const snackId = event.target.id.split('buy-')[1];
  snackData.buySnack(snackId)
    // eslint-disable-next-line no-use-before-define
    .then(() => buildTheMachine())
    .catch((error) => console.error(error));
};

const buildTheMachine = () => {
  smash.getCompleteMachine()
    .then((positions) => {
      let domString = '<h2>VENDING MACHINE</h2>';
      domString += '<div id="snack-section" class="d-flex flex-wrap">';
      positions.forEach((position) => {
        domString += snack.snackCardBuilder(position);
      });
      domString += '</div>';
      utilities.printToDom('machine', domString);
      $('#machine').on('click', '.buy-snack', buySnack);
    })
    .catch((error) => console.error(error));
};

export default { buildTheMachine };
