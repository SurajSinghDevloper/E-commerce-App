import axios from "../helpers/axios"

export const addProduct = form => {
    return async dispatch => {
        const res = await axios.post(`/product/addProduct`, form);

        console.log("👉👉 ~~ file: product.action.js:7 ~~ addProduct ~~ res:", res)
    }
}