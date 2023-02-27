const  { Videogame } = require('../../db');


const postVideoGames = async (videoGame) => {
    try {
        const { name, description, platforms, image, relaseDate, rating, genre } = videoGame;
        console.log(genre,1);
        if(!name || !description || !platforms || !relaseDate || !rating || !genre ) throw Error ('The params are not complete')
        
        const newVideoGame = { name, description, platforms, image, relaseDate, rating };

        if(!newVideoGame) throw new Error('Failed to created videogame')
        console.log(videoGame.genre, 2);
        const game = await Videogame.create( newVideoGame );
        await game.addGenre(genre);

        return newVideoGame;
    } catch (error) {
        return {error: error.message}
    }
};

module.exports = { postVideoGames }