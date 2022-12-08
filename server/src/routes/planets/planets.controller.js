const { getAllPlanets } = require('../../models/planets.model');

function httpGetAllPlannets(req, res) {
  return res.status(200).json(getAllPlanets());
}

module.exports = {
  httpGetAllPlannets,
}