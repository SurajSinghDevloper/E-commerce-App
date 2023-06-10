import axios from '../helpers/axios';
import { categoryConstant } from './constant';

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST });
        try {
            const res = await axios.get('/category/getCategory');
            console.log("👉👉 ~~ file: category.action.js:9 ~~ getAllCategory ~~ res:", res);
            if (res.status === 200 || res.status === 201) {
                const { categoryList } = res.data;
                if (Array.isArray(categoryList)) { // Check if categoryList is an array
                    dispatch({
                        type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                        payload: {
                            categories: categoryList
                        }
                    });
                } else {
                    throw new Error("Invalid category list");
                }
            } else {
                if (res.status === 400 || res.status === 500) {
                    dispatch({
                        type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
                        payload: {
                            error: res.data.error
                        }
                    });
                }
            }
        } catch (error) {
            console.log("👉👉 ~~ file: category.action.js:5 ~~ getAllCategory ~~ error:", error);
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
                payload: {
                    error: error.message
                }
            });
        }
    };
};

// export const addCategory = (form) => {
//     return async dispatch => {
//         dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST });
//         try {
//             const res = await axios.post('/category/addCategory', form);
//             console.log("👉👉 ~~ file: category.action.js:32 ~~ addCategory ~~ res:", res);
//             if (res.status === 200 || res.status === 201) {
//                 dispatch({
//                     type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
//                     payload: { category: res.data.category }
//                 });
//             } else {
//                 dispatch({
//                     type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
//                     payload: res.data.error
//                 });
//             }
//         } catch (error) {
//             console.log("👉👉 ~~ file: category.action.js:32 ~~ addCategory ~~ error:", error);
//             dispatch({
//                 type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
//                 payload: {
//                     error: error.message
//                 }
//             });
//         }
//     };
// };
