import snackData from '../../helpers/data/snackData';

const snackCardBuilder = () => {
  let domString = '';
  const snacks = snackData.getSnacksByUid();
  for (let i = 0; i < snacks.length; i += 0) {
    domString += `
    <div class="card">
    <img src="${snacks.imageUrl}" class="card-img-top" alt="${snacks.name}">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>
    `;
  }
  console.error(domString);
  return domString;
};

export default { snackCardBuilder };
