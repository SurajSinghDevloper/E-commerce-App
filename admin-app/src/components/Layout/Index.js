import React from 'react'
import Header from '../Header/Index'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col md={2} className='sidebar'>
                                <ul>
                                    <li><NavLink to={'/'}>Home</NavLink></li>
                                    <li><NavLink to={'/productPage'}>Product</NavLink></li>
                                    <li><NavLink to={'/orderPage'}>Orders</NavLink></li>
                                    <li><NavLink to={'/categoryPage'}>Category</NavLink></li>
                                    <li><NavLink to={'/FaqPage'}>Faqs</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: 'auto' }}>{props.children}</Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }
        </>
    )
}
export default Layout