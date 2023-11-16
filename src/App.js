// App.js

import React from "react";
import Home from "./home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/authcontext";
import ProtectedRoute from "./ProtectedRoute";
import LoginRoute from "./LoginRoute";
import Login from "./login";
import Registration from "./registeration";
import ConfirmRegistration from "./confirmation";
import RideComponent from "./ride";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <ProtectedRoute exact path="/" component={RideComponent} />
                    <LoginRoute path="/login" component={Login} />
                    <Route path="/register" component={Registration} />
                    <Route
                        path="/confirm-registration"
                        component={ConfirmRegistration}
                    />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;
