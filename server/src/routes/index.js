const { Router } = require("express");
const { getRouter, getDrivers, getTeams, getDriverById } = require('./getRouterjs');
const { postDrivers } = require("./postRouter");

const router = Router();

router.get('/', getRouter)

router.get('/drivers', getDrivers)

router.get('/drivers/:id', getDriverById)

router.post('/drivers', postDrivers)

router.get('/teams', getTeams)



module.exports = router;
