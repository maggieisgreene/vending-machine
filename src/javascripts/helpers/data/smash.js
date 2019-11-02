import machineData from './machineData';
import positionData from './positionData';
import snackPositionData from './snackPositionData';

const getCompleteMachine = () => new Promise((resolve, reject) => {
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineId(positions[0].machineId)
        .then((snackPositions) => resolve(snackPositions));
    })
    .catch((error) => reject(error));
});

export default { getCompleteMachine };
