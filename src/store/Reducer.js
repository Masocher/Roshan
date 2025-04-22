import { combineReducers } from "redux";
import { GET_PRODUCTS } from "./Types";

const products = [];

const productsReducer = (state = products, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return (state = action.products);

        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    productsReducer,
});
