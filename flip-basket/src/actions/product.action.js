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