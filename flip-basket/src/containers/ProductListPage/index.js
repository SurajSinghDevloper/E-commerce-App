import React from 'react'
import Layout from '../../components/Layout'
import './style.css'
import ProductStore from '../ProductStore';
import getParams from '../../utils/getParams';
import ProductPage from './productPage';

const ProductListPage = (props) => {

    const renderProduct = () => {
        console.log("👉👉 ~~ file: index.js:11 ~~ renderProduct ~~ props:", props)
        let content = null;
        const params = getParams(props.location.search)
        console.log("👉👉 ~~ file: index.js:14 ~~ renderProduct ~~ params---Type:", params.type)
        switch (params.type) {
            case 'store':
                content = <ProductStore {...props} />
                break;
            case 'page':
                content = <ProductPage {...props} />
                break;
            default:
                content = null;
                break;
        }
        return content
    }

    return (
        <Layout>
            {renderProduct()}
        </Layout>
    );
};

export default ProductListPage;
