import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions';
import { generatePublicUrl } from '../../urlConfig';
import { MaterialButton } from '../../components/MaterialUI';
import { IoIosArrowForward, IoIosStar, IoMdCart } from 'react-icons/io';
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import './style.css'

const ProductDetailsPage = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    const { productDetails } = useSelector(state => state.products);
    const { productsId } = props.match.params;

    useEffect(() => {
        const payload = {
            params: {
                productsId
            }
        };
        dispatch(getProductDetailsById(payload));
    }, [productsId]);

    if (Object.keys(products.productDetails).length === 0) {
        return null;
    }
    return (
        <Layout>
            {/* <div>{product.productDetails.name}</div> */}
            <div className="productDescriptionContainer">
                <div >

                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img className='w-100'
                                src={generatePublicUrl(products.productDetails.productPicture[0].img)}
                                alt={`${products.productDetails.productPicture[0].img}`}
                            />
                        </div>
                        <div className="verticalImageStack">
                            {
                                products.productDetails
                                && products.productDetails.productPicture
                                && products.productDetails.productPicture.map((thumb, index) =>
                                    <div className="thumbnail">
                                        <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                                    </div>
                                )
                            }
                        </div>
                        {/* action buttons */}
                        <div className="flexRow">
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    marginLeft: "5px",

                                }}
                                icon={<AiFillThunderbolt />}
                            />&nbsp;
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{
                                    marginRight: "5px",
                                }}
                                icon={<IoMdCart style={{ fontSize: '25px' }} />}
                                onClick={() => {
                                    const { _id, name, price } = products.productDetails;
                                    const img = products.productDetails.productPictures[0].img;
                                    // dispatch(addToCart({ _id, name, price, img }));
                                    props.history.push(`/cart`);
                                }}
                            />

                        </div>
                    </div>
                </div>
                <div>
                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li>
                                <a href="#">Home</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Mobiles</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Samsung</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">{products.productDetails.name}</a>
                            </li>
                        </ul>
                    </div>
                    {/* product description */}
                    <div className="productDetails">
                        <p className="productTitle">{products.productDetails.name}</p>
                        <div>
                            <span className="ratingCount">
                                4.3 <IoIosStar />
                            </span>
                            <span className="ratingNumbersReviews">
                                72,234 Ratings & 8,140 Reviews
                            </span>
                        </div>
                        <div className="extraOffer">
                            Extra <BiRupee />
                            4500 off{" "}
                        </div>
                        <div className="flexRow priceContainer">
                            <span className="price">
                                <BiRupee />
                                {products.productDetails.price}
                            </span>
                            <span className="discount" style={{ margin: "0 10px" }}>
                                22% off
                            </span>
                            {/* <span>i</span> */}
                        </div>
                        <div>
                            <p
                                style={{
                                    color: "#212121",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Available Offers
                            </p>
                            <p style={{ display: "flex" }}>
                                <span
                                    style={{
                                        width: "100px",
                                        fontSize: "12px",
                                        color: "#878787",
                                        fontWeight: "600",
                                        marginRight: "20px",
                                    }}
                                >
                                    Description
                                </span>
                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#212121",
                                    }}
                                >
                                    {products.productDetails.description}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetailsPage;
