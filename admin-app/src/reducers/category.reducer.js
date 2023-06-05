import { categoryConstant } from "../actions/constant"

const initialState = {
    categories: [],
    loading: false,
    error: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryConstant.GET_ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload.categories,
            };
        default:
            return state;
    }
};
export default reducer;