import React, { useState } from 'react'
import Layout from '../../components/Layout/Index'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import Input from '../../components/UI/input/Index'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action';
import Modals from '../../components/UI/modal';
import './style.css'
import { generatePublicUrl } from '../../urlConfig';

export default function Products() {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPicture, setProductPicture] = useState([]);
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const [productDetails, setProductDetails] = useState(null);
    console.log("👉👉 ~~ file: index.js:21 ~~ Products ~~ setProductDetails:", productDetails)
    const dispatch = useDispatch();
    const [ProductDetailsModal, setProductDetailsModal] = useState(false);


    const handleClose = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categoryId);
        for (let pic of productPicture) {
            form.append(`productPicture`, pic);
        }
        dispatch(addProduct(form));
        setName('')
        setQuantity('')
        setCategoryId('')
        setDescription('')
        setPrice('')
        setProductPicture([''])
        setShow(false);
    };

    const handleShow = () => setShow(true);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    const handleProductPicture = (e) => {
        setProductPicture([
            ...productPicture,
            e.target.files[0]
        ]);
    };

    const renderProduct = () => {
        return (
            <Table style={{ fontSize: 13 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {product.product.length > 0 ?
                        product.product.map(product =>
                            <tr onClick={() => showProductDetailsModal(product)} key={product._id}>
                                <td>1</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category.name}</td>
                            </tr>
                        ) : null
                    }

                </tbody>
            </Table>
        );
    }

    const renderAddProductModel = () => {
        return (
            <Modals
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Product'}
            >
                <Input
                    label={'Product Name'}
                    value={name}
                    placeholder={`Product Name`}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label={'Product Quantity'}
                    value={quantity}
                    placeholder={`Product Quantity`}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    label={'Product Price'}
                    value={price}
                    placeholder={`Product Price`}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    value={description}
                    placeholder={`Product Description`}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className='form-control'
                    onChange={(e) => setCategoryId(e.target.value)}
                    value={categoryId}
                >
                    <option>Select category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>
                {
                    productPicture.length > 0 ?
                        productPicture.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                }
                <input className='form-control mt-3' type='file' name='productPicture' onChange={handleProductPicture} />
            </Modals>
        );
    }

    const showProductDetailsModal = (Product) => {
        setProductDetails(Product)
        setProductDetailsModal(true);
        console.log("👉👉 ~~ file: index.js:68 ~~ showProductDetailsModal ~~ Product:", Product.description);
    }


    const handleCloseProductDetailsModal = () => {
        setProductDetailsModal(false);
    }
    const renderProductDetailsModal = () => {
        if (!productDetails) {
            console.log("👉👉 ~~ file: index.js:156 ~~ renderProductDetailsModal ~~ productDetails:", productDetails)
            return null
        }
        return (
            <Modals
                show={ProductDetailsModal}
                handleClose={handleCloseProductDetailsModal}
                modalTitle={`Product Details`}
                size='lg'
            >
                <Row>
                    <Col md='6'>
                        <label className='key'>Name</label>
                        <p className='value'>{productDetails.name}</p>
                    </Col>
                    <Col md='6'>
                        <label className='key'>Price</label>
                        <p className='value'>{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <label className='key'>Quantity</label>
                        <p className='value'>{productDetails.quantity}</p>
                    </Col>
                    <Col md='6'>
                        <label className='key'>Category</label>
                        <p className='value'>{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md='12'>
                        <label className='key'>Description</label>
                        <p className='value'>{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <label className='key'>Product Images</label>
                        <div style={{ display: 'flex' }}>
                            {productDetails.productPicture.map(picture =>
                                <div className='productImgContainer'>
                                    <img src={generatePublicUrl(picture.img)} />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Modals>
        );
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Product</h3>
                            <Button variant="primary" onClick={handleShow}>
                                Add Product
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProduct()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductModel()}
            {renderProductDetailsModal()}
        </Layout>
    )
}
