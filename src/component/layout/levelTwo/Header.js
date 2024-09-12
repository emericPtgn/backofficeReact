import React from "react";
import '../../../App.css';
import AddNewButton from "../../common/button/AddNewButton";
import { Button } from "primereact/button";

const Header = () => {
    // Extract the current pathname and determine the page title
    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const pageTitle = pathParts[1] ? pathParts[1] : 'Accueil';
    
    // Capitalize the first letter of pageTitle
    const capitalizedPageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
    const lowercase = capitalizedPageTitle.toLowerCase();

    // Handle links and labels based on the path structure
    let link = '';
    let label = '';
    let tooltip = '';
    let icon = '';

    if (lowercase.split('-').length === 1) {
        link = `/${lowercase}-new`;
        label = `Ajouter ${capitalizedPageTitle}`;
        tooltip = label
        icon = 'pi pi-plus'
    } else {
        link = `/${lowercase.split('-')[0]}`;
        label = 'Retour';
        tooltip = '';
        icon = 'pi pi-arrow-circle-left'
    }
    
    // Function to handle button click
    const handleButtonClick = () => {
        window.location.href = link;
    };

    return (
        <div id="container-header-level2">
            <div className="d-flex">
                <div>
                    <h1>{capitalizedPageTitle}</h1>
                </div>
                <div>
                    <Button icon={icon} tooltip={tooltip} label={label} onClick={handleButtonClick} />
                </div>
            </div>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    );
};

export default Header;
