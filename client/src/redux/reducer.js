import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_VIDEOGAME_BY_NAME, GET_ALL_GENRES, CLEAR_DETAIL, CLEAR_VIDEOGAMES, CLEAR_GENRES, APPLY_FILTERS, CREATE_VIDEOGAME } from './actionsTypes';

const initialState = {
    videoGames : [],
    videoGameDetail : [],
    genres : [],
    filterVideoGames : [],
}

const rootReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case GET_ALL_VIDEOGAMES:
            return { ...state,
                videoGames : action.payload,
                filterVideoGames: action.payload };
        case GET_VIDEOGAME_DETAIL:
            return { ...state,
                videoGameDetail : action.payload };
        case GET_VIDEOGAME_BY_NAME:
            return {...state,
                filterVideoGames : action.payload, };
        case GET_ALL_GENRES:
            return { ...state,
                genres : action.payload };
        case CLEAR_DETAIL:
            return { ...state,
                videoGameDetail : [] };
        case CLEAR_VIDEOGAMES:
            return { ...state,
                    videoGames : [],
                    filterVideoGames : []};
        case CLEAR_GENRES:
            return { ...state,
                    genres : [] };
        case APPLY_FILTERS: 
            return { ...state,
                filterVideoGames : action.payload };
        case CREATE_VIDEOGAME:
            return { ...state };
        default: 
            return { ...state };
    }
}

export default rootReducer;