import { authConstant } from "../actions/constant";

const initialState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
};

const reducer = (state = initialState, action) => {
    console.log("🚀 ~ file: auth.reducer.js:8 ~ reducer ~ action:", action);
    switch (action.type) {
        case authConstant.LOGIN_REQUEST:
            return {
                ...state,
                authenticating: true
            };
        case authConstant.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            };
        case authConstant.LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case authConstant.LOGOUT_SUCCESS:
            return {
                ...initialState
            }
        case authConstant.LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;




