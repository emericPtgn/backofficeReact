import React, { useMemo } from "react";
import LogoutButton from "../common/button/LogoutButton";
import NavigateButton from "../common/button/NavigateButton";
import { useUserState } from "../../context/UserContext";
import logo from '../../ressources/logo-1.svg';
import logo2 from '../../ressources/Live Event.png'

export default function TopHeader(){
    const state = useUserState();
    const user = useMemo(()=> state?.activUser?.email, [state?.activUser?.email])
    return (
        <header id="top-header" >
            <div className="logo">
                <div>
                    <a href="https://pro.testdwm.fr/dashboard"><p className="sitename">Live Event</p></a>
                    {user ? <span>Bonjour {user} </span> : ''}
                </div>

            </div>
            <div>
                <div className="ham-menu">
                    <button id="hamburger">
                        <span></span>   
                        <span></span>   
                    </button>
                </div>
                <div className="menu-hide">
                    <NavigateButton label='voir site' />
                    <LogoutButton />
                </div>
            </div>
        </header>
    )
}