import axiosInstance from "../helpers/axios";

export const addProduct = (form) => {
    return async dispatch => {
        try {
            const res = await axiosInstance.post(`product/addProduct`, form);
            console.log("Response:");
            console.log("👉👉 ~~ file: product.action.js:18 ~~ return ~~ res:", res.data)
            // Dispatch any additional actions or handle the response as needed
        } catch (error) {
            console.log("Error:", error);
            // Handle any error cases or dispatch error actions if needed
        }
    };
};
