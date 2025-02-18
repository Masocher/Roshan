import { combineReducers } from "redux";
import { CHANGE_SLUG, GET_PRODUCTS } from "./Types";

const products = [];

const productsReducer = (state = products, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return (state = action.products);

        default:
            return state;
    }
};

const slug = "";

const slugReducer = (state = slug, action) => {
    switch (action.type) {
        case CHANGE_SLUG:
            return (state = action.slug);

        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    productsReducer,
    slugReducer,
});
