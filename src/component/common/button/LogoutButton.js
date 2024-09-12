import React from "react";
import HandleLogout from "../../../context/AuthContext";
import { useAuth } from "../../../context/Context";
import { Button } from "primereact/button";

const LogoutButton = () => {
    const {setIsAuthenticated, setToken} = useAuth();
    const handleOnClick = async () => {
        await HandleLogout(setIsAuthenticated, setToken);
    }
    return (
        <>
            <Button label="deconnexion" link onClick={handleOnClick}></Button>
        </>
    )
}

export default LogoutButton;