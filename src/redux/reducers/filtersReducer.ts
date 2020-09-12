import { FiltersActions } from "../actions/filtersActions";
import { CategoryElem } from "../../utils/interfaces";
import update from 'react-addons-update';

type FilterState = {
    categories: CategoryElem[];
    page: number;
    searchText: string;
}

const initialState: FilterState = {
    categories: [],
    page: 4,
    searchText: '',
}

const filtersReducer = (state: FilterState = initialState, action: FiltersActions): FilterState => {
    switch (action.type) {
        case 'SELECT_CATEGORY':
            return update(state, { 
                categories: { 
                  [action.itemId]: {
                    selected: {$set: !state.categories[action.itemId].selected}
                  }
                }
              });
        case 'DELETE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter((category) => {
                    return (category.name !== action.value)
                })
            };
        case 'ADD_CATEGORY':
            const categoryNameExtracted = state.categories.filter(category => category.name === action.category.name)

            if (categoryNameExtracted.length !== 0) {
                return (state);
            };
            return {
                ...state,
                categories: [
                    ...state.categories,
                    action.category
                ]
            };
        case 'CHANGE_PAGE_ELEMS':
            return {
                ...state,
                page: action.value,
            };
        case 'CHANGE_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.value
            };
        default:
            return state;
    }
}

export default filtersReducer;