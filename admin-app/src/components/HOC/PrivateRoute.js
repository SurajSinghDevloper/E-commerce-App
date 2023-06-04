import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// export const PrivateRoute = ({ element: Element, ...rest }) => {
//     return <Route {...rest} component={(props) => {
//         const token = window.localStorage.getItem('token');
//         if (token) {
//             return <Element {...props} />
//         } else {
//             return <Redirect to={'/signin'} />
//         }
//     }} />
// }


const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = window.localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={(props) => {
                if (token) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/signin" />;
                }
            }}
        />
    );
};

export default PrivateRoute;



