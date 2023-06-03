import React from 'react'
import Layout from '../../components/Layout/Index'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/input/Index'

export default function Signin() {
    return (
        <>
            {/* layout contain the header component automatically */}
            <Layout>
                <Container>
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 6, offset: 3 }} >
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Input
                                        label='Email address'
                                        placeholder='Enter email'
                                        type='email'
                                        value=''
                                        onChange={() => { }}
                                        errorMessage=' We ll never share your email with anyone else.'
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Input
                                        label='Password'
                                        placeholder='Enter password'
                                        type='password'
                                        value=''
                                        onChange={() => { }}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    )
}
