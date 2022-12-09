const axios = require('axios');
const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHTS_NUMBER = 100;

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function populateLaunches() {
  console.log('Loading launch data...');                                                               
  const response = await axios.post(SPACEX_API_URL, {
    query:{},
	  options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select : {
            name: 1
          }
        },
        {
          path: 'payloads',
          select : {
            customers: 1
          }
        }
      ]
	}
  });

  if(response.status !== 200) {
    console.log('Failed to load launch data');
    throw new Error('Failed to load launch data');
  }
  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads']
    const customers = (payloads || []).flatMap((payload) => {
      return payload['customers']
    })
    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: (launchDoc['rocket'] || [])['name'],
      launchDate: launchDoc['date_local'],
      customers,
      upcoming: true,
      success: true,
    }

    console.log(`${launch.flightNumber} ${launch.customers}`)
    saveLaunch(launch);
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });
  if (firstLaunch) {
    console.log('Launch data already loaded');
  } else {
    populateLaunches();
  }
}

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function ifExistLaunch(id) {
  return await findLaunch({flightNumber: id});
}

async function saveLaunch(launch) {
  await launches.findOneAndUpdate({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  })
}

async function getLatestFLightNumber() {
  const latestLaunch = await launches
  .findOne()
  .sort('-flightNumber');

  if(!latestLaunch) return DEFAULT_FLIGHTS_NUMBER;

  return latestLaunch.flightNumber;
}

async function getAllLaunches(skip, limit) {
  return await launches.find({}, {
    '_id': 0, '__v': 0
  })
  .sort('flightNumber')
  .skip(skip)
  .limit(limit);
}

async function scheduleNewLaunch (launch) {
  const planet = await planets.find({
    keplerName: launch.target,
  })

  if (!planet) {
    throw new Error('No matching planet found')                      
  }
  const newFlightNumber = await getLatestFLightNumber() + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    upcoming: true,
    customers: ['ZTM', 'NASA'],
    success: true
  });

  await saveLaunch(newLaunch);
};

async function abortLaunch(launchId) {
  const aborted =  await launches.updateOne({
    flightNumber: launchId,
  }, {
      upcoming: false,
      success: false,
  });

  return aborted.modifiedCount === 1;
}

module.exports = {
  loadLaunchData,
  ifExistLaunch,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch
}
