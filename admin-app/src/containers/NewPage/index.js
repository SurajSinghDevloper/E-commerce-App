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
    const page = useSelector(state => state.page);

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category.categories]);

    useEffect(() => {
        if (!page.loading) {
            setCreatModal(false);
            setTitle('');
            setDesc('');
            setBanners([]);
            setProducts([]);
            setCategoriesId('');
        }
    }, [page])

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value === e.target.value)
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
        const form = new FormData();
        form.append("title", title);
        form.append("description", desc);
        form.append("category", categoryId);
        form.append("type", type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });
        if (title === '' || desc === '' || categoryId === '' || banners === '' || products === '') {
            alert('All Fields are Required');
            setCreatModal(false);
        } else {
            dispatch(createPage(form));
        }
        setCreatModal(false);
    }

    const renderCreatePageModal = () => {
        return (
            <Modals
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreatModal(false)}
                onSubmit={submitPageForm}
            >
                <Row>
                    <Col>
                        <Input
                            type='select'
                            value={categoryId}
                            onChange={onCategoryChange}
                            option={categories}
                            placeholder={'Select Category'}
                        />
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
            {
                page.loading ?
                    <p>Creating Page... please wait!</p>
                    :
                    <>
                        {renderCreatePageModal()}
                        <Button Button onClick={() => setCreatModal(true)}>Create Page</Button>
                    </>
            }
        </Layout>
    )
}

export default NewPage