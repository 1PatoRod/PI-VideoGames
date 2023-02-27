//======================================IMPORT THE ACTIONS TYPES REQUIRED======================================\\
import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_VIDEOGAME_BY_NAME, GET_ALL_GENRES, CLEAR_DETAIL, CLEAR_VIDEOGAMES, CLEAR_GENRES, FILTER_BY_GENRE, FILTER_BY_ORIGIN, FILTER_BY_DIRECTION, FILTER_BY_ALPHABETIC, FILTER_BY_RATING } from './actionsTypes';
import axios from 'axios';

//==============================================GET ALL VIDEOGAMES==============================================\\
const getAllVideoGames = () => {
    return async function (dispatch) {
        const apiData = await axios(`/videogames`);
        const games = apiData.data;
        return dispatch({ type : GET_ALL_VIDEOGAMES, payload : games })
    }
}

//===============================================GET GAME DETAIL===============================================\\
const getVideoGameDetail = (id) => {
    return async function (dispatch) {
        const apiData = await axios(`/videogames/${id}`);
        const game = apiData.data;
        return dispatch({ type : GET_VIDEOGAME_DETAIL, payload : game });
    };
};

//============================================GET VIDEOGAME BY NAME============================================\\
const getVideoGameByName = (name) => {
    return async function (dispatch) {
        const apiData = await axios(`/videogames?name=${name}`);
        const game = apiData.data
        return dispatch({ type : GET_VIDEOGAME_BY_NAME, payload : game });
    };
};

//================================================GET ALL GENRES================================================\\
const getAllGenres = () => {
    return async function (dispatch) {
        const apiData = await axios(`/genres/genres`);
        const genres = apiData.data;
        return dispatch({ type : GET_ALL_GENRES, payload : genres });
    };
};

//======================================CLEAR DETAIL, VIDEOGAME AND GENRES======================================\\
const clearVideoGameDetail = () => {
    return (dispatch) => {
        return dispatch ({ type : CLEAR_DETAIL });
    };
};

const clearVideoGames = () => {
    return (dispatch) => {
        return dispatch ({ type : CLEAR_VIDEOGAMES });
    };
};

const clearGenres = () => {
    return (dispatch) => {
        return dispatch({ type : CLEAR_GENRES})
    };
};

//=============================================FILTERS FUNCTIONS=============================================\\
//----------------------------------------FILTRAR POR GENRE Y ORIGIN----------------------------------------\\

const filterByGenre = (genreId) => {
    return  (dispatch, getState) => {
        const AllVideoGames = getState().videoGames;
        let filteredVideoGames = AllVideoGames; // inicializa los videojuegos filtrados como todos los videojuegos
        if (genreId !== "Genre All") {
        // filtra los videojuegos por género
            filteredVideoGames = filteredVideoGames.filter(videoGame => videoGame.genres.some((genre) => genre.id === Number(genreId))//some compara.
            );
            dispatch({ type: FILTER_BY_GENRE, payload: filteredVideoGames });
        };
        dispatch({ type: FILTER_BY_GENRE, payload: filteredVideoGames });
    };
};

const filterByOrigin = (origin) => {
    return  function (dispatch, getState) {
        const AllVideoGames = getState().videoGames;
        let filteredVideoGames = AllVideoGames;
        if (origin !== 'Origin All'){
            if(origin === 'DB'){
                filteredVideoGames = filteredVideoGames.filter( videogame => videogame.hasOwnProperty('createdInDb'))//comprueba que exista createdInDb en el videojuego.
            }
            if(origin === 'API'){
                filteredVideoGames = filteredVideoGames.filter( videogame => !videogame.hasOwnProperty('createdInDb'))//comprueba que exista createdInDb en el videojuego.
            }
            dispatch({ type: FILTER_BY_ORIGIN, payload: filteredVideoGames })
        }
        dispatch({ type: FILTER_BY_ORIGIN, payload: filteredVideoGames })
    }
};
//--------------------------------FILTRAR POR DIRECTION, ALPHABETIC Y RATING--------------------------------\\

const filterByDirectional = (direc) => {
    return (dispatch, getState) => {
        const filteredVideoGames = getState().filterVideoGames;
        if(direc !== "Sort") {
            let sortFilter = direc === 'asc' ? filteredVideoGames.sort( (a, b) => {
                if(a.id > b.id) return 1;
                if(b.id > a.id) return -1;
                return 0;
            })
            : filteredVideoGames.sort( (a, b) => {
                if(a.id > b.id) return -1;
                if(b.id > a.id) return 1;
                return 0;
            });
            dispatch({ type : FILTER_BY_ALPHABETIC, payload : sortFilter })
        }
        dispatch({ type : FILTER_BY_ALPHABETIC, payload : filteredVideoGames })
    };
};

const filterBYAlphabetical = (direc) => {
    return (dispatch, getState) => {
        const filteredVideoGames = getState().filterVideoGames;
        if(direc !== "Sort") {
            let sortFilter = direc === 'A_Z' ? filteredVideoGames.sort( (a, b) => {
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            })
            : filteredVideoGames.sort( (a, b) => {
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            });
            dispatch({ type : FILTER_BY_DIRECTION, payload : sortFilter })
        }
        dispatch({ type : FILTER_BY_DIRECTION, payload : filteredVideoGames })
    };
};

const filterByRating = (direc) => {
    return (dispatch, getState) => {
        const filteredVideoGames = getState().filterVideoGames;
        if(direc !== "Sort") {
            let sortFilter = direc === 'low_to_high' ? filteredVideoGames.sort( (a, b) => {
                if(a.rating > b.rating) return 1;
                if(b.rating > a.rating) return -1;
                return 0;
            })
            : filteredVideoGames.sort( (a, b) => {
                if(a.rating > b.rating) return -1;
                if(b.rating > a.rating) return 1;
                return 0;
            });
            dispatch({ type : FILTER_BY_RATING, payload : sortFilter })
        }
        dispatch({ type : FILTER_BY_RATING, payload : filteredVideoGames })
    };
};

//=============================================CREATE VIDEOGAME=============================================\\

const createVideoGame = (videogame) => {
    return async (dispatch) => {
        const { name, description, platforms, image, relaseDate, rating, genres } = videogame
        const game = {
            name: name,
            description: description,
            platforms: [platforms],
            image: image,
            relaseDate: relaseDate,
            rating: rating,
            genre: genres?.map(genre => parseInt(genre)),
        };
        console.log(game.platforms);
        console.log(game.genre)
        const response = await axios.post('/videogames', game);
        console.log(response)
        return response;
    }
};

//============================================EXPORT THE ALL ACTIONS============================================\\
export { clearVideoGameDetail, getAllGenres, getVideoGameByName, getVideoGameDetail, getAllVideoGames, clearVideoGames, clearGenres, filterByGenre, filterByOrigin, filterByDirectional, filterBYAlphabetical, filterByRating, createVideoGame }