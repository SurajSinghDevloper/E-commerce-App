import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import CartItem from './CartItem/Index'
import { addToCart } from '../../actions'


const CardPage = (props) => {
    const cart = useSelector(state => state.cart);
    // const cartItems = cart.cartItems;
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState(cart.cartItems);
    useEffect(() => {
        setCartItems(cart.cartItems)
    }, [cart.cartItems]);


    const onQuantityIncrement = (_id, qty) => {
        console.log(_id, qty);
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1));

    }
    const onQuantityDecrement = (_id, qty) => {
        console.log(_id, qty);
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, -1));
    };

    return (
        <Layout>
            <div className='cartContainer' style={{ alignItem: 'flex-start' }}>
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div style={{ marginLeft: '200px' }}>Deliver To</div>}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                            />
                        )
                    }
                </Card>
                <Card
                    style={{ width: '500px' }}
                    headerLeft='price'
                ></Card>
            </div>
        </Layout>
    )
}

export default CardPage