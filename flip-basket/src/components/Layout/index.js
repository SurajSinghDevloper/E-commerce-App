import React from 'react'
import Header from '../Header'
import MenuHeadBar from '../MenuHeader'

const Layout = (props) => {
    return (
        <>
            <Header />
            <MenuHeadBar />
            {props.children}
        </>
    )
}

export default Layout