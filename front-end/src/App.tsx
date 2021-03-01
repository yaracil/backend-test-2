import * as React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect, HashRouter} from 'react-router-dom';
import {
    LoginPage,
    RegisterPage,
    Error400,
    Error401,
    Error403,
    Error404,
    Error500,
    Error503,
    Empty,
    ChangePasswordPage,
    Dashboard,
    Items
} from "./pages";

import "./css/App.css";
import './css/index.css';
import {useAuthContext} from "./contexts/AuthenticationContext";

import './css/App.css';
import Orders from "./pages/Orders.react";

function App() {

    const {user} = useAuthContext();

    const ProtectedRoute = ({component: Component, ...rest}: any) => (
        <Route
            {...rest}
            render={(props: any) =>
                // user.token ? (
                <Component {...props} />
                // ) : (
                //     <Redirect
                //         to={{
                //           pathname: "/login",
                //           state: {from: props.location},
                //         }}
                //     />
                // )
            }
        />
    );

    return (
        <HashRouter>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/dashboard"/>
                    </Route>
                    <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
                    <ProtectedRoute exact path="/items" component={Items}/>
                    <ProtectedRoute exact path="/orders" component={Orders}/>
                    <Route exact path="/400" component={Error400}/>
                    <Route exact path="/401" component={Error401}/>
                    <Route exact path="/403" component={Error403}/>
                    <Route exact path="/404" component={Error404}/>
                    <Route exact path="/500" component={Error500}/>
                    <Route exact path="/503" component={Error503}/>
                    <Route exact path="/change-password" component={ChangePasswordPage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/register" component={RegisterPage}/>
                    <Route component={Error404}/>
                    <Route exact path="/empty-page" component={Empty}/>
                </Switch>
            </Router>
        </HashRouter>
    );
}

export default App;
