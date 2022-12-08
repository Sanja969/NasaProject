const express = require('express');
const { httpGetAllPlannets } = require('./planets.controller')

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlannets);

module.exports = planetsRouter;
