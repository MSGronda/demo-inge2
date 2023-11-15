// App.js

import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Login from './login';
import Registration from './registeration';
import ConfirmRegistration from './confirmation';
import Home from "./home";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Registration} />
                <Route path="/confirm-registration" component={ConfirmRegistration} />
            </Switch>
        </Router>
    );
};

export default App;
