const express = require('express');
const { getAllPlannets } = require('./planets.controller')

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlannets);

module.exports = planetsRouter;
