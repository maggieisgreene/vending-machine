import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import './stocker.scss';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';
import stockCard from '../StockCard/stockCard';
import snackData from '../../helpers/data/snackData';
import snackPositionData from '../../helpers/data/snackPositionData';
import machine from '../Machine/machine';

const deleteFromMachine = (event) => {
  event.preventDefault();
  const { uid } = firebase.auth().currentUser;
  snackPositionData.deleteSnackPosition(event.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildTheStocker(uid);
      machine.buildTheMachine();
    })
    .catch((error) => console.error(error));
};

const addToMachine = (event) => {
  event.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const inputVal = $(event.target).siblings().val();
  console.error(inputVal);
  smash.getAvailablePositions()
    .then((positions) => {
      const selectedPosition = positions.find((x) => x.position.toLowerCase() === inputVal.toLowerCase());
      if (selectedPosition) {
        const newSnackPosition = {
          positionId: selectedPosition.id,
          snackId: event.target.id,
          machineId: selectedPosition.machineId,
          uid,
        };
        snackPositionData.createSnackPosition(newSnackPosition)
          .then(() => {
            // eslint-disable-next-line no-use-before-define
            buildTheStocker(uid);
            machine.buildTheMachine();
          });
      }
    })
    .catch((error) => console.error(error));
};

const addNewSnack = (event) => {
  event.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newSnack = {
    imageUrl: $('#snack-image-url').val(),
    name: $('#snack-name').val(),
    price: $('#snack-price').val() * 1,
    currentStocked: 0,
    lifetimeNum: 0,
    uid,
  };
  snackData.addNewSnack(newSnack)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildTheStocker(uid);
    })
    .catch((error) => console.error(error));
};

const buildTheStocker = (uid) => {
  smash.getSnacksWithPositions(uid)
    .then((snacks) => {
      let domString = '<h2>STOCK THE MACHINE</h2>';
      domString += `
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Add Snack
      </button>
      `;
      domString += '<div class="d-flex flex-wrap">';
      snacks.forEach((snack) => {
        domString += stockCard.makeASnack(snack);
      });
      domString += '</div>';
      utilities.printToDom('stock', domString);
      $('#stock').on('click', '.delete-snack-position', deleteFromMachine);
      $('#stock').on('click', '.add-snack-position', addToMachine);
      $('#add-new-snack').click(addNewSnack);
    })
    .catch((error) => console.error(error));
};

export default { buildTheStocker };
