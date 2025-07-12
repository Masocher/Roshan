import { combineReducers } from "redux";

const SET_CATEGORY_QUERY = "SET_CATEGORY_QUERY";

export const setCategoryQuery = (text) => ({
  type: SET_CATEGORY_QUERY,
  query: text,
});

const initialCategory = "";

const categoryReducer = (state = initialCategory, action) => {
  switch (action.type) {
    case SET_CATEGORY_QUERY:
      return action.query;
    default:
      return state;
  }
};

const SET_BRAND_QUERY = "SET_BRAND_QUERY";

export const setBrandQuery = (text) => ({
  type: SET_BRAND_QUERY,
  query: text,
});

const initialBrand = "";

const brandReducer = (state = initialBrand, action) => {
  switch (action.type) {
    case SET_BRAND_QUERY:
      return action.query;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  category: categoryReducer,
  brand: brandReducer,
});
