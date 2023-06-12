import React from 'react'
import Modals from '../../../components/UI/modal';
import Input from '../../../components/UI/input/Index';
import { Col, Row } from 'react-bootstrap';

const UpdateCategoriesModal = (props) => {
    const {
        size,
        handleClose,
        modalTitle,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
        show
    } = props;
    return (
        <Modals
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            size={size}
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
                                {categoryList.map((option) => (
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
                                {categoryList.map((option) => (
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
        </Modals>
    )
}



export default UpdateCategoriesModal;