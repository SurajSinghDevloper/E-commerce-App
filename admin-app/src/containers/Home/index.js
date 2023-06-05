import React from 'react'
import Layout from '../../components/Layout/Index'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import './style.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

export default function Home(props) {
    return (
        <>
            <Layout sidebar>
                <Jumbotron style={{ margin: '5rem', background: '#fff' }} className='text-center'>
                    <h1>Welcome to Admin Dashboard</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus porro amet numquam facere velit debitis doloremque, nihil nulla deserunt itaque, cupiditate quae eum vero perspiciatis doloribus hic. Autem, suscipit corrupti.</p>
                </Jumbotron>
            </Layout>
        </>
    )
}
