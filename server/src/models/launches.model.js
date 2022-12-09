const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHTS_NUMBER = 100;

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

saveLaunch(launch);

function existLaunch(id) {
  return launches.has(id);
}

async function saveLaunch(launch) {
  const planet = await planets.find({
    keplerName: launch.target,
  })

  if (!planet) {
    throw new Error('No matching planet found')
  }
  await launches.updateOne({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  })
}

async function getLatestFLightNumber() {
  const latestLaunch = await launches
  .findOne()
  .sort('-flightNumber');

  console.log(latestLaunch)
  if(!latestLaunch) return DEFAULT_FLIGHTS_NUMBER;

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launches.find({}, {
    '_id': 0, '__v': 0
  })
}

async function scheduleNewLaunch (lounch) {
  const newFlightNumber = await getLatestFLightNumber() + 1;
  const newLaunch = Object.assign(lounch, {
    flightNumber: newFlightNumber,
    upcoming: true,
    customers: ['ZTM', 'NASA'],
    success: true
  });

  await saveLaunch(newLaunch);
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
  scheduleNewLaunch,
  abortLaunch
}
