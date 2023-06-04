import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Index'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/input/Index'
import { login } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom'


export default function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        dispatch(login(user));
    }
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    return (
        <>
            {/* layout contain the header component automatically */}
            <Layout>
                <Container>
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 6, offset: 3 }} >
                            <Form
                                onSubmit={userLogin}
                            >
                                <Form.Group >
                                    <Input
                                        label='Email address'
                                        placeholder='Enter email'
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        errorMessage=' We ll never share your email with anyone else.'
                                    />
                                </Form.Group>
                                <Form.Group >
                                    <Input
                                        label='Password'
                                        placeholder='Enter password'
                                        type='password'
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
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
