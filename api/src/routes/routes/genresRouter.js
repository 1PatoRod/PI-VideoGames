const router = require('express').Router();
const { getGenresHandler } = require('./videoGamesHandlers')

router.get('/genres', getGenresHandler);

module.exports = router;