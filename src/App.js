import React from "react";
import {Switch} from "react-router-dom";
import {PrivateRoute, PublicRoute} from './routers'
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import TasksPage from './pages/TasksPage';

export default function App() {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={TasksPage}/>
            <PublicRoute exact path="/register" component={SignUpPage}/>
            <PublicRoute exact path="/login" component={SignInPage}/>
        </Switch>
    );
}
