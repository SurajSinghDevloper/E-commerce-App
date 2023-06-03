import React from 'react'
import Header from '../Header/Index'

const Layout = (props) => {
    return (
        <>
            <Header />
            {props.children}
        </>
    )
}
export default Layout