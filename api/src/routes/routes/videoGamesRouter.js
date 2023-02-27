const router = require('express').Router();
const { getAllVideoGamesHandler, getVideoGameDetailHandler, postVideoGamesHandler } = require('./videoGamesHandlers')

router.get('/videogames', getAllVideoGamesHandler);

router.get('/videogames/:idVideogame', getVideoGameDetailHandler);



router.post('/videogames', postVideoGamesHandler)



module.exports = router;