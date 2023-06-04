import React from 'react'
import Layout from '../../components/Layout/Index'
import { Col, Container, Row } from 'react-bootstrap'
import './style.css';

export default function Home(props) {
    return (
        <>
            <Layout>
                <Container fluid>
                    <Row>
                        <Col md={2} className='sidebar'>Side Bar is Here</Col>
                        <Col md={10} style={{ marginLeft: 'auto' }}>Container will be Here</Col>
                    </Row>
                </Container>
                {/* <Jumbotron style={{ margin: '5rem', background: '#fff' }} className='text-center'>
                    <h1>Welcome to Admin Dashboard</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus porro amet numquam facere velit debitis doloremque, nihil nulla deserunt itaque, cupiditate quae eum vero perspiciatis doloribus hic. Autem, suscipit corrupti.</p>
                </Jumbotron> */}
            </Layout>
        </>
    )
}
