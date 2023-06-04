import React, { useState } from 'react'
import Layout from '../../components/Layout/Index'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import Input from '../../components/UI/input/Index'
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/user.action'

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    const handlePhoneNumberChange = (e) => {
        const enteredValue = e.target.value;
        const onlyNumbers = enteredValue.replace(/[^\d]/g, ''); // Remove non-digit characters

        if (onlyNumbers.length <= 10) {
            setContactNumber(onlyNumbers);
        }
    };

    const dispatch = useDispatch();
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    const userSignup = (e) => {
        e.preventDefault()

        const user = { firstName, lastName, contactNumber, email, password }
        dispatch(signup(user))
    }
    if (user.loading) {
        return <p>Loading...!</p>
    }
    return (
        <>
            <Layout>
                <Container>
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 6, offset: 3 }} >
                            <Form onSubmit={userSignup}>
                                <Row>
                                    <Col md={6}>
                                        <Input
                                            label='First Name'
                                            placeholder='first Name'
                                            type='text'
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            label='Last Name'
                                            placeholder='last Name'
                                            type='text'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Col>
                                </Row>
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
                                <FormGroup>
                                    <Input
                                        type="text"
                                        label='Phone'
                                        value={contactNumber}
                                        onChange={handlePhoneNumberChange}
                                        placeholder="Enter phone number"
                                    />
                                </FormGroup>
                                <Input
                                    label='Password'
                                    placeholder='Enter password'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
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
