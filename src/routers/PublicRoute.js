import React from "react";
import {Route, Redirect} from "react-router-dom";
import {isLoggedIn} from "../utils/helpers";

export const PublicRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={(props) =>
            isLoggedIn() ? <Redirect to="/"/> : <Component {...props} />
        }
    />
);
