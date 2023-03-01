require('dotenv').config()
const { API_KEY } = process.env;
const axios = require('axios');
//We require the necessary auxiliaries for the controllers...
const { Genre } = require('../../db');
const { auxGetAllVideogamesApi, auxGetAllVideogamesDB, auxGetVideoGameDetailApi, auxGetVideoGameDetailDB, validateUUID, validateUUIDv4, validateNum, auxGetSearchNameApi, auxGetSearchNameDB } = require('./auxControllers')

//==============================================GET ALL VIDEOGAMES==============================================\\

const getAllVideoGames = async () => {
    try {
        const getApi = await auxGetAllVideogamesApi();
        const getDB = await auxGetAllVideogamesDB();
        if(!getApi && !getDB) throw new Error ('No videogames found in the database or web API');
        return [...getDB, ...getApi];
    } catch (error) {
        return {error : error.message};
    }
};
//=============================================GET VIDEOGAME DETAIL=============================================\\
const getVideoGameDetail = async (id) => {
    try {
        if(!validateUUID(id) && !validateUUIDv4(id) && !validateNum(id)) throw new Error('invalid params, try a number or UUID');
        if(validateUUID(id) || validateUUIDv4(id)){
            const getDBDetail = await auxGetVideoGameDetailDB(id);
            return [getDBDetail];
        };
        if(validateNum(id)){
            const getApiDetail = await auxGetVideoGameDetailApi(id);
            return [getApiDetail];
        };
        // throw new Error('invalid params, try a number or UUID');
    } catch (error) {
        return {error : error.message}
    };
};
//==============================================GET SEARCH BY NAME==============================================\\


const getSearchName = async (name) => {
    try {
        const getApiSearchName = await auxGetSearchNameApi(name);
        const getDBSearchName = await auxGetSearchNameDB(name);
        if(!getApiSearchName && !getDBSearchName) throw new Error(`The videogame ${name} was not found in the database or web API`)
        return [ ...getDBSearchName , ...getApiSearchName ]
    } catch (error) {
        return { error : error.message }
    }
};
//==================================================GET GENRES==================================================\\
//Function that gets all genres from the API .
//Funcion que obtiene todos los generos de la API.
const getGenres = async () => {
    try {
        const allGenres = [];
        allGenres.push((await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data);
        const genresInfo = await allGenres[0]?.results?.map( genre => {
            return {
                id: genre.id,
                name: genre.name,
            }
        });
        if(!allGenres||!genresInfo) throw new Error('Genres not found')
        genresInfo.forEach(element => {
            Genre.findOrCreate({
                where: {
                    id: element.id,
                    name: element.name,
                }
            });
        });
        const fullGenres =await Genre.findAll()
        return fullGenres;
    } catch (error) {
        return {error : error.message};
    }
};
//==============================================EXPORT CONTROLLERS==============================================\\

module.exports = { getAllVideoGames, getVideoGameDetail, getSearchName, getGenres };