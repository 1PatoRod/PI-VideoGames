require('dotenv').config()
const { API_KEY } = process.env;
const axios = require('axios');

const { Videogame, Genre } = require('../../db');

//=============================================AUX GETALLVIDEOGAMES=============================================\\
//Function to obtain all the videogames, the first from the api (it is adjustable), the second from our DB.
//Funcion para obtener todos los videojuegos, la primera desde la api (es regulable), la segunda de nuestra DB.
const auxGetAllVideogamesApi = async () => {
    // const apiResponse = [];
    // for (let index = 1; index <= 1; index++) { //Utilizado para traer numero limitado de videoGames.
    //     apiResponse.push( (await axios(`https://api.rawg.io/api/games/${index}?key=${API_KEY}`) ).data );
    // }
    const apiResponse = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results;
    const videoGamesInfo = await apiResponse?.map(game => {
        return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            genres: game.genres?.map(genre => {
                return {
                    id: genre.id,
                    name: genre.name,
                }
            }),
            rating: game.rating,
        }
    })
    return videoGamesInfo;
};

const auxGetAllVideogamesDB = async () => {
    const dbResponse = await Videogame.findAll({
        include: {
            model: Genre,
            as: 'genre',
            attributes: ['id', 'name'],
            through: {
            attributes: [],
            }
        }
    });
    const dbInfo = await dbResponse?.map(game => {
        return {
            id: game.id,
            name: game.name,
            image: game.image,
            genres: game.genre?.map(genre => {
                return {
                    id: genre.id,
                    name: genre.name,
                }
            }),
            rating: game.rating,
            createdInDb: game.createdInDb,
        }
    })
    return dbInfo;
}
//============================================AUX GETVIDEOGAMEDETAIL============================================\\
//Function that searches videogame by id, in first time from the API and second time from our DB.
//Funcion que busca por videogame por id, en la primera desde la API y la segunda desde nuestra DB.
const auxGetVideoGameDetailApi = async (id) => {
    const apiResponse = (await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`) ).data;

    if(apiResponse) {
        const videoGamesInfo = {
            id: apiResponse.id,
            name: apiResponse.name,
            description: apiResponse.description,
            platforms: apiResponse.platforms?.map(platform => platform.platform.name),
            image: apiResponse.background_image,
            relaseDate: apiResponse.released,
            rating: apiResponse.rating,
            genres: apiResponse.genres?.map(genre => {
                return {
                    id: genre.id,
                    name: genre.name,
                }
            }),
        }
        return videoGamesInfo;
    }
};

const auxGetVideoGameDetailDB = async (id) => {
    const dbResponse = await Videogame.findAll({
        where: { id },
        include: {
            model: Genre,
            as: 'genre',
            through: {
            attributes: []
            }
        }
    });
    // return dbResponse;
    if(dbResponse){
    const dbResponseGame = dbResponse[0];
    // return dbFindResponse;

        const dbVideoGamesInfo = {
            id: dbResponseGame.id,
            name: dbResponseGame.name,
            description: dbResponseGame.description,
            platforms: dbResponseGame.platforms,
            image: dbResponseGame.image,
            relaseDate: dbResponseGame.relaseDate,
            rating: dbResponseGame.rating,
            genres: dbResponseGame.genre?.map(genres => {
                return {
                    id : genres.id,
                    name : genres.name,
                }
            })
        }
        return dbVideoGamesInfo;
    } else {
        return null;
    }
};
//Aqui abajo valido si la id es una uuid y la siguiente uuidv4.
const validateUUID = (uuid) => {
    const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return valid.test(uuid)
};
const validateUUIDv4 = (uuid) => {
    const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return valid.test(uuid)
};
const validateNum = (id) => {
    const valid = typeof Number(id) === 'number';
    if(valid) return true;
    else return false;
}
//===============================================AUX SEARCHBYNAME===============================================\\
//Function that searches videogame by name, in first time from the API and second time from our DB.
//Funcion que busca por videogame por nombre, en la primera desde la API y la segunda desde nuestra DB.
const auxGetSearchNameApi = async (name) => {
    const firstResponse = [];
    firstResponse.push((await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data);
    const secondResponse = [];
    secondResponse.push(firstResponse[0].results);
    const thirdResponse = [];
    secondResponse?.map(videoGame => videoGame?.map(game => {
        thirdResponse.push({
            id: game.id,
            name: game.name,
            image: game.background_image,
            genres: game.genres?.map(genre => {
                return {
                    id: genre.id,
                    name: genre.name,
                }
            }),
            rating: game.rating,
        })
    }))
    const result = thirdResponse.slice(0,15);
    return result;
};

const auxGetSearchNameDB = async (name) => {
    const videoName = name.toLowerCase();
    const dbResponse = await Videogame?.findAll({
        include: {
            model: Genre,
            as: 'genre',
            through: {
            attributes: []
            }
        }
    });
    const dbResult = await dbResponse.filter( videoGame => videoGame.name.toLowerCase().includes(videoName) === true);
    const dbVideoGamesInfo = dbResult.map(game => {
        return {
            id: game.id,
            name: game.name,
            image: game.image,
            genres: game.genre?.map(genre => {
                return {
                    id: genre.id,
                    name: genre.name,
                }
            }),
            rating: game.rating,
            createdInDb: game.createdInDb,
        }
    });
    return dbVideoGamesInfo;
};
//===============================================EXPORT FUNCTIONS===============================================\\

module.exports = { auxGetAllVideogamesApi, auxGetAllVideogamesDB, auxGetVideoGameDetailApi, auxGetVideoGameDetailDB, validateUUID, validateUUIDv4, validateNum, auxGetSearchNameApi, auxGetSearchNameDB };