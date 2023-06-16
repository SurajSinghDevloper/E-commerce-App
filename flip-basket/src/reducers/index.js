import { combineReducers } from 'redux'
import categoryReducer from './category.reducer'
import productReducer from './product.reducer';
import authReducer from './auth.reducer'
import cartReducer from './cart.reducer'


const rootReducer = combineReducers({
    category: categoryReducer,
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
})

export default rootReducer;