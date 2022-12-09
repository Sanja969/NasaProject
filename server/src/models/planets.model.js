const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const planets = require('./planets.mongo');

function isHabitable(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
  && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
  && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..','..','data','kepler-data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        if (isHabitable(data)) {
          savePlanets(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const countPlanets = (await getAllPlanets()).length;
        console.log(`${countPlanets} habitable planets found!`);
        resolve();
    });

  });
};

async function getAllPlanets() {
  return await planets.find({}, {
    '_id': 0, '__v': 0,
  });
}

async function savePlanets(planet) {
  try {
    await planets.updateOne({
      keplerName: planet.kepler_name,
    }, {
      keplerName: planet.kepler_name,
    }, {
      upsert: true,
    });
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
