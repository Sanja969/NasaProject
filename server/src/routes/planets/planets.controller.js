const { getAllPlanets } = require('../../models/planets.model');

async function httpGetAllPlannets(req, res) {
  return res.status(200).json( await getAllPlanets());
}

module.exports = {
  httpGetAllPlannets,
}