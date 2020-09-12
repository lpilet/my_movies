import { combineReducers } from 'redux'
import filtersReducer from './filtersReducer'
import movieReducer from './movieReducer';

const rootReducer = combineReducers({
    filter: filtersReducer,
    movie: movieReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;