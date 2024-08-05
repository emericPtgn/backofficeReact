import React from "react";
import '../../../App.css';

const Header = () => {
    // Extract the current pathname and determine the page title
    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const pageTitle = pathParts[1] ? pathParts[1] : 'Accueil';
    
    // Capitalize the first letter of pageTitle
    const capitalizedPageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
    const lowercase = capitalizedPageTitle.toLowerCase();
    
    // Function to handle button click
    const handleButtonClick = () => {
        window.location.href = `/${lowercase}-new`;
    };

    return (
        <div id="container-header-level2">
            <div className="d-flex">
                <h1>{capitalizedPageTitle}</h1>
                <button type="button" onClick={handleButtonClick}>
                    Ajouter {capitalizedPageTitle}
                </button>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
        </div>
    );
};

export default Header;
