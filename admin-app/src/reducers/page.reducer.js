// import { pageConstant } from "../actions/constant";
// const initState = {
//     error: null,
//     loading: false,
//     page:{}
// }
// export default (state = initState, action)=>{
//     switch (action.type) {
//         case pageConstant.CREATE_PAGE_REQUEST:
//             return {
//                 ...state,
//                 loading:true
//             }
//         case pageConstant.CREATE_PAGE_SUCCESS:
//             return {
//                 loading: false
//             }
//             break;
//         case pageConstant.CREATE_PAGE_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload.error
//             }
//             break;
//         return
//             initState
//     }
// }

import { pageConstant } from "../actions/constant";

const initState = {
    loading: false,
    error: null
};

const pageReducer = (state = initState, action) => {
    switch (action.type) {
        case pageConstant.CREATE_PAGE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case pageConstant.CREATE_PAGE_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case pageConstant.CREATE_PAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default pageReducer;
