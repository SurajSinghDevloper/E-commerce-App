import { productConstant } from "../actions/constant";

const initialState = {
    products: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: [],
        moreThan30k: []
    },
    pageRequest: false,
    pages: {},
    productDetails: {},
    loading: false,
    error: null
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case productConstant.GET_PRODUCT_BY_SLUG_SUCCESS:
            return {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice,
                },
            };
        case productConstant.GET_PRODUCT_PAGE_REQUEST:
            return {
                ...state,
                pageRequest: true
            };
        case productConstant.GET_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                pages: action.payload.pages,
                pageRequest: false
            };
        case productConstant.GET_PRODUCT_PAGE_FAILURE:
            return {
                ...state,
                pageRequest: false,
                error: action.payload.error
            };
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            return {
                ...state,
                pageRequest: true
            };
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            return {
                ...state,
                productDetails: action.payload.productDetails,
                loading: false
            };
        case productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            return {
                ...state,
                pageRequest: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}



