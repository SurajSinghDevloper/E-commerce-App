import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Index'
import Modals from '../../components/UI/modal'
import { Button, Col, Row } from 'react-bootstrap';
import Input from '../../components/UI/input/Index';
import linearCategories from '../../helpers/linearCategories';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';

const NewPage = () => {
    const [createModal, setCreatModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoriesId] = useState('');
    const [desc, setDesc] = useState('');
    const [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);
    const [type, setType] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category.categories]);

    const onCategoryChange = (e) => {
        const category = categories.find(category => category._id === e.target.value)
        setCategoriesId(e.target.value);
        setType(category.type);
    }

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
        console.log(e);
    }

    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
        console.log(e);
    }

    const submitPageForm = (e) => {
        // e.target.preventDefault();
        if (title === '') {
            alert('Title is Required');
            setCreatModal(false);
        }
        const form = new FormData();
        form.append("title", title);
        console.log("👉👉 ~~ file: index.js:50 ~~ submitPageForm ~~ title:", title)
        form.append("description", desc);
        console.log("👉👉 ~~ file: index.js:51 ~~ submitPageForm ~~ desc:", desc)
        form.append("category", categoryId);
        console.log("👉👉 ~~ file: index.js:52 ~~ submitPageForm ~~ categoryId:", categoryId)
        form.append("type", type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });
        dispatch(createPage(form));
    }

    const renderCreatePageModal = () => {
        return (
            <Modals
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={submitPageForm}
            >
                <Row>
                    <Col>
                        <select
                            className='form-control form-control-md'
                            value={categoryId}
                            onChange={onCategoryChange}
                        >
                            <option>Select Category</option>
                            {
                                categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))
                            }
                        </select>
                    </Col>
                </Row>&nbsp;
                <Row>
                    <Col>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={'Page Title'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder={'Page Description'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {
                            banners.length > 0 ?
                                banners.map((banner, index) =>
                                    <Row>
                                        <Col key={index}>
                                            {banner.name}
                                        </Col>
                                    </Row>
                                ) : null
                        }
                        <input
                            className='form-control form-control-md'
                            type='file'
                            name='banners'
                            onChange={handleBannerImages}
                        />
                    </Col>
                </Row>&nbsp;
                {
                    products.length > 0 ?
                        products.map((product, index) =>
                            <Row>
                                <Col key={index}>
                                    {product.name}
                                </Col>
                            </Row>
                        ) : null
                }
                <Row>
                    <Col>
                        <input
                            className='form-control form-control-md'
                            type='file'
                            name='products'
                            onChange={handleProductImages}
                        />
                    </Col>
                </Row>
            </Modals>
        )
    }

    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <Button onClick={() => setCreatModal(true)}>Create Page</Button>
        </Layout>
    )
}

export default NewPage