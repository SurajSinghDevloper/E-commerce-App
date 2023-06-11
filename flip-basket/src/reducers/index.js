import { combineReducers } from 'redux'
import categoryReducer from './category.reducer'
import productReducer from './product.reducer';


const rootReducer = combineReducers({
    category: categoryReducer,
    products: productReducer
})

export default rootReducer;