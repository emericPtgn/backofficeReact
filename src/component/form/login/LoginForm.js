import React from "react";
import { useState } from "react";

const LoginForm = ({onSubmit}) => {

    const [_username, setUsername] = useState('');
    const [_password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ _username, _password });
      };
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='_username'
                    value={_username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nom d'utilisateur"
                />
                <input
                    type="password"
                    name='_password'
                    value={_password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                />
                <button type="submit">Se connecter</button>
            </form>
        </>
    )
}

export default LoginForm;