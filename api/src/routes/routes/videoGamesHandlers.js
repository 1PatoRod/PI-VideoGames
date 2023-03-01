const { getAllVideoGames, getVideoGameDetail, getSearchName, getGenres } = require('../controller/getcontroller')
const { postVideoGames } = require('../controller/postcontroller')

const getAllVideoGamesHandler = async (req, res) => {
    try {
        const { name } = req.query;
        if(name){
            const games = await getSearchName(name)
            res.status(200).json(games)
        } else {
            const games = await getAllVideoGames();
            res.status( 200 ).json( games );
        }
    } catch ( error ) {
        res.status( 404 ).json({ error : error.message });
    }
};

const getVideoGameDetailHandler =  async (req, res) => {
    try {
        const { idVideogame} = req.params;
        if(!idVideogame) throw new Error('Invalid param, id is not provided');
        const game = await getVideoGameDetail( idVideogame );
        res.status( 200 ).json( game );
    } catch ( error ) {
        res.status( 404 ).json({ error : error.message });
    }
};

const getGenresHandler = async (req, res) => {
    try {
        const genres = await getGenres()
        res.status( 200 ).json(genres)
    } catch ( error ) {
        res.status( 404 ).json({ error : error.message });
    }
};

const postVideoGamesHandler = async (req, res) => {
    try{
        const videoGameBody = req.body;
        const videoGame = await postVideoGames(videoGameBody);
        res.status(200).json(videoGame)
    } catch ( error ) {
        res.status( 400 ).json( { error : error.message } );
    }
};

module.exports = { getAllVideoGamesHandler, getVideoGameDetailHandler, getGenresHandler, postVideoGamesHandler };