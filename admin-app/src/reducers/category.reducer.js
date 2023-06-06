import { categoryConstant } from "../actions/constant";

const initialState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories = (category, categories, parentId) => {
    let myCategories = [];
    for (let cat of categories) {
        if (cat._id && cat.parentId == parentId) {
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(category, cat.children, parentId) : []
            });
        } else {
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(category, cat.children, parentId) : []
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
            };
        default:
            return state;
    }
};

export default reducer;
