import { userConstant } from "../actions/constant";

const initialState = {
    error: null,
    message: '',
    loading: false
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstant.USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstant.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message
            };
        case userConstant.USER_REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default reducer;

