// App.js

import React from 'react';
import Home from "./home";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { AuthProvider } from './contexts/authcontext';
import Login from './login';
import Registration from './registeration';
import ConfirmRegistration from './confirmation';
import RideComponent from './ride';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Registration} />
                    <Route path="/confirm-registration" component={ConfirmRegistration} />
                    <Route path="/ride" component={RideComponent} /> 
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;
