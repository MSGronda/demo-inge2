import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [username, setUsername] = useState('');
    const history = useHistory();

    useEffect(() => {
        const user = window.localStorage.getItem('SESSION');

        if (!user) {
            // Redirige a la página de inicio de sesión
            history.push('/login');
        } else {
            let user_data = JSON.parse(user);
            setUsername(user_data.idToken.payload["cognito:username"]);
        }
    }, [history]);

    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            {username && <p>Signed in as: {username}</p>}
        </div>
    );
};

export default Home;
