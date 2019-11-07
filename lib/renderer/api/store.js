const { ipcRenderer } = require('electron');

function getCapsuleList() {
  // ! option param: order style
  return Object.keys(ipcRenderer.sendSync('get-capsules'));
}
function getTargetsOfCapsule(capsuleName) {
  const capsuleInfo = ipcRenderer.sendSync('get-capsules')[capsuleName];
  const targets = capsuleInfo.targets.list;
  // Return only existing targets
  targets.forEach((target, index) => {
    if (capsuleInfo.targets[target].exist === false) {
      targets.splice(index, 1);
    }
  })

  return targets;
}

function getTrainings() {
  const capsule = arguments.length > 0
    ? arguments[0]
    : undefined;

  const target = arguments.length > 1
    ? arguments[1]
    : undefined;

  const query = arguments.length > 2
    ? arguments[2]
    : undefined;

  return ipcRenderer.sendSync('get-trainings', { capsule, target, query });
}

function addCapsule(capsuleName, capsulePath) {
  ipcRenderer.send('add-capsule', { capsuleName, capsulePath });
}

function addTrainingInfos(capsuleName, capsuleTrainings) {
  ipcRenderer.send('add-training', { capsuleName, capsuleTrainings });
}


function deleteCapsule(capsuleName) {
  ipcRenderer.send('delete-capsule', { capsuleName });
}

function deleteTrainings(capsuleName) {
  ipcRenderer.send('delete-trainings', { capsuleName });
}

module.exports = {
  getCapsuleList,
  getTargetsOfCapsule,
  addCapsule,
  addTrainingInfos,
  deleteCapsule,
  deleteTrainings,
  getTrainings,
};