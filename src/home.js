import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Home = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Retrieve the user from localStorage
        const user = window.localStorage.getItem('SESSION');
        console.log(user)
        // Redirect to login if the user is not authenticated
        if (!user) {
            return <Redirect to="/login" />;
        } else {
            let user_data = JSON.parse(user)

            setUsername(user_data.idToken.payload["cognito:username"]);
            console.log(username)
        }
    }, [username]); // Empty dependency array to run the effect only once on mount

    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            {username && <p>Signed in as: {username}</p>}
        </div>
    );
};

export default Home;
