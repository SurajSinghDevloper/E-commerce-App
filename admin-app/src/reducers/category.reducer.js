/* eslint-disable eqeqeq */
import { categoryConstant } from "../actions/constant";

const initialState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories = (category, categories, parentId) => {
    let myCategories = [];
    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }
    for (let cat of categories) {
        if (cat._id && cat.parentId == parentId) {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(category, cat.children, parentId) : []
            });
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(category, cat.children, parentId) : []
            });
        }
    }
    return myCategories;
};

// const buildNewCategories = (category, categories, parentId) => {
//     let myCategories = [];
//     if (parentId == undefined) {
//         return [
//             ...categories,
//             {
//                 _id: category._id,
//                 name: category.name,
//                 slug: category.slug,
//                 children: []
//             }
//         ]
//     }
//     for (let cat of categories) {

//         if (cat._id == parentId) {
//             const newCategory = {
//                 _id: category._id,
//                 name: category.name,
//                 slug: category.slug,
//                 parentId: category.parentId,
//                 children: []
//             }
//             myCategories.push({
//                 ...cat,
//                 children: cat.children.lenght > 0 ? [...cat.children, newCategory] : [newCategory]
//             })
//         } else {
//             myCategories.push({
//                 ...cat,
//                 children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
//             })
//         }
//     }
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryConstant.GET_ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload.categories,
            };
        case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
            const { category } = action.payload;
            const updatedCategoryList = buildNewCategories(category, state.categories, category.parentId);
            return {
                ...state,
                categories: updatedCategoryList,
                loading: false,
            };
        case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
