const { getAllPlanets } = require('../../models/getAllPlanets.model');

function httpGetAllPlannets(req, res) {
  return res.status(200).json(getAllPlanets());
}

module.exports = {
  httpGetAllPlannets,
}