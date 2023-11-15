// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login';
import Registration from './registeration';
import ConfirmRegistration from './confirmation';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Registration} />
                <Route path="/confirm-registration" component={ConfirmRegistration} />
            </Switch>
        </Router>
    );
};

export default App;
