import React from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { useSelector } from 'react-redux'
import './style.css'


const CardPage = (props) => {
    const cart = useSelector(state => state.cart);
    const cartItems = cart.cartItems;
    return (
        <Layout>
            <div className='cartContainer'>
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver To</div>}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <div key={index} className='flexRow'>
                                <div className='cartProductContainer'>
                                    <img src='' alt='..' />
                                </div>
                                <div className='cartItemDetails'>
                                    <div>{cartItems[key].name}  Qty - {cartItems[key].qty}</div>
                                    <div>Delivery in 3-5 Days</div>
                                </div>
                            </div>
                        )
                    }
                </Card>
                <Card style={{ width: '500px' }}>Price</Card>
            </div>
        </Layout>
    )
}

export default CardPage