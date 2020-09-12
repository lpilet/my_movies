import { MovieElem } from "../../utils/interfaces";

export interface IAddMovieAction {
    readonly type: 'ADD_MOVIE';
    newItem: MovieElem;
}

export interface IDeleteMovieAction {
    readonly type: 'DELETE_MOVIE';
    itemId: number;
}

export interface ILikeMovieAction {
    readonly type: 'LIKE_MOVIE';
    itemId: number;
}

export interface IDislikeMovieAction {
    readonly type: 'DISLIKE_MOVIE';
    itemId: number;
}

export interface ISetMoviesAction {
    readonly type: 'SET_MOVIES';
    value: Array<MovieElem>
}

export type MovieActions =
| IAddMovieAction
| IDeleteMovieAction
| ILikeMovieAction
| ISetMoviesAction
| IDislikeMovieAction