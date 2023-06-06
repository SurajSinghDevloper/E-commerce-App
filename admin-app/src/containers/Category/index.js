import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Index';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../actions';
import Input from '../../components/UI/input/Index';

export default function Category() {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImg, setCategoryImg] = useState('');

    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImg', categoryImg);
        dispatch(addCategory(form))
            .then(() => {
                dispatch(getAllCategory()); // Fetch updated category list after adding a new category
            })
            .catch((error) => {
                console.log('Add Category Error:', error);
            });
        setShow(false);
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log('Category.js');
        dispatch(getAllCategory());
    }, []);

    const renderCategory = (categories) => {
        let myCategories = [];
        if (Array.isArray(categories)) {
            for (let category of categories) {
                myCategories.push(
                    <li key={category._id}>
                        {category.name}
                        {category.children.length > 0 ? (
                            <ul>{renderCategory(category.children)}</ul>
                        ) : null}
                    </li>
                );
            }
        }
        return myCategories;
    };

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    const handleCategoryImage = (e) => {
        setCategoryImg(e.target.files[0]);
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <Button variant="primary" onClick={handleShow}>
                                Add Category
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategory(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <select
                        className='form-control'
                        onChange={(e) => setParentCategoryId(e.target.value)}
                        value={parentCategoryId}
                    >
                        <option>Select category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                    <input className='form-control mt-3' type='file' name='categoryImage' onChange={handleCategoryImage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
}