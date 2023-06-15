import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions';

const ProductDetailsPage = (props) => {
    console.log("👉💀💀💀👉 ~~ file: index.js:7 ~~ ProductDetailsPage ~~ props:", props);
    const dispatch = useDispatch();

    const { productDetails } = useSelector(state => state.products);
    console.log("👉❤️❤️❤️👉 ~~ file: index.js:11 ~~ ProductDetailsPage ~~ productDetails:", productDetails);

    useEffect(() => {
        const { productsId } = props.match.params;
        console.log("🛣️🛣️🛣️🛣️ ~~ file: index.js:10 ~~ useEffect ~~ productId:", productsId);
        const payload = {
            params: {
                productsId
            }
        };
        console.log("⛳⛳⛳⛳ ~~ file: index.js:15 ~~ useEffect ~~ payload:", payload);
        dispatch(getProductDetailsById(payload));
    }, []);

    return (
        <Layout>
            <div>
                {productDetails && (
                    <h1>{productDetails.name}</h1>
                )}
            </div>
        </Layout>
    );
};

export default ProductDetailsPage;
