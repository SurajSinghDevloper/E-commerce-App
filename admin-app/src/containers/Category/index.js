import React, { useState } from 'react';
import Layout from '../../components/Layout/Index';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../actions';
import Input from '../../components/UI/input/Index';
import Modals from '../../components/UI/modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { useCallback } from 'react';
import { IoIosArrowDropdown, IoIosArrowForward, IoIosCheckbox, IoIosCheckboxOutline, IoIosFolder, IoIosFolderOpen } from 'react-icons/io'

export default function Category() {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImg, setCategoryImg] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImg', categoryImg);
        dispatch(addCategory(form))
            .then(() => {
                dispatch(getAllCategory());
            })
            .catch((error) => {
                console.log('Add Category Error:', error);
            });
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    };

    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        return categories.map((category) => ({
            value: category._id,
            label: category.name,
            children: category.children.length > 0 && renderCategories(category.children)
        }));
    };

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    const handleCheck = useCallback((checked) => {
        setChecked(checked);
    }, []);

    const handleExpand = (expanded) => {
        setExpanded(expanded);
    };

    const handleCategoryImage = (e) => {
        setCategoryImg(e.target.files[0]);
    };

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        const categories = createCategoryList(category.categories);
        const checkedArray = []
        const expandedArray = []
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }


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
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={handleCheck}
                            onExpand={handleExpand}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDropdown />,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button>Delete</Button>
                        <Button onClick={updateCategory}>Edit</Button>
                    </Col>
                </Row>
            </Container>
            <Modals
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
            >
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
                    {createCategoryList(category.categories).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <input
                    className='form-control mt-3'
                    type='file'
                    name='categoryImage'
                    onChange={handleCategoryImage}
                />
            </Modals>

            {/* Edit Categories */}

            <Modals
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                modalTitle={'Edit Category'}
                size="lg"
            >
                <Row>
                    <Col>Expanded</Col>
                </Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={`Category Name`}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className='form-control'
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                    value={item.parentId}
                                >
                                    <option>Select category</option>
                                    {createCategoryList(category.categories).map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                            <Col>
                                <select className='form-control'>
                                    <option value={''}>Select Type</option>
                                    <option value={'store'}>Store</option>
                                    <option value={'product'}>Product</option>
                                    <option value={'page'}>Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }
                <h5>Checked Categories</h5>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={`Category Name`}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className='form-control'
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                    value={item.parentId}
                                >
                                    <option>Select category</option>
                                    {createCategoryList(category.categories).map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                            <Col>
                                <select className='form-control'>
                                    <option value={''}>Select Type</option>
                                    <option value={'store'}>Store</option>
                                    <option value={'product'}>Product</option>
                                    <option value={'page'}>Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }

                <input
                    className='form-control mt-3'
                    type='file'
                    name='categoryImage'
                    onChange={handleCategoryImage}
                />
            </Modals>

        </Layout>
    );
}

























