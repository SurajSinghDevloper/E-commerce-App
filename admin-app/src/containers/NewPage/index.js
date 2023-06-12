import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Index'
import Modals from '../../components/UI/modal'
import { Button, Col, Row } from 'react-bootstrap';
import Input from '../../components/UI/input/Index';
import linearCategories from '../../helpers/linearCategories';
import { useSelector } from 'react-redux';

const NewPage = () => {
    const [createModal, setCreatModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoriesId] = useState('');
    const [desc, setDesc] = useState('');
    const [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category.categories]);

    const handleBannerImages = (e) => {
        console.log(e);
    }

    const handleProductImages = (e) => {
        console.log(e);
    }

    const renderCreatePageModal = () => {
        return (
            <Modals
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreatModal(false)}
            >
                <Row>
                    <Col>
                        <select
                            className='form-control form-control-md'
                            value={categoryId}
                            onChange={(e) => setCategoriesId(e.target.value)}
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
                        <input
                            className='form-control form-control-md'
                            type='file'
                            name='banners'
                            onChange={handleBannerImages}
                        />
                    </Col>
                </Row>&nbsp;
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