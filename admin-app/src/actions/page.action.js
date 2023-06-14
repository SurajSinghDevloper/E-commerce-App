import axios from "../helpers/axios";
import { pageConstant } from "./constant";

export const createPage = (form) => {
    return async (dispatch) => {
        dispatch({ type: pageConstant.CREATE_PAGE_REQUEST });
        try {
            const res = await axios.post('/page/create', form);
            dispatch({
                type: pageConstant.CREATE_PAGE_SUCCESS,
                payload: {
                    page: res.data.page
                }
            });
        } catch (error) {
            dispatch({
                type: pageConstant.CREATE_PAGE_FAILURE,
                payload: {
                    error: error.response.data.error
                }
            });
            console.log("Error:", error);
        }
    };
};
