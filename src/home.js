import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './contexts/authcontext'; // Adjust the import path to your AuthContext

const Home = () => {
    const history = useHistory();
    const { userSession, isLoggedIn } = useContext(AuthContext);
    const username = userSession && userSession.idToken && userSession.idToken.payload 
    ? userSession.idToken.payload['cognito:username'] 
    : '';

    console.log('Home - isLoggedIn:', isLoggedIn, 'username:', username);

    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            {username && <p>Signed in as: {username}</p>}
        </div>
    );
};

export default Home;
