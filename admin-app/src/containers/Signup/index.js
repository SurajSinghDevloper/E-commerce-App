import React from 'react'
import Layout from '../../components/Layout/Index'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Input from '../../components/UI/input/Index'

export default function Signup() {
    return (
        <>
            <Layout>
                <Container>
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 6, offset: 3 }} >
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Input
                                            label='First Name'
                                            placeholder='first Name'
                                            type='text'
                                            value=''
                                            onChange={() => { }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            label='Last Name'
                                            placeholder='last Name'
                                            type='text'
                                            value=''
                                            onChange={() => { }}
                                        />
                                    </Col>
                                </Row>
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
                                <Input
                                    label='Password'
                                    placeholder='Enter password'
                                    type='password'
                                    value=''
                                    onChange={() => { }}
                                />
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
