import axios from "../helpers/axios";
import { categoryConstant, productConstant } from "./constant"

export const getInitialData = () => {
    return async dispatch => {
        const res = await axios.post(`/initialData`);
        if (res.status === 200) {
            const { categories, product } = res.data;
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    categories
                }
            });
            dispatch({
                type: productConstant.GET_ALL_PRODUCT_SUCCESS,
                payload: {
                    product
                }
            })
        }
        console.log("Here is from line 22 page:InitialData.Action.js=> res value", res);
    }
}