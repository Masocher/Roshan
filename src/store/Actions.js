import { CHANGE_SLUG, GET_PRODUCTS } from "./Types";

export const changeSlug = (slug) => {
    return { type: CHANGE_SLUG, slug: slug };
};

export const getProducts = (products) => {
    return { type: GET_PRODUCTS, products: products };
};
