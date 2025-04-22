import { GET_PRODUCTS } from "./Types";

export const getProducts = (products) => {
    return { type: GET_PRODUCTS, products: products };
};
