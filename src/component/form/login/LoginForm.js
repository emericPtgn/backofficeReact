import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const LoginForm = ({onSubmit}) => {

    const [_username, setUsername] = useState('');
    const [_password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ _username, _password });
      };
    
    return (
        <div id="container-form">
            <div id="wrapper-form">
                <form onSubmit={handleSubmit} id="form-login">
                    <div id="form-header">
                        <h2>Live Event</h2>
                    </div>
                    <div id="form-body">
                        <InputText
                            type="text"
                            name='_username'
                            value={_username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nom d'utilisateur"
                        />
                        <InputText
                            type="password"
                            name='_password'
                            value={_password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mot de passe"
                        />
                    </div>
                    <div id="form-footer">
                        <Button label="Se connecter" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;