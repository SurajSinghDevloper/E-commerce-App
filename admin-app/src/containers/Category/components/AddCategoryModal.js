import React from 'react'
import Modals from '../../../components/UI/modal'
import Input from '../../../components/UI/input/Index'
import { Col, Row } from 'react-bootstrap'

const AddCategoryModal = (props) => {
    const {
        show,
        handleClose,
        categoryName,
        modalTitle,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
        onSubmit
    } = props
    return (
        <Modals
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Col>
                <Col>
                    <select
                        className='form-control'
                        onChange={(e) => setParentCategoryId(e.target.value)}
                        value={parentCategoryId}
                    >
                        <option>Select category</option>
                        {categoryList.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input
                        className='form-control mt-3'
                        type='file'
                        name='categoryImage'
                        onChange={handleCategoryImage}
                    />
                </Col>
            </Row>
        </Modals>
    )
}


export default AddCategoryModal