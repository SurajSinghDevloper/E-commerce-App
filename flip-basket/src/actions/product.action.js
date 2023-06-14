import axios from '../helpers/axios';
import { productConstant } from './constant';

export const getProductBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/products/${slug}`);
        console.log("👉👉 ~~ file: product.action.js:7 ~~ exportsgetProductBySlug ~~ res:", res.data)
        if (res.status === 200 || res.status === 304) {
            dispatch({
                type: productConstant.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload: res.data
            })
        }
    }
}


export const getProductPage = (payload) => {
    return async dispatch => {
        const { cid, type } = payload.params;
        console.log("👉👉 ~~ file: product.action.js:21 ~~ getProductPage ~~ payload:", payload)
        const res = await axios.get(`/page/${cid}/${type}`);
        console.log("👉👉 ~~ file: product.action.js:22 ~~ exportsgetProductBySlug ~~ res:", res)
        dispatch({ type: productConstant.GET_PRODUCT_PAGE_REQUEST });
        const { pages } = res.data;
        console.log("👉👉 ~~ file: product.action.js:26 ~~ getProductPage ~~ page:", pages)
        if (res.status === 200) {
            dispatch({
                type: productConstant.GET_PRODUCT_PAGE_SUCCESS,
                payload: { pages }
            })
        } else {
            const { error } = res.data;
            dispatch({
                type: productConstant.GET_PRODUCT_PAGE_FAILURE,
                payload: { error }
            })
        }
    }
}