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
        default:
            return state;
    }
}


// import { productConstant } from "../actions/constant";

// const initialState = {
//     products: [],
//     productsByPrice: {
//         under5k: [],
//         under10k: [],
//         under15k: [],
//         under20k: [],
//         under30k: [],
//     },
// };

// export default function productReducer(state = initialState, action) {
//     switch (action.type) {
//         case productConstant.GET_PRODUCT_BY_SLUG_SUCCESS:
//             return {
//                 ...state,
//                 product: action.payload.products,
//                 productsByPrice: {
//                     ...action.payload.productsByPrice
//                 }
//             };
//         default:
//             return state;
//     }
// }


