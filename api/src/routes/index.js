const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGamesRouter = require('./routes/videoGamesRouter')
const genresRouter = require('./routes/genresRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', videoGamesRouter);
router.use('/genres', genresRouter);

module.exports = router;
