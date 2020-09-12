import { MovieActions } from "../actions/movieActions";
import { MovieElem } from "../../utils/interfaces";
import update from 'react-addons-update';

type MovieState = {
    movies: Array<MovieElem>
}

const initialState: MovieState = {
    movies: []
}

const MovieReducer = (state: MovieState = initialState, action: MovieActions): MovieState => {
    switch(action.type) {
        case 'ADD_MOVIE':
            return {
                ...state,
                movies: [...state.movies, action.newItem]
            };
        case 'DELETE_MOVIE':
            return {
                ...state,
                movies: state.movies.filter(movie => movie.id !== action.itemId)
            }
        case 'LIKE_MOVIE':
            return update(state, { 
                movies: { 
                  [action.itemId]: {
                    likes: {$set: (state.movies[action.itemId].liked) ? state.movies[action.itemId].likes - 1 : state.movies[action.itemId].likes + 1},
                    liked: {$set: !state.movies[action.itemId].liked},
                  }
                }
            });
        case 'DISLIKE_MOVIE':
            return update(state, { 
                movies: { 
                  [action.itemId]: {
                    dislikes: {$set: (state.movies[action.itemId].disliked) ? state.movies[action.itemId].dislikes - 1 : state.movies[action.itemId].dislikes + 1},
                    disliked: {$set: !state.movies[action.itemId].disliked},
                  }
                }
            });
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.value
            }
        default:
            return state;
    }
}
    
export default MovieReducer;