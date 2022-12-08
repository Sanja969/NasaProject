const launches = require('./launches.mongo');

let latestFLightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existLaunch(id) {
  return launches.has(id);
}

function getAllLaunches() {
  return Array.from(launches.values())
}

function addNewLaunch(lounch) {
  latestFLightNumber++;
  launches.set(latestFLightNumber,
  Object.assign(lounch, {
    flightNumber: latestFLightNumber,
    upcoming: true,
    customers: ['ZTM', 'NASA'],
    success: true,
  })
  )
};

function abortLaunch(id) {
  const aborted =  launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existLaunch,
  getAllLaunches,
  addNewLaunch,
  abortLaunch
}
