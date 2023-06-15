import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug, getProductPage } from '../../actions';
import { generatePublicUrl } from '../../urlConfig';
import { Link } from 'react-router-dom';

const ProductStore = (props) => {
    const products = useSelector(state => state.products);
    console.log("😁😁😁 ~~ file: index.js:8 ~~ ProductStore ~~ products ID:", products)

    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000,
        moreThan30k: 200000,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductBySlug(match.params.slug));
    }, []);
    return (
        <>
            {Object.keys(products.productsByPrice).map((key, index) => {
                return (
                    <div className='card' key={index}>
                        <div className='cardHeader'>
                            <div>{props.match.params.slug} Mobile Under {priceRange[key]}</div>
                            <button>View all</button>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {products.productsByPrice[key].map(product => (
                                <Link to={`/${product.slug}/${product._id}/p`} style={{ display: 'block' }} className='productContainer' key={product._id}>
                                    <div className='productImgContainer'>
                                        <img src={generatePublicUrl(product.productPicture[0].img)} alt='img' />
                                    </div>
                                    <div className='productInfo'>
                                        <div style={{ margin: '5px 0' }}>{product.name}</div>
                                        <div>
                                            <span>4.3 rating</span>&nbsp;
                                            <span>5324</span>
                                        </div>
                                        <div className='productPrice'>{product.price}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default ProductStore