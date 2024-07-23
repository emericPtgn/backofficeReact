import React from "react";
import HandleLogout from "../../../context/AuthContext";
import { useAuth } from "../../../context/Context";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const {setIsAuthenticated, setToken} = useAuth();
    const navigate = useNavigate();
    const handleOnClick = async () => {
        await HandleLogout(setIsAuthenticated, setToken);
        navigate('/login');
    }
    return (
        <>
            <button onClick={handleOnClick}>Se déconnecter</button>
        </>
    )
}

export default LogoutButton;