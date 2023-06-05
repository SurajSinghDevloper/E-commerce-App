import axios from '../helpers/axios'
import { categoryConstant } from './constant';

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST })
        const res = await axios.get(`category/getCategory`);
        console.log("👉👉 ~~ file: category.action.js:5 ~~ getAllCategory ~~ res:", res);
        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    categories: categoryList
                }
            })
        } else {
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
};

export const addCategory = (form) => {
    return async dispatch => {
        const res = await axios.post(`/category/addCategory`, form);
        console.log("👉👉 ~~ file: category.action.js:32 ~~ addCategory ~~ res:", res)
    }
}