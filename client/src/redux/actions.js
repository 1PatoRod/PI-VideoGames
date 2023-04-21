//======================================IMPORT THE ACTIONS TYPES REQUIRED======================================\\
import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_VIDEOGAME_BY_NAME, GET_ALL_GENRES, CLEAR_DETAIL, CLEAR_VIDEOGAMES, CLEAR_GENRES, APPLY_FILTERS, FILTER_BY_GENRE, FILTER_BY_ORIGIN, FILTER_BY_DIRECTION, FILTER_BY_ALPHABETIC, FILTER_BY_RATING } from './actionsTypes';
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
const filters = (filters) => {
    return async (dispatch, getState) => {
        const AllVideoGames = getState().videoGames;
        const { genreId, origin, direcDir, direcAlph, direcRating } = filters;

        const filterGenre = await filterByGenre(genreId, AllVideoGames);
        const filterOrigin = await filterByOrigin(origin, filterGenre);
        const filterDirectional = await filterByDirectional(direcDir, filterOrigin);
        const filterAlphabetic = await filterBYAlphabetical(direcAlph, filterDirectional);
        const filterRating = await filterByRating(direcRating, filterAlphabetic);

        return dispatch({ type: APPLY_FILTERS, payload: filterRating });
    }
}
//----------------------------------------FILTRAR POR GENRE Y ORIGIN----------------------------------------\\

const filterByGenre = (genreId, AllVideoGames) => {
    if (genreId !== "Genre All") {
    // filtra los videojuegos por género
        const filteredVideoGames = AllVideoGames.filter(videoGame => videoGame.genres.some((genre) => genre.id === Number(genreId))//some compara.
        );
        return filteredVideoGames;
    };
    return AllVideoGames;
};

const filterByOrigin = (origin, filterGenre) => {
    if (origin !== 'Origin All'){
        if(origin === 'DB'){
            const filteredVideoGames = filterGenre.filter( videogame => videogame.hasOwnProperty('createdInDb'))//comprueba que exista createdInDb en el videojuego.
            return filteredVideoGames;
        }
        if(origin === 'API'){
            const filteredVideoGames = filterGenre.filter( videogame => !videogame.hasOwnProperty('createdInDb'))//comprueba que exista createdInDb en el videojuego.
            return filteredVideoGames;
        }
    }
    return filterGenre;
    
};
//--------------------------------FILTRAR POR DIRECTION, ALPHABETIC Y RATING--------------------------------\\

const filterByDirectional = (direcDir, filterOrigin) => {
    if(direcDir !== "Sort") {
        let sortFilter = direcDir === 'asc' ? filterOrigin.sort( (a, b) => {
            if(a.id > b.id) return 1;
            if(b.id > a.id) return -1;
            return 0;
        })
        : filterOrigin.sort( (a, b) => {
            if(a.id > b.id) return -1;
            if(b.id > a.id) return 1;
            return 0;
        });
        return sortFilter
    }
    return filterOrigin;
};

const filterBYAlphabetical = (direcAlph, filterDirectional) => {
    if(direcAlph !== "Sort") {
        let sortFilter = direcAlph === 'A_Z' ? filterDirectional.sort( (a, b) => {
            if(a.name > b.name) return 1;
            if(b.name > a.name) return -1;
            return 0;
        })
        : filterDirectional.sort( (a, b) => {
            if(a.name > b.name) return -1;
            if(b.name > a.name) return 1;
            return 0;
        });
        return sortFilter;
    }
    return filterDirectional;
};

const filterByRating = (direcRating, filterAlphabetic) => {
        if(direcRating !== "Sort") {
            let sortFilter = direcRating === 'low_to_high' ? filterAlphabetic.sort( (a, b) => {
                if(a.rating > b.rating) return 1;
                if(b.rating > a.rating) return -1;
                return 0;
            })
            : filterAlphabetic.sort( (a, b) => {
                if(a.rating > b.rating) return -1;
                if(b.rating > a.rating) return 1;
                return 0;
            });
            return sortFilter;
        }
        return filterAlphabetic;

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
export { clearVideoGameDetail, getAllGenres, getVideoGameByName, getVideoGameDetail, getAllVideoGames, clearVideoGames, clearGenres, filters, filterByGenre, filterByOrigin, filterByDirectional, filterBYAlphabetical, filterByRating, createVideoGame }