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
                type: category.type,
                children: []
            }
        ]
    }
    for (let cat of categories) {
        if (cat._id && cat.parentId == parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            }
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(newCategory, cat.children, parentId) : [newCategory]
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
                error: action.payload.error
            };
        case categoryConstant.UPDATE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case categoryConstant.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case categoryConstant.UPDATE_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            };
        case categoryConstant.DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case categoryConstant.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case categoryConstant.DELETE_CATEGORY_FAILURE:
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
