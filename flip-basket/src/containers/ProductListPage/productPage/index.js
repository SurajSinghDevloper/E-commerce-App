import React, { useEffect } from 'react'
import './style.css'
import { getProductPage } from '../../../actions'
import { useDispatch, useSelector } from 'react-redux'
import getParams from '../../../utils/getParams'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card'

const ProductPage = (props) => {
    console.log("👉👉 ~~ file: index.js:8 ~~ ProductPage ~~ props:", props)
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    console.log("👉👉 ~~ file: index.js:10 ~~ ProductPage ~~ product:", products)
    const { pages } = products


    useEffect(() => {
        const params = getParams(props.location.search);
        console.log("👉👉 ~~ file: index.js:22 ~~ useEffect ~~ params:", params)
        const payload = {
            params
        };
        console.log("👉👉 ~~ file: index.js:27 ~~ useEffect ~~ payload:", payload)
        dispatch(getProductPage(payload));
    }, []);
    return (
        <>
            <div id="carouselExampleFade"
                className="carousel slide carousel-fade"
                style={{ width: '100%', height: '450px', marginTop: '10px' }}>
                <div className='container-fluid'>
                    <div className="carousel-inner">
                        {
                            pages.banners && pages.banners.map((banner, index) =>
                                <a href={banner.navigateTo}
                                    style={{ height: '450px', padding: ' 0 5px', display: 'block' }}
                                    className="carousel-item active" key={index}>
                                    <img src={banner.img} className="d-block w-100" alt="..." />
                                </a>
                            )
                        }
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* for product */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: '10px 0' }}>
                {
                    pages.products && pages.products.map((product, index) =>
                        <Card
                            key={index}
                            style={
                                {
                                    width: '400px',
                                    height: '200px',
                                    margin: '5px',

                                }
                            }
                        >
                            <img style={{ width: '100%', height: '100%' }} src={product.img} alt='...' />
                        </Card>
                    )
                }
            </div>
        </>
    )
}

export default ProductPage
