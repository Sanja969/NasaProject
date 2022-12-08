const { getAllLaunches, addNewLaunch, abortLaunch, existLaunch } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunches(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Missing required launch propery'
    })
  }
  launch.launchDate = new Date(launch.launchDate);
  if (launch.launchDate.toString() === 'Invalid Date') {
    return res.status(400).json({
      error: 'Invalid launch date'
    })
 }
  addNewLaunch(launch);
  res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  console.log(req.params.id)
  const launchId = Number(req.params.id);

  if (!existLaunch(launchId)) {
    return res.status(404).json({
      error: 'Launch not found'
    })
  }
  const aborted = abortLaunch(launchId);
  return res.status(202).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
  httpAbortLaunch,
}