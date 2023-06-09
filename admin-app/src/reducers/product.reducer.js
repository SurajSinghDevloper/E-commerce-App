import { productConstant } from "../actions/constant";

const initialState = {
    product: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstant.GET_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload.product
            }
        default:
            return state
    }
}


export default reducer;
// import { productConstant } from '../actions/constant';

// const initialState = {
//     products: [],
//     loading: false,
//     error: null
// };

// const productReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case productConstant.GET_PRODUCTS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case productConstant.GET_PRODUCTS_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 products: action.payload
//             };
//         case productConstant.GET_PRODUCTS_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload
//             };
//         case productConstant.ADD_PRODUCT_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             };
//         case productConstant.ADD_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 products: [...state.products, action.payload]
//             };
//         case productConstant.ADD_PRODUCT_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload
//             };
//         default:
//             return state;
//     }
// };

// export default productReducer;
