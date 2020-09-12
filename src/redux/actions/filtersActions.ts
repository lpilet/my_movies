import { CategoryElem } from "../../utils/interfaces";

export interface IChangePageElemsAction {
    readonly type: 'CHANGE_PAGE_ELEMS';
    value: number;
}

export interface IChangeSearchTextAction {
    readonly type: 'CHANGE_SEARCH_TEXT';
    value: string;
}

export interface IAddCategoryAction {
    readonly type: 'ADD_CATEGORY';
    category: CategoryElem;
}

export interface IDeleteCategoryAction {
    readonly type: 'DELETE_CATEGORY';
    value: string;
}

export interface ISelectCategoryAction {
    readonly type: 'SELECT_CATEGORY';
    itemId: number;
}

export type FiltersActions =
| IChangePageElemsAction 
| IChangeSearchTextAction
| IAddCategoryAction
| IDeleteCategoryAction
| ISelectCategoryAction